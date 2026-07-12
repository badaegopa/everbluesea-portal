#!/usr/bin/env python3
"""한글 보고서 → 영문판(_EN.html) 자동 생성 — 한 편씩 처리 후 즉시 커밋.
동작:
  1. _EN.html이 없는 한글 보고서를 하나 찾는다.
  2. 그 한 편만 번역해서 _EN.html + 매니페스트 갱신.
  3. 커밋·푸시는 워크플로가 담당 (파일 생성만 이 스크립트 몫).
  4. 번역할 파일이 없으면 아무것도 안 하고 종료 (exit 0).
옵션:
  --all  : 남은 것 전부 (한 편씩 순차, 각 편 후 로그 flush)
  --dry  : API 호출 없이 구조 검증만
"""
import os, sys, json, re, time, urllib.request, urllib.error
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
ALL       = "--all" in sys.argv

CANDIDATES = [
    ("gemini-flash-latest",   "v1beta"),
    ("gemini-3.5-flash",      "v1beta"),
    ("gemini-2.5-flash-lite", "v1beta"),
]

def log(*a):
    print(*a, flush=True)   # 실시간 출력 (버퍼링 제거)

def find_model():
    log(f"[init] API_KEY 길이: {len(API_KEY)}, 앞4자: {API_KEY[:4] if API_KEY else '없음'}")
    if not API_KEY:
        raise RuntimeError("GEMINI_API_KEY 비어 있음")
    for model, ver in CANDIDATES:
        url = (f"https://generativelanguage.googleapis.com/{ver}/models/"
               f"{model}:generateContent?key={API_KEY}")
        body = json.dumps({"contents":[{"parts":[{"text":"hi"}]}]}).encode()
        req  = urllib.request.Request(url, data=body,
               headers={"Content-Type":"application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                r.read()
            log(f"[init] 모델 확정: {model} ({ver})")
            return model, ver
        except urllib.error.HTTPError as e:
            detail = ""
            try: detail = e.read().decode()[:200].replace("\n"," ")
            except Exception: pass
            log(f"  {model}/{ver} → HTTP {e.code}: {detail}")
        except Exception as e:
            log(f"  {model}/{ver} → {e}")
    raise RuntimeError("사용 가능한 모델 없음")

EN_MARKERS = ("_EN", "_en", "_FINAL", "_english", "_ENG")

def is_english_file(p):
    """이미 영문판인 파일명 패턴 판별."""
    stem = p.stem
    return any(m in stem for m in EN_MARKERS)

def pending():
    """번역이 필요한 한글 보고서 목록 (경로순). 영문 파일·번역완료본 제외."""
    files=[]
    for d in SCAN_DIRS:
        for p in d.rglob("*.html"):
            if is_english_file(p):
                continue                        # 이미 영문판
            if p.with_name(p.stem+"_EN.html").exists():
                continue                        # 번역본 이미 존재
            # 한글이 실질적으로 있는 파일만 (영문 위주 파일 걸러냄)
            txt = p.read_text(encoding="utf-8", errors="ignore")
            if len(KO.findall(txt)) < 30:
                continue
            files.append(p)
    return sorted(files)

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
    raw  = data["candidates"][0]["content"]["parts"][0]["text"].strip()
    if raw.startswith("```"):
        raw = re.sub(r"^```[a-zA-Z]*\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw).strip()
    out  = json.loads(raw)
    if not (isinstance(out, list) and len(out) == len(texts)):
        raise ValueError(f"길이 불일치 {len(out)}!={len(texts)}")
    return [str(x) for x in out]

def translate_batch(model, ver, texts, gb):
    if DRY: return list(texts)
    for attempt in range(3):
        try:
            return call_api(model, ver, texts, gb)
        except Exception as e:
            log(f"     retry {attempt+1}: {e}")
            time.sleep(8*(attempt+1))
    raise RuntimeError("재시도 후 번역 실패")

def chunks(seq, budget=7000):
    cur, acc = [], 0
    for s in seq:
        if cur and acc+len(s) > budget:
            yield cur; cur, acc = [], 0
        cur.append(s); acc += len(s)
    if cur: yield cur

def process(f, model, ver, gb):
    log(f"→ {f.relative_to(ROOT)}")
    html  = f.read_text(encoding="utf-8")
    soup  = BeautifulSoup(html, "html.parser")
    base  = str(BeautifulSoup(html, "html.parser"))
    nodes = collect_nodes(soup)
    texts = [str(n) for n in nodes]
    log(f"   텍스트 노드 {len(texts)}개, 청크 분할 번역 시작")
    done  = []
    ci = 0
    for ch in chunks(texts):
        ci += 1
        done += translate_batch(model, ver, ch, gb)
        log(f"   청크 {ci} 완료 ({len(done)}/{len(texts)})")
        if not DRY: time.sleep(2)
    for n, new in zip(nodes, done):
        n.replace_with(NavigableString(new))
    for tag in soup.find_all(attrs={"lang": True}):
        tag["lang"] = "en"
    out   = str(soup)
    bt,ot = base.count("<"), out.count("<")
    ko_o  = len(KO.findall(html)); ko_l = len(KO.findall(out))
    # 검증: 한글이 충분히 줄었는가(핵심) + 태그 급변 여부(경고만)
    ko_ok = DRY or ko_l < max(80, int(ko_o*0.05))   # 한글 95% 이상 번역
    if not ko_ok:
        log(f"   [FAIL] 한글 잔존 과다 ko {ko_o}->{ko_l} — 미생성")
        return None
    if abs(bt-ot) > 40:                              # 구조 심각 훼손만 차단
        log(f"   [FAIL] 태그 급변 {bt}->{ot} (>40) — 미생성")
        return None
    if abs(bt-ot) > 2:
        log(f"   [warn] 태그 변동 {bt}->{ot} — 번역 과정 정상 범위로 간주")
    en = f.with_name(f.stem+"_EN.html")
    en.write_text(out, encoding="utf-8")
    log(f"   [OK] {en.name} (ko {ko_o}->{ko_l})")
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
    todo = pending()
    if not todo:
        log("번역할 파일 없음 — 모든 보고서 영문판 완비. 종료.")
        return
    log(f"남은 미번역: {len(todo)}편")
    if DRY:
        model, ver = "(dry)", "(dry)"
        log("[init] DRY 모드 — API 생략")
    else:
        model, ver = find_model()
    targets = todo if ALL else todo[:1]
    log(f"이번 실행 처리: {len(targets)}편")
    made=0; failed=0
    for f in targets:
        try:
            if process(f, model, ver, gb):
                made+=1
                rebuild_manifest()
            else:
                failed+=1
        except Exception as e:
            failed+=1
            log(f"   [SKIP] {f.name} 예외로 건너뜀: {e}")
            continue
    n = rebuild_manifest()
    log(f"완료: 성공 {made}편 / 실패·스킵 {failed}편 / 매니페스트 총 {n}편 / 남은 {len(pending())}편")

if __name__=="__main__":
    main()
