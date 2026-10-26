import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import CountrySearch from "@/pages/home/components/CountrySearch";
import { countryByIso, countryDisplayName, groupReports, reportsForCountry } from "@/lib/countryIndex";
import { localizedHtmlPath, useTranslationManifest } from "@/lib/localizedPath";

// 국가별 보고서 목록 — /country/:iso
// 묶음: Λ¹² 단독편 → Λ¹² 권역·비교편 → 다른 엔진(카드 순서), 각 묶음 안은 최신순.
export default function CountryPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "ko";
  const isKo = lang.startsWith("ko");
  useTranslationManifest();

  const { iso = "" } = useParams();
  const code = iso.toUpperCase();
  const country = countryByIso.get(code);
  const items = useMemo(() => reportsForCountry(code), [code]);
  const groups = useMemo(() => groupReports(items), [items]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [code]);

  const name = country ? countryDisplayName(country, lang) : code;
  const otherName = country ? (isKo ? country.en : country.ko) : "";
  const scopeLabel = (s: string) =>
    s === "단독" ? t("country_scope_standalone") : s === "권역별" ? t("country_scope_regional") : s;

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
            {t("country_page_kicker")}
          </span>
          <h1
            className="mt-2 font-display text-3xl md:text-4xl xl:text-5xl leading-[1.05] tracking-tight break-keep"
            style={{ color: "#1E3A2F" }}
          >
            {name}
          </h1>
          {country && (
            <p className="mt-2 font-mono text-sm tracking-wide" style={{ color: "#5E9186" }}>
              {otherName} · {country.iso3}
            </p>
          )}
          {country && items.length > 0 && (
            <p className="mt-3 text-sm md:text-base" style={{ color: "#4a5a52" }}>
              {t("country_page_summary", { count: items.length })}
            </p>
          )}
        </div>

        {/* Search another country */}
        <div className="mb-12">
          <CountrySearch compact />
        </div>

        {/* Not found / empty */}
        {!country && (
          <div className="rounded-2xl px-6 py-12 text-center" style={{ backgroundColor: "rgba(94,145,134,0.08)" }}>
            <p className="font-display text-xl" style={{ color: "#1E3A2F" }}>{t("country_not_found_title")}</p>
            <p className="mt-2 text-sm" style={{ color: "#5E9186" }}>{t("country_not_found_desc")}</p>
          </div>
        )}
        {country && items.length === 0 && (
          <div className="rounded-2xl px-6 py-12 text-center" style={{ backgroundColor: "rgba(94,145,134,0.08)" }}>
            <i className="ri-file-search-line text-3xl" style={{ color: "#5E9186" }} aria-hidden="true" />
            <p className="mt-3 font-display text-xl" style={{ color: "#1E3A2F" }}>{t("country_empty_title")}</p>
            <p className="mt-2 text-sm max-w-md mx-auto" style={{ color: "#5E9186" }}>{t("country_empty_desc")}</p>
          </div>
        )}

        {/* Groups */}
        {groups.map((g) => (
          <section key={g.key} className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="font-display text-lg md:text-xl" style={{ color: "#1E3A2F" }}>
                {isKo ? g.labelKo : g.labelEn}
              </h2>
              <span
                className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "rgba(184,133,14,0.10)", color: "#B8850E" }}
              >
                {t("country_report_count", { count: g.items.length })}
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: "rgba(61,107,98,0.15)" }} />
            </div>
            <div className="border-t" style={{ borderColor: "rgba(61,107,98,0.15)" }}>
              {g.items.map(({ report: r }) => (
                <a
                  key={`${g.key}-${r.id}`}
                  href={localizedHtmlPath(r.htmlPath, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-b py-4 md:py-5 group cursor-pointer transition hover:bg-background-100/50"
                  style={{ borderColor: "rgba(61,107,98,0.10)" }}
                  aria-label={`${t("country_open_report")}: ${isKo ? r.title : r.titleEn || r.title}`}
                >
                  <div className="flex items-start sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base md:text-lg leading-snug break-words" style={{ color: "#1E3A2F" }}>
                        {isKo ? r.title : r.titleEn || r.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span
                          className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(94,145,134,0.12)", color: "#3d6b62" }}
                        >
                          {isKo ? r.region : r.regionEn || r.region}
                        </span>
                        <span
                          className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(184,133,14,0.10)", color: "#B8850E" }}
                        >
                          {scopeLabel(r.scope)}
                        </span>
                        <span className="font-mono text-[10px] tracking-wider break-all" style={{ color: "#5E9186" }}>
                          {r.engine}
                        </span>
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
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
