// 국가 이름 정적 모듈 생성기
// 원본: everbluesea-vault/data/ref/country_names_ko.json  ({ISO3: {en, ko_full, ko}})
// 출력: src/mocks/countries.ts  (원본 그대로 옮긴 순수 데이터 — 손으로 고치지 말 것)
// 표기 보정(한국/북한/대만 등)과 별칭(UK·터키·버마 등)은 src/lib/countryAliases.ts 에서 관리한다.
//
// 사용:  node scripts/gen-countries.mjs [원본 JSON 경로]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = process.argv[2] || "C:/Users/giseu/everbluesea-vault/data/ref/country_names_ko.json";
const out = path.resolve(here, "../src/mocks/countries.ts");

const raw = JSON.parse(fs.readFileSync(src, "utf8"));
const isos = Object.keys(raw).sort();

const lines = isos.map((iso) => {
  const v = raw[iso];
  return `  { iso3: ${JSON.stringify(iso)}, ko: ${JSON.stringify(v.ko)}, koFull: ${JSON.stringify(v.ko_full)}, en: ${JSON.stringify(v.en)} },`;
});

const body = `// 자동 생성 파일 — scripts/gen-countries.mjs 로 다시 만든다. 손으로 고치지 말 것.
// 원본: everbluesea-vault/data/ref/country_names_ko.json (${isos.length}개국)
// 표기 보정·별칭은 src/lib/countryAliases.ts

export interface CountryName {
  iso3: string;
  /** 한국어 짧은 이름 (원본 ko) */
  ko: string;
  /** 한국어 정식 이름 (원본 ko_full) */
  koFull: string;
  /** 영어 이름 (원본 en, ISO 표기) */
  en: string;
}

export const countryNames: CountryName[] = [
${lines.join("\n")}
];
`;

fs.writeFileSync(out, body, "utf8");
console.log(`wrote ${out} (${isos.length} countries)`);
