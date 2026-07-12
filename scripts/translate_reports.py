#!/usr/bin/env python3
"""한글 보고서 → 영문판 자동 생성
  python scripts/translate_reports.py --all     # 전체 소급
  python scripts/translate_reports.py           # 직전 커밋 변경분
  python scripts/translate_reports.py --dry     # 구조 검증만
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

# 현재 운영 중인 모델 (2026-07 기준)
CANDIDATES = [
    ("gemini-flash-latest",   "v1beta"),
    ("gemini-3.5-flash",      "v1beta"),
    ("gemini-2.5-flash-lite", "v1beta"),
]

def find_model():
    print(f"[init] API_KEY 길이: {len(API_KEY)}, 앞4자: {API_KEY[:4] if API_KEY else '없음'}")
    if not API_KEY:
        raise RuntimeError("GEMINI_API_KEY 환경변수가 비어 있음")
    for model, ver in CANDIDATES:
        url = (f"https://generativelanguage.googleapis.com/{ver}/models/"
               f"{model}:generateContent?key={API_KEY}")
        body = json.dumps({"contents":[{"parts":[{"text":"hi"}]}]}).encode()
        req  = urllib.request.Request(url, data=body,
               headers={"Content-Type":"application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                r.read()
            print(f"[init] 모델 확정: {model} ({ver})")
            return model, ver
        except urllib.error.HTTPError as e:
            detail = e.read().decode()[:300] if e.fp else ""
            print(f"  {model}/{ver} → HTTP {e.code}: {detail}")
        except Exception as e:
            print(f"  {model}/{ver} → {e}")
    raise RuntimeError("사용 가능한 모델 없음")

def targets():
    if MODE == "changed":
        out = subprocess.run(["git","diff","--name-only","HEAD^","HEAD"],
                             capture_output=True, text=True, cwd=ROOT).stdout.split()
        return [ROOT/f for f in out
                if f.endswith(".html") and not f.endswith("_EN.html")
                and any(f.startswith(p) for p in ["public/nations/","public/engines/"])
                and (ROOT/f).exists()]
    files = []
    for d in SCAN_DIRS:
        files += [p for p in d.rglob("*.html") if not p.name.endswith("_EN.html")]
    return [f for f in files if not f.with_name(f.stem+"_EN.html").exists()]

def collect_nodes(soup):
    return [t for t in soup.find_all(string=True)
            if t.parent and t.parent.name not in SKIP and KO.search(str(t))]

def call_api(model, ver, texts, gb):
    url  = (f"https://generativelanguage.googleapis.com/{ver}/models/"
            f"{model}:generateContent?key={API_KEY}")
    prompt = (
        "Translate Korean academic text to English.\n"
        "Input: JSON array. Output: ONLY a JSON array, SAME length.\n"
        "Keep: numbers, dates, η Λ¹² § F(t) SE(t) WD SN BH, URLs.\n"
        "Preserve whitespace. Never merge/split/add/drop items.\n"
        "Terms:\n" + gb + "\n\nInput:\n" + json.dumps(texts, ensure_ascii=False)
    )
    body = json.dumps({"contents":[{"parts":[{"text":prompt}]}],
                       "generationConfig":{"responseMimeType":"application/json"}
                       }).encode()
    req  = urllib.request.Request(url, data=body,
           headers={"Content-Type":"application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=180) as r:
        data = json.loads(r.read())
    raw  = data["candidates"][0]["content"]["parts"][0]["text"]
    out  = json.loads(raw)
    if not (isinstance(out, list) and len(out) == len(texts)):
        raise ValueError(f"길이 불일치 {len(out)}!={len(texts)}")
    return [str(x) for x in out]

def translate_batch(model, ver, texts, gb):
    if DRY:
        return list(texts)
    for attempt in range(3):
        try:
            return call_api(model, ver, texts, gb)
        except Exception as e:
            print(f"   retry {attempt+1}: {e}")
            time.sleep(10 * (attempt+1))
    raise RuntimeError("재시도 후 번역 실패")

def chunks(seq, budget=7000):
    cur, acc = [], 0
    for s in seq:
        if cur and acc + len(s) > budget:
            yield cur; cur, acc = [], 0
        cur.append(s); acc += len(s)
    if cur:
        yield cur

def process(f, model, ver, gb):
    html  = f.read_text(encoding="utf-8")
    soup  = BeautifulSoup(html, "html.parser")
    base  = str(BeautifulSoup(html, "html.parser"))
    nodes = collect_nodes(soup)
    texts = [str(n) for n in nodes]
    done  = []
    for ch in chunks(texts):
        done += translate_batch(model, ver, ch, gb)
        if not DRY:
            time.sleep(3)
    for n, new in zip(nodes, done):
        n.replace_with(NavigableString(new))
    for tag in soup.find_all(attrs={"lang": True}):
        tag["lang"] = "en"
    out   = str(soup)
    bt, ot = base.count("<"), out.count("<")
    ko_l   = len(KO.findall(out))
    ko_o   = len(KO.findall(html))
    ok = abs(bt - ot) <= 2 and (DRY or ko_l < max(60, int(ko_o * 0.03)))
    if not ok:
        print(f"   [FAIL] tags {bt}->{ot}, ko {ko_o}->{ko_l}")
        return None
    en = f.with_name(f.stem + "_EN.html")
    en.write_text(out, encoding="utf-8")
    print(f"   [OK] {en.name} (ko {ko_o}->{ko_l})")
    return en

def rebuild_manifest():
    ens = []
    for d in SCAN_DIRS:
        ens += ["/" + str(p.relative_to(ROOT/"public")).replace(os.sep, "/")
                for p in d.rglob("*_EN.html")]
    MANIFEST.write_text(json.dumps(sorted(ens), ensure_ascii=False, indent=1),
                        encoding="utf-8")
    return len(ens)

def main():
    g  = json.loads(GLOSSARY.read_text(encoding="utf-8"))
    gb = "\n".join(f"- {k} → {v}" for k, v in g.items())
    if DRY:
        model, ver = "(dry)", "(dry)"
        print("[init] DRY 모드 — 모델 탐색/API 호출 생략")
    else:
        model, ver = find_model()
    sel = targets()
    print(f"{len(sel)} file(s) queued (mode={MODE}, dry={DRY})")
    made = 0
    for f in sel:
        print("→", f.relative_to(ROOT))
        if process(f, model, ver, gb):
            made += 1
    n = rebuild_manifest()
    print(f"manifest: {n} EN files total, {made} generated this run")

if __name__ == "__main__":
    main()
