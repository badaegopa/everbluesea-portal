// 보고서 통합 검색 검증 — src/lib/reportSearch.ts 를 그대로 불러와(Node 24 타입 제거 실행) 결과를 찍는다.
// 사용:  node scripts/verify-report-search.mjs [질의 …]
//   질의를 주면 그 질의만 상위 10편까지 보여 준다.
import { registerHooks } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// "@/..." 별칭과 확장자 없는 import 를 .ts 로 풀어 준다(Vite 와 같은 규칙).
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith("@/")) spec = pathToFileURL(path.join(root, "src", spec.slice(2))).href;
    try {
      return next(spec, ctx);
    } catch (e) {
      if (/^(\.|file:)/.test(spec) && !/\.[cm]?[jt]sx?$/.test(spec)) return next(spec + ".ts", ctx);
      throw e;
    }
  },
});

const rs = await import(pathToFileURL(path.join(root, "src/lib/reportSearch.ts")).href);
const ci = await import(pathToFileURL(path.join(root, "src/lib/countryIndex.ts")).href);
const { searchReports, searchCategories, searchEntries, normalizeQueryText } = rs;
const { searchCountries } = ci;

const show = (q, n = 5) => {
  const hits = searchReports(q);
  const cats = searchCategories(q, hits);
  const ctry = searchCountries(q, 8);
  console.log(`\n「${q}」 → 보고서 ${hits.length}편 · 분류 ${cats.length}개 · 나라 ${ctry.length}개`);
  if (ctry.length) console.log(`   나라: ${ctry.map((c) => `${c.country.ko}(${c.count})`).join(", ")}`);
  if (cats.length) console.log(`   분류: ${cats.map((c) => `${c.category.ko}(${c.count})`).join(", ")}`);
  hits.slice(0, n).forEach((h) =>
    console.log(`   ${String(h.score).padStart(2)} ${h.ir.report.date} [${h.ir.category}] ${h.ir.report.title.slice(0, 64)}`),
  );
  return { hits, cats, ctry };
};

const custom = process.argv.slice(2);
if (custom.length) {
  for (const q of custom) show(q, 10);
  process.exit(0);
}

console.log(`색인: 보고서 ${searchEntries().length}편`);
console.log(`정규화 확인: "Λ¹²" → ${normalizeQueryText("Λ¹²")}, "람다" → ${normalizeQueryText("람다")}, "B S L I" → ${normalizeQueryText("B S L I")}`);

// [질의, 기대: "some" | "none", 추가 검사(선택)]
const titleOf = (h) => `${h.ir.report.title} ${h.ir.report.titleEn || ""}`;
const cases = [
  ["시위", "some"],
  ["BSLI", "some"],
  ["bsli", "some"],
  ["재정", "some"],
  ["protest", "some"],
  ["한국", "some", (r) => r.hits.every((h) => !/북한|North Korea/.test(h.ir.report.title + (h.ir.report.titleEn || "")) || /한국|South Korea|대한민국/.test(titleOf(h)))],
  ["Korea", "some"],
  ["람다", "some"],
  ["Λ¹²", "some"],
  ["lambda12", "some"],
  ["분쟁", "some"],
  ["봉기 지수", "some"],
  ["한국 봉기", "some"],
  ["인도", "any", (r) => r.hits.every((h) => !/인도네시아|Indonesia/.test(titleOf(h)) || /인도(?!네시아|적|양|주의)|India/.test(titleOf(h)))],
  ["수단", "any", (r) => r.hits.every((h) => !/남수단|South Sudan/.test(titleOf(h)) || /(?<!남)수단|(?<!South )Sudan/.test(titleOf(h)))],
  ["Niger", "any", (r) => r.hits.every((h) => !/Nigeria|나이지리아/.test(titleOf(h)) || /Niger(?!ia)|니제르/.test(titleOf(h)))],
  ["ui", "some", (r) => r.hits.every((h) => !/Guinea/.test(titleOf(h)) || h.ir.category === "cat-ui" || /\bUI\b/i.test(titleOf(h) + h.ir.report.htmlPath))],
  ["쀍쀍zzqx", "none"],
  ["", "none"],
];

let fail = 0;
for (const [q, expect, extra] of cases) {
  const r = show(q, 3);
  let ok = expect === "some" ? r.hits.length > 0 : expect === "none" ? r.hits.length === 0 && r.cats.length === 0 : true;
  if (ok && extra) ok = extra(r);
  if (!ok) fail++;
  console.log(`   ${ok ? "OK" : "FAIL"} (기대: ${expect === "some" ? "1편 이상" : expect === "none" ? "0편" : "함정 없음"})`);
}
console.log(`\n${fail ? `실패 ${fail}건` : "모두 통과"}`);
process.exit(fail ? 1 : 0);
