// 국가 표기 보정·별칭 표 (손으로 관리)
//
// src/mocks/countries.ts 는 원본 JSON(ISO 표기)을 그대로 옮긴 자동 생성 파일이다.
// 화면 표기와 보고서 제목 매칭에 필요한 보정은 모두 여기에서만 한다.
//
// 1) DISPLAY — 화면에 보일 짧은 이름. ISO 표기("Korea, Republic of", "타이완, 중국령" 등)를
//    보고서 제목에서 실제로 쓰는 이름으로 바꾼다.
// 2) EXTRA_ALIASES — 보고서 title / titleEn / 파일 이름에서 실제로 쓰이는 변형.
//    새 변형이 보이면 여기 한 줄 추가하면 된다(보고서 항목 파일은 건드리지 않는다).
//    · 대문자 약어(US, UK, UAE, DRC …)는 대소문자를 구분해 맞춘다.
//    · 모호한 이름은 일부러 넣지 않는다: "도미니카"(연방 / 공화국), "조선"(조선업), "America".
// 3) STOP_AFTER — 국가 이름 뒤에 붙으면 국가가 아닌 낱말이 되는 꼬리.
//    예) 인도적·인도주의·인도양, 수단으로(=방법), 오만한, 말리는.

import { countryNames } from "@/mocks/countries";

export interface Country {
  iso3: string;
  /** 한국어 짧은 이름(화면 표기) */
  ko: string;
  /** 한국어 정식 이름 */
  koFull: string;
  /** 영어 짧은 이름(화면 표기) */
  en: string;
  /** 영어 ISO 표기 */
  enFull: string;
  /** 매칭·검색용 별칭 (ko, koFull, en, enFull 포함) */
  aliases: string[];
}

const DISPLAY: Record<string, { ko?: string; en?: string }> = {
  KOR: { ko: "한국", en: "South Korea" },
  PRK: { ko: "북한", en: "North Korea" },
  TWN: { ko: "대만", en: "Taiwan" },
  AUS: { ko: "호주" },
  IRN: { ko: "이란", en: "Iran" },
  RUS: { ko: "러시아", en: "Russia" },
  SYR: { ko: "시리아", en: "Syria" },
  BOL: { ko: "볼리비아", en: "Bolivia" },
  VEN: { ko: "베네수엘라", en: "Venezuela" },
  TZA: { ko: "탄자니아", en: "Tanzania" },
  MDA: { ko: "몰도바", en: "Moldova" },
  LAO: { ko: "라오스", en: "Laos" },
  BRN: { ko: "브루나이", en: "Brunei" },
  VNM: { en: "Vietnam" },
  FSM: { en: "Micronesia" },
  PSE: { en: "Palestine" },
  VIR: { ko: "미국령 버진아일랜드", en: "U.S. Virgin Islands" },
  COD: { ko: "콩고민주공화국", en: "DR Congo" },
  COG: { ko: "콩고공화국", en: "Republic of the Congo" },
  CAF: { ko: "중앙아프리카공화국" },
  ZAF: { ko: "남아프리카공화국" },
  DOM: { ko: "도미니카공화국" },
  BIH: { ko: "보스니아 헤르체고비나" },
};

const EXTRA_ALIASES: Record<string, string[]> = {
  KOR: ["대한민국", "한국", "남한", "South Korea", "Republic of Korea", "Korea", "ROK"],
  PRK: ["북한", "North Korea", "DPRK", "Democratic People's Republic of Korea"],
  USA: ["미국", "미합중국", "United States", "United States of America", "USA", "US", "U.S."],
  GBR: ["영국", "United Kingdom", "UK", "U.K.", "Britain", "Great Britain"],
  TUR: ["튀르키예", "터키", "Türkiye", "Turkiye", "Turkey"],
  CZE: ["체코", "체코공화국", "Czechia", "Czech Republic"],
  BIH: ["보스니아", "보스니아헤르체고비나", "Bosnia", "Bosnia-Herzegovina", "Bosnia and Herzegovina"],
  TLS: ["동티모르", "티모르레스테", "Timor-Leste", "East Timor"],
  MMR: ["미얀마", "버마", "Myanmar", "Burma"],
  AUS: ["호주", "오스트레일리아", "Australia"],
  TWN: ["대만", "타이완", "Taiwan"],
  IRN: ["이란", "Iran"],
  RUS: ["러시아", "Russia"],
  SYR: ["시리아", "Syria"],
  BOL: ["볼리비아", "Bolivia"],
  VEN: ["베네수엘라", "Venezuela"],
  TZA: ["탄자니아", "Tanzania"],
  MDA: ["몰도바", "Moldova"],
  LAO: ["라오스", "Laos", "Lao PDR"],
  BRN: ["브루나이", "Brunei"],
  VNM: ["Vietnam", "Viet Nam"],
  FSM: ["미크로네시아", "Micronesia", "Federated States of Micronesia"],
  PSE: ["Palestine", "팔레스타인"],
  COD: ["콩고민주공화국", "민주콩고", "DR Congo", "DRC", "Democratic Republic of the Congo", "Congo-Kinshasa"],
  COG: ["콩고공화국", "콩고 공화국", "Republic of the Congo", "Congo-Brazzaville", "Congo"],
  CAF: ["중앙아프리카공화국", "Central African Republic"],
  ZAF: ["남아프리카공화국", "남아공", "South Africa"],
  DOM: ["도미니카공화국", "Dominican Republic"],
  DMA: ["도미니카연방", "Dominica", "Commonwealth of Dominica"],
  GNQ: ["적도기니", "Equatorial Guinea"],
  GNB: ["Guinea-Bissau", "Guinea Bissau"],
  CIV: ["Côte d'Ivoire", "Cote d'Ivoire", "Ivory Coast", "코트디부아르"],
  CPV: ["Cape Verde", "Cabo Verde"],
  SWZ: ["Eswatini", "Swaziland", "스와질란드"],
  MKD: ["북마케도니아", "North Macedonia", "Macedonia"],
  STP: ["상투메프린시페", "São Tomé and Príncipe", "Sao Tome and Principe", "São Tomé"],
  MAC: ["마카오", "Macao", "Macau"],
  BHS: ["The Bahamas", "Bahamas"],
  GMB: ["The Gambia", "Gambia"],
  NLD: ["Netherlands", "Holland"],
  ARE: ["아랍에미리트", "UAE", "United Arab Emirates"],
  KNA: ["세인트키츠네비스", "Saint Kitts and Nevis", "St Kitts and Nevis"],
  VCT: ["세인트빈센트그레나딘", "Saint Vincent and the Grenadines", "St Vincent and the Grenadines"],
  LCA: ["Saint Lucia", "St Lucia"],
  ATG: ["앤티가바부다", "Antigua and Barbuda"],
  TTO: ["트리니다드토바고", "Trinidad and Tobago"],
  MHL: ["마셜제도", "Marshall Islands"],
  SLB: ["솔로몬제도", "Solomon Islands"],
  COK: ["쿡제도", "Cook Islands"],
  CYM: ["케이맨제도", "Cayman Islands"],
  XKX: ["코소보", "Kosovo"],
};

/** 별칭 바로 뒤에 이 꼬리가 오면 국가로 보지 않는다. */
export const STOP_AFTER: Record<string, string[]> = {
  인도: ["적", "주의", "양", "차이나", "태평양", "주"],
  수단: ["으로", "과 방법", "을 가리지", "이 되", "일 뿐"],
  오만: ["한", "함", "하게", "과 편견"],
  말리: ["는", "다", "고", "지", "던"],
  가나: ["다"],
  // 영어
  China: [" Sea"], // South/East China Sea
};

function uniq(list: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of list) {
    const t = s.trim();
    if (t && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}

/** ISO 표기 "Korea, Republic of" → "Republic of Korea" */
function reorderComma(en: string): string | null {
  const m = en.match(/^([^,]+),\s*(.+)$/);
  if (!m) return null;
  // "Virgin Islands, U.S." 같은 꼬리 약어는 앞으로
  return `${m[2]} ${m[1]}`.replace(/\s+/g, " ");
}

export const countries: Country[] = countryNames.map((c) => {
  const d = DISPLAY[c.iso3] || {};
  const ko = d.ko || c.ko;
  const en = d.en || c.en;
  const base = [ko, c.ko, c.koFull, en];
  // 쉼표가 들어간 ISO 표기는 제목에 그대로 나올 일이 없으므로 별칭에서 빼고 뒤집은 형태만 넣는다.
  if (c.en.includes(",")) {
    const r = reorderComma(c.en);
    if (r) base.push(r);
  } else {
    base.push(c.en);
  }
  // 한국어 여러 낱말 이름은 붙여 쓴 형태도 별칭으로 ("적도 기니" → "적도기니")
  for (const k of [c.ko, c.koFull, ko]) {
    if (k.includes(" ") && !k.includes(",")) base.push(k.replace(/\s+/g, ""));
  }
  const aliases = uniq([...base, ...(EXTRA_ALIASES[c.iso3] || [])]).filter((a) => !a.includes(","));
  return { iso3: c.iso3, ko, koFull: c.koFull, en, enFull: c.en, aliases };
});

export const countryByIso: Map<string, Country> = new Map(countries.map((c) => [c.iso3, c]));
