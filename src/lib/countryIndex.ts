// 국가별 보고서 색인 — 모듈을 불러올 때 한 번 만든다(순수 함수, 보고서별 하드코딩 없음).
//
// 보고서마다 title / titleEn / htmlPath 파일 이름에서 어떤 나라를 다루는지 찾는다.
//
// 매칭 규칙
//  1. 긴 이름 먼저: 모든 별칭을 길이 내림차순으로 훑고, 이미 잡힌 글자 구간은 가린다.
//     → "인도네시아"가 먼저 잡히면 그 안의 "인도"는 다시 잡히지 않는다.
//       (남수단/수단, 기니비사우·적도 기니·파푸아뉴기니/기니, 콩고민주공화국/콩고,
//        Guinea-Bissau/Guinea, South Sudan/Sudan, American Samoa/Samoa …)
//  2. 영어는 낱말 경계: 앞뒤가 글자·숫자면 버린다 (Niger ≠ Nigeria, Oman ≠ Romania,
//     Dominica ≠ Dominican, India ≠ Indian, Mali ≠ Somalia).
//     대문자 약어(US, UK, UAE, DRC …)는 대소문자까지 같아야 한다.
//  3. 한국어는 왼쪽 경계: 바로 앞이 한글 음절이면 버린다 ("안정이란"의 이란, "대중국").
//     오른쪽은 STOP_AFTER 꼬리만 막는다 (인도적, 수단으로, South China Sea …).
//  4. 주제 우선: 제목의 첫 " — " 앞(머리)과 파일 이름에서 찾은 나라가 주제다.
//     단독편 제목 꼬리에 지나가듯 나오는 나라(예: "에리트레아 … 에티오피아 단교")는 넣지 않는다.
//     머리에서 아무 나라도 못 찾았거나 단독이 아닌 보고서(권역별·비교)는 제목 전체를 본다.
//  5. 파일 이름은 _ - . 로 자른 낱말(최대 4개 이어 붙임)이 별칭과 통째로 같을 때만 인정한다.

import { engineReports } from "@/mocks/engineReports";
import type { NationReport } from "@/mocks/nationReports";
import { mainCategories } from "@/mocks/home";
import { countries, countryByIso, STOP_AFTER, type Country } from "@/lib/countryAliases";

export type { Country };
export { countries, countryByIso };

interface AliasEntry {
  alias: string;
  lower: string;
  iso: string;
  ko: boolean;
  caseSensitive: boolean;
}

const HANGUL = /[가-힣]/;
const LETTER_OR_DIGIT = /[\p{L}\p{N}]/u;

function isAcronym(a: string): boolean {
  return /^[A-Z.]{2,5}$/.test(a);
}

const aliasEntries: AliasEntry[] = (() => {
  const list: AliasEntry[] = [];
  const seen = new Set<string>();
  for (const c of countries) {
    for (const raw of c.aliases) {
      const alias = raw.normalize("NFC");
      const key = `${alias}|${c.iso3}`;
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({
        alias,
        lower: alias.toLowerCase(),
        iso: c.iso3,
        ko: HANGUL.test(alias),
        caseSensitive: isAcronym(alias),
      });
    }
  }
  return list.sort((a, b) => b.alias.length - a.alias.length);
})();

function stopAfter(alias: string, rest: string): boolean {
  const tails = STOP_AFTER[alias];
  if (!tails) return false;
  return tails.some((t) => rest.startsWith(t));
}

/** 글 한 덩어리에서 나라 ISO3 집합을 찾는다 (긴 이름 우선, 경계 검사). */
export function matchCountriesInText(input: string | undefined | null): string[] {
  if (!input) return [];
  const text = input.normalize("NFC");
  const lowerText = text.toLowerCase();
  const sameLength = lowerText.length === text.length;
  const masked = new Uint8Array(text.length);
  const found: string[] = [];

  for (const e of aliasEntries) {
    const hay = e.caseSensitive || !sameLength ? text : lowerText;
    const needle = e.caseSensitive || !sameLength ? e.alias : e.lower;
    let from = 0;
    while (from <= hay.length - needle.length) {
      const i = hay.indexOf(needle, from);
      if (i < 0) break;
      from = i + 1;
      const end = i + needle.length;
      let overlap = false;
      for (let k = i; k < end; k++) {
        if (masked[k]) {
          overlap = true;
          break;
        }
      }
      if (overlap) continue;
      const before = i > 0 ? text[i - 1] : "";
      const after = end < text.length ? text[end] : "";
      if (stopAfter(e.alias, text.slice(end))) continue;
      if (e.ko) {
        if (before && HANGUL.test(before)) continue;
      } else {
        if (before && LETTER_OR_DIGIT.test(before)) continue;
        if (after && LETTER_OR_DIGIT.test(after)) continue;
      }
      masked.fill(1, i, end);
      if (!found.includes(e.iso)) found.push(e.iso);
    }
  }
  return found;
}

// ── 파일 이름 매칭 ───────────────────────────────────────────────
function norm(s: string): string {
  return s.normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

const fileAliasMap: Map<string, string> = (() => {
  const m = new Map<string, string>();
  // 짧은 별칭이 긴 별칭을 덮어쓰지 않도록 긴 것부터 넣고, 이미 있는 키는 두지 않는다.
  for (const e of aliasEntries) {
    const k = norm(e.alias);
    if (k.length >= 2 && !m.has(k)) m.set(k, e.iso);
  }
  return m;
})();

export function matchCountriesInPath(htmlPath: string | undefined | null): string[] {
  if (!htmlPath) return [];
  let base = htmlPath.split("/").pop() || "";
  try {
    base = decodeURIComponent(base);
  } catch {
    /* 그대로 둔다 */
  }
  base = base.replace(/\.html?$/i, "");
  const tokens = base.split(/[_\-.\s]+/).filter(Boolean);
  const found: string[] = [];
  let i = 0;
  while (i < tokens.length) {
    let hit = 0;
    for (let n = Math.min(4, tokens.length - i); n >= 1; n--) {
      const iso = fileAliasMap.get(norm(tokens.slice(i, i + n).join("")));
      if (iso) {
        if (!found.includes(iso)) found.push(iso);
        hit = n;
        break;
      }
    }
    i += hit || 1;
  }
  return found;
}

/** 제목의 머리(첫 " — " 앞) */
export function titleHead(title: string | undefined | null): string {
  if (!title) return "";
  return title.split(/\s+[—–]\s+|\s+-\s+|—/)[0];
}

/** 보고서 한 편이 다루는 나라들 */
export function countriesForReport(r: Pick<NationReport, "title" | "titleEn" | "htmlPath" | "scope">): string[] {
  const out: string[] = [];
  const add = (list: string[]) => list.forEach((iso) => !out.includes(iso) && out.push(iso));
  add(matchCountriesInText(titleHead(r.title)));
  add(matchCountriesInText(titleHead(r.titleEn)));
  add(matchCountriesInPath(r.htmlPath));
  if (r.scope !== "단독" || out.length === 0) {
    add(matchCountriesInText(r.title));
    add(matchCountriesInText(r.titleEn));
  }
  return out;
}

// ── 색인 ────────────────────────────────────────────────────────
export interface IndexedReport {
  report: NationReport;
  /** engineReports 카테고리 ID (cat-national, cat-bsli …) */
  category: string;
  /** 이 보고서가 다루는 나라 ISO3 */
  countries: string[];
}

export const indexedReports: IndexedReport[] = (() => {
  const seen = new Set<string>();
  const list: IndexedReport[] = [];
  for (const [category, arr] of Object.entries(engineReports)) {
    for (const report of arr) {
      const key = `${report.id}|${report.htmlPath}`;
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({ report, category, countries: countriesForReport(report) });
    }
  }
  return list;
})();

const byDateDesc = (a: IndexedReport, b: IndexedReport) => b.report.date.localeCompare(a.report.date);

export const countryReportIndex: Map<string, IndexedReport[]> = (() => {
  const m = new Map<string, IndexedReport[]>();
  for (const ir of indexedReports) {
    for (const iso of ir.countries) {
      if (!m.has(iso)) m.set(iso, []);
      m.get(iso)!.push(ir);
    }
  }
  m.forEach((list) => list.sort(byDateDesc));
  return m;
})();

export function reportsForCountry(iso: string): IndexedReport[] {
  return countryReportIndex.get(iso.toUpperCase()) || [];
}

export function reportCount(iso: string): number {
  return reportsForCountry(iso).length;
}

// ── 묶음(단독편 → 권역·비교 → 다른 엔진) ──────────────────────────
export interface ReportGroup {
  /** "standalone" | "regional" | 카테고리 ID */
  key: string;
  labelKo: string;
  labelEn: string;
  items: IndexedReport[];
}

const EXTRA_CATEGORY_LABELS: Record<string, { ko: string; en: string }> = {
  "cat-dure": { ko: "두레에타", en: "DURE-η" },
  "cat-lci": { ko: "지도자붕괴지수", en: "Leader Collapse Index" },
  "cat-afro": { ko: "AFRO-Λ 아프리카 서브엔진", en: "AFRO-Λ Africa Sub-Engine" },
};

export function categoryLabel(cat: string): { ko: string; en: string } {
  const mc = mainCategories.find((c) => c.id === cat);
  if (mc) return { ko: mc.label, en: mc.labelEn || mc.label };
  return EXTRA_CATEGORY_LABELS[cat] || { ko: cat, en: cat };
}

export function groupReports(items: IndexedReport[]): ReportGroup[] {
  const standalone: IndexedReport[] = [];
  const regional: IndexedReport[] = [];
  const other = new Map<string, IndexedReport[]>();
  for (const ir of items) {
    if (ir.category === "cat-national") {
      if (ir.report.scope === "단독" && ir.countries.length === 1) standalone.push(ir);
      else regional.push(ir);
    } else {
      if (!other.has(ir.category)) other.set(ir.category, []);
      other.get(ir.category)!.push(ir);
    }
  }
  const groups: ReportGroup[] = [];
  const nat = categoryLabel("cat-national");
  if (standalone.length) groups.push({ key: "standalone", labelKo: `${nat.ko} · 단독편`, labelEn: `${nat.en} · Standalone`, items: standalone.sort(byDateDesc) });
  if (regional.length) groups.push({ key: "regional", labelKo: `${nat.ko} · 권역·비교편`, labelEn: `${nat.en} · Regional & Comparative`, items: regional.sort(byDateDesc) });
  const order = mainCategories.map((c) => c.id);
  const cats = [...other.keys()].sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
  });
  for (const cat of cats) {
    const l = categoryLabel(cat);
    groups.push({ key: cat, labelKo: l.ko, labelEn: l.en, items: other.get(cat)!.sort(byDateDesc) });
  }
  return groups;
}

// ── 검색(자동완성) ───────────────────────────────────────────────
export interface CountrySuggestion {
  country: Country;
  count: number;
}

export function searchCountries(query: string, limit = 8): CountrySuggestion[] {
  const q = norm(query);
  if (!q) return [];
  const scored: { c: Country; score: number; count: number }[] = [];
  for (const c of countries) {
    let best = 9;
    for (const a of c.aliases) {
      const n = norm(a);
      if (!n) continue;
      if (n === q) best = Math.min(best, 0);
      else if (n.startsWith(q)) best = Math.min(best, 1);
      else if (n.includes(q)) best = Math.min(best, 2);
    }
    if (best < 9) scored.push({ c, score: best, count: reportCount(c.iso3) });
  }
  scored.sort((a, b) => {
    const ha = a.count > 0 ? 0 : 1;
    const hb = b.count > 0 ? 0 : 1;
    return a.score - b.score || ha - hb || b.count - a.count || a.c.ko.localeCompare(b.c.ko, "ko");
  });
  return scored.slice(0, limit).map((s) => ({ country: s.c, count: s.count }));
}

/** 화면 표기 이름 */
export function countryDisplayName(c: Country, lang: string): string {
  return lang && lang.startsWith("ko") ? c.ko : c.en;
}
