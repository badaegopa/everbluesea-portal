// 보고서 통합 검색 — 나라 · 제목 · 주제어 · 분류(카테고리)
//
// 본문은 찾지 않는다. 보고서 항목(src/mocks/*.ts)의 메타데이터만으로, 처음 검색할 때 한 번 색인을 만든다.
//
// 정규화
//  - NFKC(¹² → 12, 전각 → 반각) → 소문자 → Λ/λ·"람다" → "lambda", η·"에타" → "eta"
//  - 글자·숫자 말고는 모두 지운다(띄어쓰기·대소문자·기호 무시: "봉기 지수" = "봉기지수", "bsli" = "BSLI").
//  - 입력 중인 한글 낱자(ㄱ·ㅏ …)가 끝에 붙어 있으면 떼고 찾는다.
//
// 매칭
//  - 질의가 나라 이름(별칭 포함)과 통째로 같으면 글자 부분 일치를 쓰지 않고 국가 색인(countryIndex)을 쓴다.
//    → "인도"가 "인도네시아"·"인도적"에, "수단"이 "남수단"에, "Niger"가 "Nigeria"에, "이란"이 "안정이란"에 걸리지 않는다.
//  - 그 밖에는 필드별 부분 일치: 통째 같음 > 앞부분 > 낱말 앞 > 중간.
//    라틴 문자 3글자 이하(ui, eta, us …)는 낱말 앞에서만 인정한다("ui" ≠ "guinea").
//  - 여러 낱말이면 띄어쓰기를 지운 통째 일치와, 낱말마다 모두 걸리는 경우(AND) 중 나은 쪽을 쓴다.
//
// 점수(작을수록 위) = 종류(0 같음 · 1 앞부분 · 2 낱말 앞 · 3 중간) × 4 + 필드(0 제목 · 1 분류 · 2 권역·엔진 · 3 파일 이름)
// 같은 점수면 최신 보고서가 위.

import { mainCategories } from "@/mocks/home";
import {
  categoryLabel,
  countries,
  indexedReports,
  matchCountriesInText,
  type Country,
  type IndexedReport,
} from "@/lib/countryIndex";

// ── 정규화 ──────────────────────────────────────────────────────
const TRAILING_JAMO = /[ㄱ-ㆎᄀ-ᇿ]+$/;

export function normalizeQueryText(s: string | undefined | null): string {
  if (!s) return "";
  return s
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[λ]/g, "lambda")
    .replace(/람다/g, "lambda")
    .replace(/[η]/g, "eta")
    .replace(/에타/g, "eta")
    .replace(/[^\p{L}\p{N}]/gu, "");
}

/** 원문을 낱말로 잘라 각각 정규화 (낱말 앞 일치용) */
function words(s: string | undefined | null): string[] {
  if (!s) return [];
  return s
    .normalize("NFKC")
    .split(/[^\p{L}\p{N}]+/u)
    .map(normalizeQueryText)
    .filter(Boolean);
}

const LATIN_ONLY = /^[a-z0-9]+$/;

// ── 색인 ────────────────────────────────────────────────────────
interface Field {
  tier: number;
  norm: string;
  words: string[];
}

export interface SearchEntry {
  ir: IndexedReport;
  fields: Field[];
  /** 주제 나라 (countryIndex 와 같음) */
  subject: Set<string>;
  /** 제목 어디엔가 나오는 나라 (경계 검사 통과분) */
  mentioned: Set<string>;
}

export interface CategoryInfo {
  id: string;
  ko: string;
  en: string;
  engineLabel: string;
  total: number;
}

function field(tier: number, ...texts: (string | undefined | null)[]): Field[] {
  return texts
    .filter((t): t is string => !!t)
    .map((t) => ({ tier, norm: normalizeQueryText(t), words: words(t) }))
    .filter((f) => f.norm.length > 0);
}

function fileBase(htmlPath: string): string {
  let base = htmlPath.split("/").pop() || "";
  try {
    base = decodeURIComponent(base);
  } catch {
    /* 그대로 둔다 */
  }
  return base.replace(/\.html?$/i, "");
}

let _entries: SearchEntry[] | null = null;
let _categories: CategoryInfo[] | null = null;

export function categoryInfo(id: string): CategoryInfo {
  const mc = mainCategories.find((c) => c.id === id);
  const l = categoryLabel(id);
  return { id, ko: l.ko, en: l.en, engineLabel: mc?.engineLabel || "", total: 0 };
}

export function searchEntries(): SearchEntry[] {
  if (_entries) return _entries;
  _entries = indexedReports.map((ir) => {
    const r = ir.report;
    const cat = categoryInfo(ir.category);
    const fields = [
      ...field(0, r.title, r.titleEn),
      ...field(1, cat.ko, cat.en, cat.engineLabel),
      // 엔진 표기의 BSLI 는 찾지 않는다(Λ¹² 국가편 "Λ¹²v2·BSLIv7.0" 이 BSLI 검색에 섞이지 않게) — BSLI 보고서는 분류로 찾는다
      ...field(2, r.region, r.regionEn, r.engine?.replace(/BSLI\s*v?[\d.]*/gi, "")),
      ...field(3, fileBase(r.htmlPath)),
    ];
    const mentioned = new Set<string>([
      ...ir.countries,
      ...matchCountriesInText(r.title),
      ...matchCountriesInText(r.titleEn),
    ]);
    return { ir, fields, subject: new Set(ir.countries), mentioned };
  });
  return _entries;
}

/** 보고서가 1편 이상 있는 분류(카드 순서) */
export function reportCategories(): CategoryInfo[] {
  if (_categories) return _categories;
  const counts = new Map<string, number>();
  for (const ir of indexedReports) counts.set(ir.category, (counts.get(ir.category) || 0) + 1);
  const order = mainCategories.map((c) => c.id);
  _categories = [...counts.keys()]
    .sort((a, b) => {
      const ia = order.indexOf(a);
      const ib = order.indexOf(b);
      return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
    })
    .map((id) => ({ ...categoryInfo(id), total: counts.get(id) || 0 }));
  return _categories;
}

// ── 나라 이름 질의 ───────────────────────────────────────────────
let _aliasToIso: Map<string, string[]> | null = null;

function aliasToIso(): Map<string, string[]> {
  if (_aliasToIso) return _aliasToIso;
  const m = new Map<string, string[]>();
  for (const c of countries) {
    for (const a of c.aliases) {
      const k = normalizeQueryText(a);
      if (!k) continue;
      const list = m.get(k) || [];
      if (!list.includes(c.iso3)) list.push(c.iso3);
      m.set(k, list);
    }
  }
  _aliasToIso = m;
  return m;
}

/** 질의(정규화된 낱말)가 나라 이름과 통째로 같으면 그 나라 ISO3 */
export function exactCountries(token: string): string[] {
  return aliasToIso().get(token) || [];
}

// ── 낱말 하나 매칭 ──────────────────────────────────────────────
const NO_MATCH = Infinity;

function scoreField(f: Field, tok: string, wordOnly: boolean): number {
  let kind: number;
  if (f.norm === tok) kind = 0;
  else if (f.norm.startsWith(tok)) kind = 1;
  else if (f.words.some((w) => w.startsWith(tok))) kind = 2;
  else if (!wordOnly && f.norm.includes(tok)) kind = 3;
  else return NO_MATCH;
  return kind * 4 + f.tier;
}

function scoreToken(e: SearchEntry, tok: string): number {
  const isos = exactCountries(tok);
  if (isos.length) {
    if (isos.some((iso) => e.subject.has(iso))) return 0;
    if (isos.some((iso) => e.mentioned.has(iso))) return 12;
    // 나라 이름 질의는 글자 부분 일치를 쓰지 않는다(인도 → 인도네시아 함정 방지).
    // 단, 분류·권역 이름이 통째로 같을 때만 인정(예: 권역 이름이 나라 이름과 같은 경우).
    let best = NO_MATCH;
    for (const f of e.fields) if (f.tier >= 1 && f.tier <= 2 && f.norm === tok) best = Math.min(best, f.tier);
    return best;
  }
  const wordOnly = LATIN_ONLY.test(tok) && tok.length <= 3;
  let best = NO_MATCH;
  for (const f of e.fields) {
    const s = scoreField(f, tok, wordOnly);
    if (s < best) best = s;
  }
  return best;
}

// ── 질의 ────────────────────────────────────────────────────────
export interface ParsedQuery {
  whole: string;
  tokens: string[];
}

export function parseQuery(query: string): ParsedQuery {
  const raw = (query || "").normalize("NFC").trim().replace(TRAILING_JAMO, "").trim();
  const whole = normalizeQueryText(raw);
  const tokens = raw
    .split(/\s+/)
    .map((t) => normalizeQueryText(t.replace(TRAILING_JAMO, "")))
    .filter(Boolean);
  return { whole, tokens };
}

export interface ReportHit {
  ir: IndexedReport;
  score: number;
}

function scoreEntry(e: SearchEntry, q: ParsedQuery): number {
  let best = scoreToken(e, q.whole);
  if (q.tokens.length > 1) {
    let worst = 0;
    for (const t of q.tokens) {
      const s = scoreToken(e, t);
      if (s === NO_MATCH) {
        worst = NO_MATCH;
        break;
      }
      worst = Math.max(worst, s);
    }
    // 낱말별 AND 일치는 통째 일치보다 한 단계 아래
    if (worst !== NO_MATCH) best = Math.min(best, worst + 1);
  }
  return best;
}

const byScoreThenDate = (a: ReportHit, b: ReportHit) =>
  a.score - b.score || b.ir.report.date.localeCompare(a.ir.report.date) || a.ir.report.title.localeCompare(b.ir.report.title, "ko");

/** 일치하는 보고서 전체 (관련도 → 최신순) */
export function searchReports(query: string): ReportHit[] {
  const q = parseQuery(query);
  if (!q.whole) return [];
  const hits: ReportHit[] = [];
  for (const e of searchEntries()) {
    const score = scoreEntry(e, q);
    if (score !== NO_MATCH) hits.push({ ir: e.ir, score });
  }
  return hits.sort(byScoreThenDate);
}

export interface CategoryHit {
  category: CategoryInfo;
  /** 이 질의로 걸린 그 분류의 보고서 수 */
  count: number;
}

/** 분류 이름(한국어·영어·엔진 약칭)이 질의와 맞는 분류 */
export function searchCategories(query: string, hits?: ReportHit[]): CategoryHit[] {
  const q = parseQuery(query);
  if (!q.whole) return [];
  const list = hits || searchReports(query);
  const wordOnly = LATIN_ONLY.test(q.whole) && q.whole.length <= 3;
  const out: { c: CategoryInfo; s: number; count: number }[] = [];
  for (const c of reportCategories()) {
    let best = NO_MATCH;
    for (const f of field(0, c.ko, c.en, c.engineLabel)) best = Math.min(best, scoreField(f, q.whole, wordOnly));
    if (best === NO_MATCH) continue;
    const count = list.filter((h) => h.ir.category === c.id).length;
    if (count > 0) out.push({ c, s: best, count });
  }
  return out.sort((a, b) => a.s - b.s || b.count - a.count).map((x) => ({ category: x.c, count: x.count }));
}

/** 결과 화면의 분류별 개수 */
export function countByCategory(hits: ReportHit[]): { category: CategoryInfo; count: number }[] {
  return reportCategories()
    .map((c) => ({ category: c, count: hits.filter((h) => h.ir.category === c.id).length }))
    .filter((x) => x.count > 0);
}

export const byDateDesc = (a: ReportHit, b: ReportHit) =>
  b.ir.report.date.localeCompare(a.ir.report.date) || a.score - b.score;

/** 검색 결과 페이지 주소 */
export function searchUrl(q: string, cat?: string): string {
  const p = new URLSearchParams({ q: q.trim() });
  if (cat) p.set("cat", cat);
  return `/search?${p.toString()}`;
}

export type { Country };
