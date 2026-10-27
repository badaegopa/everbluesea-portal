import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import CountrySearch from "@/pages/home/components/CountrySearch";
import { countryDisplayName, searchCountries } from "@/lib/countryIndex";
import { byDateDesc, categoryInfo, countByCategory, searchReports } from "@/lib/reportSearch";
import { localizedHtmlPath, useTranslationManifest } from "@/lib/localizedPath";

// 보고서 통합 검색 결과 — /search?q=…&cat=…&sort=relevance
// 기본은 최신순, 분류 칩으로 거르기. 보고서는 사이트 다른 곳과 같게 원문을 새 창으로 연다.
export default function SearchPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "ko";
  const isKo = lang.startsWith("ko");
  useTranslationManifest();

  const [params, setParams] = useSearchParams();
  const q = (params.get("q") || "").trim();
  const cat = params.get("cat") || "";
  const sort = params.get("sort") === "relevance" ? "relevance" : "newest";

  const hits = useMemo(() => searchReports(q), [q]);
  const cats = useMemo(() => countByCategory(hits), [hits]);
  const countries = useMemo(() => searchCountries(q, 6).filter((c) => c.count > 0), [q]);
  const shown = useMemo(() => {
    const list = cat ? hits.filter((h) => h.ir.category === cat) : hits.slice();
    return sort === "newest" ? list.sort(byDateDesc) : list;
  }, [hits, cat, sort]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [q]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const scopeLabel = (s: string) =>
    s === "단독" ? t("country_scope_standalone") : s === "권역별" ? t("country_scope_regional") : s;

  const chip = (active: boolean) => ({
    backgroundColor: active ? "#1E3A2F" : "rgba(94,145,134,0.10)",
    color: active ? "#F5F3EE" : "#3d6b62",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EE" }}>
      {/* Fixed top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 h-14 flex items-center justify-between border-b"
        style={{ backgroundColor: "rgba(245,243,238,0.96)", borderColor: "rgba(61,107,98,0.15)" }}
      >
        <Link to="/" className="flex items-center gap-2" style={{ color: "#1E3A2F" }} aria-label={t("country_page_back")}>
          <i className="ri-arrow-left-line" aria-hidden="true" />
          <span className="font-mono text-xs tracking-widest uppercase">Everblue Sea</span>
        </Link>
        <div className="flex items-center text-xs font-mono tracking-wider select-none" style={{ color: "rgba(30,58,47,0.45)" }}>
          <button
            type="button"
            onClick={() => i18n.changeLanguage("ko")}
            className="cursor-pointer px-1.5 py-1"
            style={{ color: isKo ? "#1E3A2F" : undefined, fontWeight: isKo ? 600 : 400 }}
          >
            KO
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={() => i18n.changeLanguage("en")}
            className="cursor-pointer px-1.5 py-1"
            style={{ color: !isKo ? "#1E3A2F" : undefined, fontWeight: !isKo ? 600 : 400 }}
          >
            EN
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-24">
        {/* Title */}
        <div className="mb-8">
          <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: "#B8850E" }}>
            {t("search_page_kicker")}
          </span>
          <h1
            className="mt-2 font-display text-3xl md:text-4xl xl:text-5xl leading-[1.1] tracking-tight break-words"
            style={{ color: "#1E3A2F" }}
          >
            {q ? t("search_page_title", { q }) : t("search_page_prompt")}
          </h1>
          {q && hits.length > 0 && (
            <p className="mt-3 text-sm md:text-base" style={{ color: "#4a5a52" }}>
              {t("search_page_summary", { count: hits.length })}
            </p>
          )}
        </div>

        {/* Search again */}
        <div className="mb-10">
          <CountrySearch compact key={q} initialQuery={q} />
        </div>

        {/* Countries */}
        {countries.length > 0 && (
          <section className="mb-8">
            <h2 className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: "#3d6b62" }}>
              {t("search_page_countries")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {countries.map((c) => (
                <Link
                  key={c.country.iso3}
                  to={`/country/${c.country.iso3}`}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition hover:opacity-80"
                  style={{ backgroundColor: "rgba(184,133,14,0.10)", color: "#8a6410" }}
                >
                  <i className="ri-earth-line" aria-hidden="true" />
                  <span style={{ color: "#1E3A2F" }}>{countryDisplayName(c.country, lang)}</span>
                  <span className="font-mono text-[11px]">{t("country_report_count", { count: c.count })}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empty / prompt */}
        {!q && (
          <div className="rounded-2xl px-6 py-12 text-center" style={{ backgroundColor: "rgba(94,145,134,0.08)" }}>
            <i className="ri-search-2-line text-3xl" style={{ color: "#5E9186" }} aria-hidden="true" />
            <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: "#5E9186" }}>{t("search_prompt_desc")}</p>
          </div>
        )}
        {q && hits.length === 0 && (
          <div className="rounded-2xl px-6 py-12 text-center" style={{ backgroundColor: "rgba(94,145,134,0.08)" }}>
            <i className="ri-file-search-line text-3xl" style={{ color: "#5E9186" }} aria-hidden="true" />
            <p className="mt-3 font-display text-xl" style={{ color: "#1E3A2F" }}>{t("search_empty_title")}</p>
            <p className="mt-2 text-sm max-w-md mx-auto" style={{ color: "#5E9186" }}>{t("search_empty_desc")}</p>
          </div>
        )}

        {hits.length > 0 && (
          <>
            {/* Filters */}
            <div className="flex flex-col gap-3 mb-6">
              <div role="group" aria-label={t("search_filter_label")} className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setParam("cat", "")}
                  aria-pressed={!cat}
                  className="font-mono text-[11px] tracking-wide px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap"
                  style={chip(!cat)}
                >
                  {t("search_filter_all")} {hits.length}
                </button>
                {cats.map(({ category: c, count }) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setParam("cat", c.id)}
                    aria-pressed={cat === c.id}
                    className="font-mono text-[11px] tracking-wide px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap"
                    style={chip(cat === c.id)}
                  >
                    {isKo ? c.ko : c.en} {count}
                  </button>
                ))}
              </div>
              <div role="group" aria-label={t("search_sort_label")} className="flex items-center gap-1 font-mono text-[11px]">
                <span className="mr-1" style={{ color: "#9BA89F" }}>{t("search_sort_label")}</span>
                {(["newest", "relevance"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setParam("sort", s === "newest" ? "" : s)}
                    aria-pressed={sort === s}
                    className="px-2 py-1 rounded cursor-pointer"
                    style={{ color: sort === s ? "#1E3A2F" : "#5E9186", fontWeight: sort === s ? 700 : 400, textDecoration: sort === s ? "underline" : "none" }}
                  >
                    {t(s === "newest" ? "search_sort_newest" : "search_sort_relevance")}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="border-t" style={{ borderColor: "rgba(61,107,98,0.15)" }}>
              {shown.map(({ ir }) => {
                const r = ir.report;
                const c = categoryInfo(ir.category);
                const title = isKo ? r.title : r.titleEn || r.title;
                return (
                  <a
                    key={`${ir.category}-${r.id}`}
                    href={localizedHtmlPath(r.htmlPath, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b py-4 md:py-5 group cursor-pointer transition hover:bg-background-100/50"
                    style={{ borderColor: "rgba(61,107,98,0.10)" }}
                    aria-label={`${t("country_open_report")}: ${title}`}
                  >
                    <div className="flex items-start sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base md:text-lg leading-snug break-words" style={{ color: "#1E3A2F" }}>
                          {title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span
                            className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: "rgba(30,58,47,0.08)", color: "#1E3A2F" }}
                          >
                            {isKo ? c.ko : c.en}
                          </span>
                          {(r.region || r.regionEn) && (
                            <span
                              className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: "rgba(94,145,134,0.12)", color: "#3d6b62" }}
                            >
                              {isKo ? r.region : r.regionEn || r.region}
                            </span>
                          )}
                          {r.scope && (
                            <span
                              className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: "rgba(184,133,14,0.10)", color: "#B8850E" }}
                            >
                              {scopeLabel(r.scope)}
                            </span>
                          )}
                          <span className="font-mono text-[10px] tracking-wider" style={{ color: "#9BA89F" }}>
                            {r.date}
                          </span>
                        </div>
                      </div>
                      <i
                        className="ri-arrow-right-up-line text-sm flex-shrink-0 mt-1 sm:mt-0"
                        style={{ color: "#B8850E" }}
                        aria-hidden="true"
                      />
                    </div>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
