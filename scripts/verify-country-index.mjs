// 국가 색인 검증 — src/lib/countryIndex.ts 를 그대로 불러와(Node 24 타입 제거 실행) 결과를 찍는다.
// 사용:  node scripts/verify-country-index.mjs [--all]
//   --all : 보고서마다 잡힌 나라 목록 전체 출력
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

const idx = await import(pathToFileURL(path.join(root, "src/lib/countryIndex.ts")).href);
const { indexedReports, countryReportIndex, countryByIso, matchCountriesInText, countriesForReport } = idx;

const name = (iso) => {
  const c = countryByIso.get(iso);
  return c ? `${c.ko}(${iso})` : iso;
};

console.log(`보고서 총 ${indexedReports.length}편 (중복 제거), 나라를 1개 이상 찾은 보고서 ${indexedReports.filter((r) => r.countries.length).length}편`);
console.log(`보고서가 1편 이상인 나라: ${countryReportIndex.size}개국 / 전체 ${countryByIso.size}개국`);

console.log(`보고서가 없는 나라: ${[...countryByIso.keys()].filter((k) => !countryReportIndex.has(k)).map(name).join(", ")}`);

console.log("\n[보고서 수 상위 15개국]");
[...countryReportIndex.entries()]
  .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
  .slice(0, 15)
  .forEach(([iso, list], i) => console.log(`${String(i + 1).padStart(2)}. ${name(iso)} — ${list.length}편`));

console.log("\n[함정 확인 — 실제 보고서 제목]");
const trap = /인도네시아|니제르|나이지리아|수단|기니|Indonesia|Niger|Sudan|Guinea/;
for (const ir of indexedReports) {
  const t = `${ir.report.title} ${ir.report.titleEn || ""} ${ir.report.htmlPath}`;
  if (!trap.test(t)) continue;
  console.log(`- [${ir.category}] ${ir.report.title.slice(0, 70)}`);
  console.log(`    → ${ir.countries.map(name).join(", ") || "(없음)"}`);
}

console.log("\n[함정 확인 — 합성 문장]");
const samples = [
  "인도네시아와 인도의 비교",
  "인도적 지원과 인도양 항로",
  "니제르·나이지리아 국경",
  "Niger and Nigeria border",
  "남수단과 수단의 송유관",
  "South Sudan vs Sudan",
  "기니·기니비사우·적도 기니·파푸아뉴기니",
  "Guinea, Guinea-Bissau, Equatorial Guinea, Papua New Guinea",
  "도미니카공화국과 도미니카 연방",
  "Dominica and the Dominican Republic",
  "콩고민주공화국과 콩고",
  "DR Congo and Republic of the Congo",
  "Romania and Oman",
  "안정이란 무엇인가 — 이란",
  "UK·US·UAE and the us of them",
  "터키 / Turkey / 튀르키예",
];
for (const s of samples) console.log(`- ${s}\n    → ${matchCountriesInText(s).map(name).join(", ") || "(없음)"}`);

if (process.argv.includes("--all")) {
  console.log("\n[보고서별 전체]");
  for (const ir of indexedReports) console.log(`${ir.category} | ${ir.report.title.slice(0, 60)} → ${ir.countries.join(",")}`);
}

void countriesForReport;
