#!/usr/bin/env python3
"""한글 보고서(HTML) → 영문판(_EN.html) 자동 생성.
python scripts/translate_reports.py --all   # 전체 소급
python scripts/translate_reports.py         # 직전 커밋 변경분만
python scripts/translate_reports.py --dry   # 번역 없이 구조 검증
"""
import os, sys, json, re, subprocess, time, urllib.request, urllib.error
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString

ROOT      = Path(__file__).resolve().parents[1]
SCAN_DIRS = [ROOT/"public/nations", ROOT/"public/engines"]
MANIFEST  = ROOT/"public/translations.json"
GLOSSARY  = ROOT/"translation/glossary.json"
KO        = re.compile(r"[가-힣]")
SKIP      = {"script","style","code","pre"}
API_KEY   = os.environ.get("GEMINI_API_KEY","")
DRY       = "--dry" in sys.argv
MODE      = "all" if "--all" in sys.argv else "changed"

# 사용 가능한 모델을 순서대로 시도
MODELS = [
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-pro",
]

def find_model():
    """사용 가능한 첫 번째 모델 반환"""
    if os.environ.get("GEMINI_MODEL"):
        return os.environ["GEMINI_MODEL"]
    for m in MODELS:
        for v in ["v1", "v1beta"]:
            url = (f"https://generativelanguage.googleapis.com/{v}/models/"
                   f"{m}:generateContent?key={API_KEY}")
            body = json.dumps({"contents":[{"parts":[{"text":"hi"}]}]}).encode()
            try:
                req = urllib.request.Request(url, data=body,
                      headers={"Content-Type":"application/json"}, method="POST")
                with urllib.request.urlopen(req, timeout=15) as r:
                    r.read()
                print(f"[model] {m} ({v}) OK")
                return m, v
            except urllib.error.HTTPError as e:
                if e.code == 404:
                    continue
                print(f"[model] {m} ({v}) → {e.code}")
                return m, v  # 404 아니면 이 모델/버전 사용
            except Exception:
                continue
    return MODELS[0], "v1beta"

def targets():
    if MODE == "changed":
        out = subprocess.run(["git","diff","--name-only","HEAD^","HEAD"],
                             capture_output=True, text=True, cwd=ROOT).stdout.split()
        return [ROOT/f for f in out
                if f.endswith(".html") and not f.endswith("_EN.html")
                and (f.startswith("public/nations/") or f.startswith("public/engines/"))
                and (ROOT/f).exists()]
    files=[]
    for d in SCAN_DIRS:
        files+=[p for p in d.rglob("*.html") if not p.name.endswith("_EN.html")]
    return [f for f in files if not f.with_name(f.stem+"_EN.html").exists()]

def collect_nodes(soup):
    return [t for t in soup.find_all(string=True)
            if t.parent and t.parent.name not in SKIP and KO.search(str(t))]

def call_gemini(model, version, texts, glossary_block):
    url = (f"https://generativelanguage.googleapis.com/{version}/models/"
           f"{model}:generateContent?key={API_KEY}")
    prompt = (
        "Translate Korean academic text to English.\n"
        "Input: JSON array of strings. Output: ONLY a JSON array of strings, SAME length.\n"
        "Keep numbers, dates, symbols (η Λ¹² § F(t) SE(t) WD SN BH), URLs unchanged.\n"
        "Preserve leading/trailing whitespace. Never merge/split/add/drop items.\n"
        "Mandatory terms:\n" + glossary_block + "\n\nInput:\n"
        + json.dumps(texts, ensure_ascii=False)
    )
    body = json.dumps({
        "contents":[{"parts":[{"text": prompt}]}],
        "generationConfig":{"responseMimeType":"application/json"}
    }).encode()
    req = urllib.request.Request(url, data=body,
          headers={"Content-Type":"application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=180) as r:
        data = json.loads(r.read())
    raw = data["candidates"][0]["content"]["parts"][0]["text"]
    out = json.loads(raw)
    if not (isinstance(out,list) and len(out)==len(texts)):
        raise ValueError(f"len {len(out)}!={len(texts)}")
    return [str(x) for x in out]

def translate_batch(model, version, texts, glossary_block):
    if DRY: return list(texts)
    for attempt in range(3):
        try:
            return call_gemini(model, version, texts, glossary_block)
        except Exception as e:
            print(f"   retry {attempt+1}: {e}")
            time.sleep(10*(attempt+1))
    raise RuntimeError("재전송 후 번역 실패")

def chunks(seq, budget=8000):
    cur,acc=[],0
    for s in seq:
        if cur and acc+len(s)>budget: yield cur; cur,acc=[],0
        cur.append(s); acc+=len(s)
    if cur: yield cur

def process(f, model, version, glossary_block):
    html  = f.read_text(encoding="utf-8")
    soup  = BeautifulSoup(html,"html.parser")
    base  = str(BeautifulSoup(html,"html.parser"))
    nodes = collect_nodes(soup)
    texts = [str(n) for n in nodes]
    done  = []
    for ch in chunks(texts):
        done += translate_batch(model, version, ch, glossary_block)
        if not DRY: time.sleep(2)
    for n,new in zip(nodes,done):
        n.replace_with(NavigableString(new))
    for tag in soup.find_all(attrs={"lang":True}):
        tag["lang"]="en"
    out  = str(soup)
    bt,ot = base.count("<"), out.count("<")
    ko_l  = len(KO.findall(out))
    ko_o  = len(KO.findall(html))
    ok = abs(bt-ot)<=2 and (DRY or ko_l<max(60,int(ko_o*0.03)))
    if not ok:
        print(f"   [FAIL] tags {bt}->{ot}, ko {ko_o}->{ko_l}"); return None
    en = f.with_name(f.stem+"_EN.html")
    en.write_text(out,encoding="utf-8")
    print(f"   [OK] {en.name} (ko {ko_o}->{ko_l})")
    return en

def rebuild_manifest():
    ens=[]
    for d in SCAN_DIRS:
        ens+=["/" + str(p.relative_to(ROOT/"public")).replace(os.sep,"/")
              for p in d.rglob("*_EN.html")]
    MANIFEST.write_text(json.dumps(sorted(ens),ensure_ascii=False,indent=1),encoding="utf-8")
    return len(ens)

def main():
    g  = json.loads(GLOSSARY.read_text(encoding="utf-8"))
    gb = "\n".join(f"- {k} → {v}" for k,v in g.items())
    print("[init] 사용 가능한 모델 탐색 중...")
    model, version = find_model()
    print(f"[init] 모델 확정: {model} ({version})")
    sel = targets()
    print(f"{len(sel)} file(s) queued (mode={MODE}, dry={DRY})")
    made=0
    for f in sel:
        print("→", f.relative_to(ROOT))
        if process(f, model, version, gb): made+=1
    n=rebuild_manifest()
    print(f"manifest: {n} EN files total, {made} generated this run")

if __name__=="__main__":
    main()
