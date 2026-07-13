#!/usr/bin/env python3
"""도식(JS 데이터) 번역 2차 패스 — 전역 문자열 사전 치환.
설계: everbluesea-i18n-pipeline 스킬 references/script-data-translation.md (2026-07-13).
대상: 이미 생성된 *_EN.html 중 <script> 내부에 한글 문자열이 남은 파일.
원리: script 내 한글 문자열 리터럴을 사전으로 뽑아 번역 후 **파일 전체에서 동일 치환**
      → id="sec-블랙홀" ↔ getElementById('sec-블랙홀') ↔ path === "블랙홀" 참조 일관성 자동 보존.
안전장치:
  - < 또는 > 포함 문자열, URL/경로성 문자열 제외
  - 번역문에서 따옴표·백슬래시 제거(유니코드 인용부호로 치환) → JS 구문 파손 방지
  - 치환 후 '<' 개수 불변 검증, 한글 감소 검증 — 실패 시 원본 유지
옵션: --all(잔존 스캔 전체) / --file 경로 / --dry
"""
import os, sys, json, re, time, urllib.request, urllib.error
from pathlib import Path

ROOT      = Path(__file__).resolve().parents[1]
SCAN_DIRS = [ROOT/"public/nations", ROOT/"public/engines"]
GLOSSARY  = ROOT/"translation/glossary.json"
KO        = re.compile(r"[가-힣]")
API_KEY   = os.environ.get("GEMINI_API_KEY","")
DRY       = "--dry" in sys.argv

CANDIDATES = [
    ("gemini-flash-latest",   "v1beta"),
    ("gemini-3.5-flash",      "v1beta"),
    ("gemini-2.5-flash-lite", "v1beta"),
]

def log(*a): print(*a, flush=True)

def find_model():
    if not API_KEY: raise RuntimeError("GEMINI_API_KEY 비어 있음")
    for model, ver in CANDIDATES:
        url = (f"https://generativelanguage.googleapis.com/{ver}/models/"
               f"{model}:generateContent?key={API_KEY}")
        body = json.dumps({"contents":[{"parts":[{"text":"hi"}]}]}).encode()
        req  = urllib.request.Request(url, data=body,
               headers={"Content-Type":"application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=20) as r: r.read()
            log(f"[init] 모델 확정: {model} ({ver})")
            return model, ver
        except Exception as e:
            log(f"  {model}/{ver} → {e}")
    raise RuntimeError("사용 가능한 모델 없음")

# ── 문자열 리터럴 수집 ─────────────────────────────────────
SCRIPT_RE = re.compile(r"<script\b[^>]*>(.*?)</script>", re.S | re.I)
LIT_RES = [
    re.compile(r"'((?:[^'\\\n]|\\.)*?)'"),
    re.compile(r'"((?:[^"\\\n]|\\.)*?)"'),
    re.compile(r"`((?:[^`\\]|\\.)*?)`", re.S),
]

def excluded(s):
    if "<" in s or ">" in s: return True          # HTML 조각
    if s.startswith(("http://","https://","/")): return True
    if re.search(r"\.(json|html|css|js|png|jpg|svg)\b", s): return True
    return False

def collect_strings(html):
    found = set()
    for m in SCRIPT_RE.finditer(html):
        body = m.group(1)
        for rx in LIT_RES:
            for lm in rx.finditer(body):
                s = lm.group(1)
                if KO.search(s) and not excluded(s):
                    found.add(s)
    return sorted(found, key=len, reverse=True)   # 긴 것 먼저 → 부분치환 방지

# ── 번역 ─────────────────────────────────────────────────
def sanitize(t):
    """JS 문자열 파손 방지: 인용부호류를 유니코드로, 백슬래시 제거."""
    return (t.replace("\\","").replace('"',"”").replace("'","’").replace("`","’"))

def call_api(model, ver, texts, gb):
    url  = (f"https://generativelanguage.googleapis.com/{ver}/models/"
            f"{model}:generateContent?key={API_KEY}")
    prompt = (
        "Translate Korean UI/chart label strings to concise English.\n"
        "Input: JSON array. Output: ONLY a JSON array, SAME length, same order.\n"
        "Keep numbers, symbols (η Λ¹² § etc.), and format markers intact.\n"
        "Do NOT use apostrophes, quotes, or backslashes in output.\n"
        "Terms:\n" + gb + "\n\nInput:\n" + json.dumps(texts, ensure_ascii=False)
    )
    body = json.dumps({"contents":[{"parts":[{"text":prompt}]}],
                       "generationConfig":{"responseMimeType":"application/json"}}).encode()
    req  = urllib.request.Request(url, data=body,
           headers={"Content-Type":"application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=180) as r:
        data = json.loads(r.read())
    raw  = data["candidates"][0]["content"]["parts"][0]["text"].strip()
    if raw.startswith("```"):
        raw = re.sub(r"^```[a-zA-Z]*\n?", "", raw); raw = re.sub(r"\n?```$", "", raw).strip()
    out  = json.loads(raw)
    if not (isinstance(out, list) and len(out) == len(texts)):
        raise ValueError(f"길이 불일치 {len(out)}!={len(texts)}")
    return [sanitize(str(x)) for x in out]

def translate(model, ver, texts, gb):
    if DRY: return list(texts)
    done=[]
    B=40                                            # 문자열 40개 단위 배치
    for i in range(0, len(texts), B):
        batch = texts[i:i+B]
        for attempt in range(3):
            try:
                done += call_api(model, ver, batch, gb); break
            except Exception as e:
                log(f"     retry {attempt+1}: {e}"); time.sleep(8*(attempt+1))
        else:
            raise RuntimeError("재시도 후 번역 실패")
        time.sleep(2)
    return done

# ── 파일 처리 ────────────────────────────────────────────
def process(f, model, ver, gb):
    html = f.read_text(encoding="utf-8")
    strings = collect_strings(html)
    if not strings:
        return False
    log(f"→ {f.relative_to(ROOT)} — script 내 한글 문자열 {len(strings)}개")
    trans = translate(model, ver, strings, gb)
    out = html
    for ko, en in zip(strings, trans):
        if not en or en == ko: continue
        out = out.replace(ko, en)                   # 전역 치환 (참조 일관성)
    ko_o, ko_l = len(KO.findall(html)), len(KO.findall(out))
    if out.count("<") != html.count("<"):
        log(f"   [FAIL] 태그 수 변동 — 원본 유지"); return False
    if ko_l >= ko_o:
        log(f"   [SKIP] 한글 미감소 ko {ko_o}->{ko_l} — 원본 유지"); return False
    if not DRY:
        f.write_text(out, encoding="utf-8")
    log(f"   [OK] {f.name} (script ko {ko_o}->{ko_l})")
    return True

def targets():
    out=[]
    for d in SCAN_DIRS:
        for p in d.rglob("*_EN.html"):
            if collect_strings(p.read_text(encoding="utf-8", errors="ignore")):
                out.append(p)
    return sorted(out)

def main():
    gb = "\n".join(f"- {k} → {v}" for k,v in
                   json.loads(GLOSSARY.read_text(encoding="utf-8")).items())
    if "--file" in sys.argv:
        i = sys.argv.index("--file")
        todo = [ROOT/sys.argv[i+1]]
    else:
        todo = targets()
    if not todo:
        log("도식 번역 대상 없음 — 종료."); return
    log(f"도식 번역 대상: {len(todo)}편")
    model, ver = ("(dry)","(dry)") if DRY else find_model()
    made=fail=0
    for f in todo:
        try:
            if process(f, model, ver, gb): made+=1
            else: fail+=1
        except Exception as e:
            fail+=1; log(f"   [SKIP] {f.name} 예외: {e}")
    log(f"도식 패스 완료: 갱신 {made}편 / 유지·실패 {fail}편")

if __name__=="__main__":
    main()
