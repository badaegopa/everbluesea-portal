import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { searchCountries, countryDisplayName, type CountrySuggestion } from "@/lib/countryIndex";
import { searchCategories, searchReports, searchUrl, type CategoryHit, type ReportHit } from "@/lib/reportSearch";
import { localizedHtmlPath, useTranslationManifest } from "@/lib/localizedPath";

interface Props {
  /** 국가·검색 결과 페이지 상단처럼 좁은 자리에 쓸 때 */
  compact?: boolean;
  /** 검색창에 미리 넣어 둘 질의(검색 결과 페이지) */
  initialQuery?: string;
}

const MAX_COUNTRIES = 6;
const MAX_CATEGORIES = 3;
const MAX_REPORTS = 8;

type Item =
  | { kind: "country"; key: string; s: CountrySuggestion }
  | { kind: "category"; key: string; c: CategoryHit }
  | { kind: "report"; key: string; h: ReportHit }
  | { kind: "all"; key: string };

// 통합 검색창 — 나라(한국어·영어·별칭) · 보고서 제목 · 주제어 · 분류.
// 나라 → /country/:iso, 보고서 → 원문(새 창), 분류·모든 결과 → /search?q=
export default function CountrySearch({ compact = false, initialQuery = "" }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "ko";
  const isKo = lang.startsWith("ko");
  useTranslationManifest();
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const listId = useId();

  const { countryHits, categoryHits, reportHits } = useMemo(() => {
    const reports = searchReports(query);
    return {
      countryHits: searchCountries(query, MAX_COUNTRIES),
      categoryHits: searchCategories(query, reports).slice(0, MAX_CATEGORIES),
      reportHits: reports,
    };
  }, [query]);

  const items: Item[] = useMemo(() => {
    const list: Item[] = [
      ...countryHits.map((s) => ({ kind: "country" as const, key: `c-${s.country.iso3}`, s })),
      ...categoryHits.map((c) => ({ kind: "category" as const, key: `g-${c.category.id}`, c })),
      ...reportHits.slice(0, MAX_REPORTS).map((h) => ({ kind: "report" as const, key: `r-${h.ir.category}-${h.ir.report.id}`, h })),
    ];
    if (reportHits.length > 0) list.push({ kind: "all", key: "all" });
    return list;
  }, [countryHits, categoryHits, reportHits]);

  // 처음 강조: 나라·분류가 있으면 첫 줄, 없으면 "모든 결과 보기"(Enter 가 새 창을 열지 않게)
  const defaultActive = useMemo(() => {
    if (!items.length) return -1;
    if (items[0].kind === "country" || items[0].kind === "category") return 0;
    return items.length - 1;
  }, [items]);
  const cur = active >= 0 && active < items.length ? active : defaultActive;

  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, []);

  const reportHref = (h: ReportHit) => localizedHtmlPath(h.ir.report.htmlPath, lang);

  const choose = (it: Item | undefined) => {
    const q = query.trim();
    if (!it) {
      if (q) {
        setOpen(false);
        navigate(searchUrl(q));
      }
      return;
    }
    setOpen(false);
    if (it.kind === "country") {
      setQuery("");
      navigate(`/country/${it.s.country.iso3}`);
    } else if (it.kind === "category") {
      navigate(searchUrl(q, it.c.category.id));
    } else if (it.kind === "all") {
      navigate(searchUrl(q));
    } else {
      window.open(reportHref(it.h), "_blank", "noopener,noreferrer");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중 Enter 는 글자 확정용이므로 무시
    if (e.nativeEvent.isComposing) return;
    const n = items.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive(n ? (cur + 1) % n : -1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(n ? (cur - 1 + n) % n : -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(items[cur]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showList = open && query.trim().length > 0;
  const activeId = showList && items[cur] ? `${listId}-${items[cur].key}` : undefined;

  const groupHeader = (label: string, count?: number) => (
    <li
      role="presentation"
      className="flex items-center gap-2 px-4 pt-3 pb-1 font-mono text-[10px] tracking-widest uppercase select-none"
      style={{ color: "#B8850E" }}
    >
      <span>{label}</span>
      {count !== undefined && <span style={{ color: "#9BA89F" }}>{count}</span>}
      <span className="flex-1 h-px" style={{ backgroundColor: "rgba(94,145,134,0.15)" }} />
    </li>
  );

  const rowProps = (it: Item, i: number) => ({
    id: `${listId}-${it.key}`,
    role: "option" as const,
    "aria-selected": i === cur,
    onMouseDown: (e: React.MouseEvent) => e.preventDefault(),
    onMouseEnter: () => setActive(i),
    style: {
      backgroundColor: i === cur ? "rgba(94,145,134,0.12)" : "transparent",
      borderColor: "rgba(94,145,134,0.15)",
    },
  });

  let idx = -1;
  const renderItem = (it: Item) => {
    idx += 1;
    const i = idx;
    if (it.kind === "country") {
      const r = it.s;
      return (
        <li key={it.key} {...rowProps(it, i)} onClick={() => choose(it)} className="flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer">
          <span className="min-w-0 flex flex-col">
            <span className="text-sm font-semibold truncate" style={{ color: "#1E3A2F" }}>
              {countryDisplayName(r.country, lang)}
            </span>
            <span className="text-[11px] font-mono truncate" style={{ color: "#6B7F7A" }}>
              {isKo ? r.country.en : r.country.ko} · {r.country.iso3}
            </span>
          </span>
          {r.count > 0 ? (
            <span
              className="flex-shrink-0 font-mono text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap"
              style={{ backgroundColor: "rgba(184,133,14,0.12)", color: "#8a6410" }}
            >
              {t("country_report_count", { count: r.count })}
            </span>
          ) : (
            <span className="flex-shrink-0 font-mono text-[11px] whitespace-nowrap" style={{ color: "#9BA89F" }}>
              {t("country_reports_none")}
            </span>
          )}
        </li>
      );
    }
    if (it.kind === "category") {
      const c = it.c.category;
      return (
        <li key={it.key} {...rowProps(it, i)} onClick={() => choose(it)} className="flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer">
          <span className="min-w-0 flex flex-col">
            <span className="text-sm font-semibold truncate" style={{ color: "#1E3A2F" }}>
              {isKo ? c.ko : c.en}
            </span>
            <span className="text-[11px] font-mono truncate" style={{ color: "#6B7F7A" }}>
              {[c.engineLabel, t("search_category_hint")].filter(Boolean).join(" · ")}
            </span>
          </span>
          <span
            className="flex-shrink-0 font-mono text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ backgroundColor: "rgba(94,145,134,0.14)", color: "#3d6b62" }}
          >
            {t("country_report_count", { count: it.c.count })}
          </span>
        </li>
      );
    }
    if (it.kind === "report") {
      const r = it.h.ir.report;
      const title = isKo ? r.title : r.titleEn || r.title;
      return (
        <li key={it.key} {...rowProps(it, i)} className="block">
          <a
            href={reportHref(it.h)}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="flex items-start justify-between gap-3 px-4 py-2.5 cursor-pointer"
          >
            <span className="min-w-0 flex flex-col">
              <span className="text-sm leading-snug line-clamp-2 break-words" style={{ color: "#1E3A2F" }}>
                {title}
              </span>
              <span className="mt-0.5 text-[11px] font-mono truncate" style={{ color: "#6B7F7A" }}>
                {[isKo ? r.region : r.regionEn || r.region, r.date].filter(Boolean).join(" · ")}
              </span>
            </span>
            <i className="ri-arrow-right-up-line text-sm flex-shrink-0 mt-0.5" style={{ color: "#B8850E" }} aria-hidden="true" />
          </a>
        </li>
      );
    }
    return (
      <li
        key={it.key}
        {...rowProps(it, i)}
        onClick={() => choose(it)}
        className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer border-t"
      >
        <span className="text-sm font-semibold" style={{ color: "#3d6b62" }}>
          {t("search_view_all")}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: "#8a6410" }}>
          {t("country_report_count", { count: reportHits.length })}
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </span>
      </li>
    );
  };

  const countryItems = items.filter((it) => it.kind === "country");
  const categoryItems = items.filter((it) => it.kind === "category");
  const reportItems = items.filter((it) => it.kind === "report");
  const allItem = items.find((it) => it.kind === "all");

  return (
    <div ref={wrapRef} className={`relative w-full ${compact ? "max-w-md" : "max-w-xl"} text-left`}>
      <label
        htmlFor={inputId}
        className="block mb-2 font-mono text-[11px] tracking-widest uppercase"
        style={{ color: "#3d6b62" }}
      >
        <i className="ri-search-2-line mr-1.5" aria-hidden="true" />
        {t("search_label")}
      </label>
      <div
        className="flex items-center gap-2 rounded-full px-4 h-12 transition focus-within:ring-2 focus-within:ring-primary-400"
        style={{
          backgroundColor: "rgba(255,255,255,0.88)",
          border: "1px solid rgba(94,145,134,0.30)",
          boxShadow: "0 6px 24px -12px rgba(30,58,47,0.35)",
        }}
      >
        <i className="ri-search-line text-base flex-shrink-0" style={{ color: "#5E9186" }} aria-hidden="true" />
        <input
          id={inputId}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          role="combobox"
          aria-label={t("search_aria")}
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={activeId}
          autoComplete="off"
          spellCheck={false}
          value={query}
          placeholder={t("search_placeholder")}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="flex-1 min-w-0 bg-transparent outline-none text-sm md:text-base placeholder:text-foreground-400"
          style={{ color: "#1E3A2F" }}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive(-1);
            }}
            className="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer flex-shrink-0"
            style={{ color: "#5E9186" }}
            aria-label={t("country_search_clear")}
          >
            <i className="ri-close-line" aria-hidden="true" />
          </button>
        )}
      </div>

      {showList && (
        <div
          className="absolute left-0 right-0 mt-2 rounded-2xl overflow-hidden z-40"
          style={{
            backgroundColor: "rgba(250,249,245,0.98)",
            border: "1px solid rgba(94,145,134,0.25)",
            boxShadow: "0 18px 40px -18px rgba(30,58,47,0.45)",
          }}
        >
          {items.length === 0 ? (
            <p className="px-4 py-4 text-sm" style={{ color: "#5E9186" }}>
              {t("search_no_match")}
            </p>
          ) : (
            <ul id={listId} role="listbox" className="max-h-[min(28rem,55vh)] overflow-y-auto pb-1">
              {countryItems.length > 0 && groupHeader(t("search_group_countries"))}
              {countryItems.map(renderItem)}
              {categoryItems.length > 0 && groupHeader(t("search_group_categories"))}
              {categoryItems.map(renderItem)}
              {reportItems.length > 0 && groupHeader(t("search_group_reports"), reportHits.length)}
              {reportItems.map(renderItem)}
              {allItem && renderItem(allItem)}
            </ul>
          )}
          {items.length > 0 && (
            <div
              className="hidden sm:block px-4 py-2 text-[10px] font-mono tracking-wide border-t"
              style={{ color: "#9BA89F", borderColor: "rgba(94,145,134,0.15)" }}
            >
              {t("country_search_hint")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
