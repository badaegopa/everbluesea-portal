#!/usr/bin/env python3
"""한글 보고서(HTML) → 영문판(_EN.html) 자동 생성.
사용: python scripts/translate_reports.py           # 직전 푸시에서 변경된 한글 보고서만
      python scripts/translate_reports.py --all     # _EN 미보유 전체 소급
      python scripts/translate_reports.py --dry     # 번역 없이 구조 보존 검증(동일 텍스트 재주입)
"""
import os, sys, json, re, subprocess, time
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString

ROOT = Path(__file__).resolve().parents[1]
SCAN_DIRS = [ROOT / "public/nations", ROOT / "public/engines"]
MANIFEST = ROOT / "public/translations.json"
GLOSSARY = ROOT / "translation/glossary.json"
KO = re.compile(r"[가-힣]")
SKIP_PARENTS = {"script", "style", "code"}
MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
DRY = "--dry" in sys.argv
MODE = "all" if "--all" in sys.argv else "changed"

def targets():
    files = []
    if MODE == "changed":
        out = subprocess.run(["git", "diff", "--name-only", "HEAD^", "HEAD"],
                             capture_output=True, text=True, cwd=ROOT).stdout.split()
        files = [ROOT / f for f in out
                 if f.endswith(".html") and not f.endswith("_EN.html")
                 and (f.startswith("public/nations/") or f.startswith("public/engines/"))
                 and (ROOT / f).exists()]
    else:
        for d in SCAN_DIRS:
            files += [p for p in d.rglob("*.html") if not p.name.endswith("_EN.html")]
        files = [f for f in files if not f.with_name(f.stem + "_EN.html").exists()]
    return files

def collect_nodes(soup):
    nodes = []
    for t in soup.find_all(string=True):
        if t.parent and t.parent.name in SKIP_PARENTS:
            continue
        if KO.search(str(t)):
            nodes.append(t)
    return nodes

def translate_batch(texts, glossary_block):
    if DRY:
        return list(texts)
    from google import genai
    client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
    sys_p = (
        "You are translating a Korean academic sociology/geopolitics report into English.\n"
        "Input is a JSON array of strings. Return ONLY a JSON array of strings with the SAME length and order.\n"
        "Rules: translate Korean into natural academic English; keep numbers, dates, symbols "
        "(η, Λ¹², §, F(t), SE(t), G(t), WD/SN/BH), latin names and URLs unchanged; preserve any leading/trailing "
        "whitespace of each item; never merge, split, drop, or add items; no commentary.\n"
        "Mandatory terminology (Korean → English):\n" + glossary_block
    )
    for attempt in range(3):
        try:
            resp = client.models.generate_content(
                model=MODEL,
                contents=json.dumps(texts, ensure_ascii=False),
                config={"system_instruction": sys_p, "response_mime_type": "application/json"},
            )
            out = json.loads(resp.text)
            if isinstance(out, list) and len(out) == len(texts):
                return [str(x) for x in out]
            raise ValueError(f"length mismatch {len(out)}!={len(texts)}")
        except Exception as e:
            print(f"   retry {attempt+1}: {e}")
            time.sleep(5 * (attempt + 1))
    raise RuntimeError("translation failed after retries")

def chunks(seq, budget=9000):
    cur, acc = [], 0
    for s in seq:
        if cur and acc + len(s) > budget:
            yield cur; cur, acc = [], 0
        cur.append(s); acc += len(s)
    if cur:
        yield cur

def process(f, glossary_block):
    html = f.read_text(encoding="utf-8")
    soup = BeautifulSoup(html, "html.parser")
    baseline = str(BeautifulSoup(html, "html.parser"))  # 파서 정규화 기준선
    nodes = collect_nodes(soup)
    texts = [str(n) for n in nodes]
    done = []
    for ch in chunks(texts):
        done += translate_batch(ch, glossary_block)
        if not DRY:
            time.sleep(1.5)
    for n, new in zip(nodes, done):
        n.replace_with(NavigableString(new))
    for tag in soup.find_all(attrs={"lang": True}):
        tag["lang"] = "en"
    out = str(soup)
    orig_tags, new_tags = baseline.count("<"), out.count("<")
    ko_orig, ko_left = len(KO.findall(html)), len(KO.findall(out))
    ok = abs(orig_tags - new_tags) <= 2 and (DRY or ko_left < max(60, int(ko_orig * 0.03)))
    if not ok:
        print(f"   [FAIL] tags {orig_tags}->{new_tags}, ko {ko_orig}->{ko_left} — EN 파일 미생성")
        return None
    en = f.with_name(f.stem + "_EN.html")
    en.write_text(out, encoding="utf-8")
    print(f"   [OK] {en.name} (ko {ko_orig}->{ko_left})")
    return en

def rebuild_manifest():
    ens = []
    for d in SCAN_DIRS:
        ens += ["/" + str(p.relative_to(ROOT / "public")).replace(os.sep, "/") for p in d.rglob("*_EN.html")]
    MANIFEST.write_text(json.dumps(sorted(ens), ensure_ascii=False, indent=1), encoding="utf-8")
    return len(ens)

def main():
    g = json.loads(GLOSSARY.read_text(encoding="utf-8"))
    glossary_block = "\n".join(f"- {k} → {v}" for k, v in g.items())
    sel = targets()
    print(f"{len(sel)} file(s) queued (mode={MODE}, dry={DRY}, model={MODEL})")
    made = 0
    for f in sel:
        print("→", f.relative_to(ROOT))
        if process(f, glossary_block):
            made += 1
    n = rebuild_manifest()
    print(f"manifest: {n} EN files total, {made} generated this run")

if __name__ == "__main__":
    main()
