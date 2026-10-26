import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { searchCountries, countryDisplayName } from "@/lib/countryIndex";

interface Props {
  /** 국가 페이지 상단처럼 좁은 자리에 쓸 때 */
  compact?: boolean;
}

// 국가 검색창 — 한국어·영어 이름, 별칭(UK, 터키, 버마 …) 모두 받는다.
export default function CountrySearch({ compact = false }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "ko";
  const isKo = lang.startsWith("ko");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const listId = useId();

  const results = useMemo(() => searchCountries(query, 8), [query]);

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

  const go = (iso: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/country/${iso}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중 Enter 는 글자 확정용이므로 무시
    if (e.nativeEvent.isComposing) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      const pick = results[active] || results[0];
      if (pick) {
        e.preventDefault();
        go(pick.country.iso3);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showList = open && query.trim().length > 0;
  const activeId = showList && results[active] ? `${listId}-${results[active].country.iso3}` : undefined;

  return (
    <div ref={wrapRef} className={`relative w-full ${compact ? "max-w-md" : "max-w-xl"} text-left`}>
      <label
        htmlFor={inputId}
        className="block mb-2 font-mono text-[11px] tracking-widest uppercase"
        style={{ color: "#3d6b62" }}
      >
        <i className="ri-earth-line mr-1.5" aria-hidden="true" />
        {t("country_search_label")}
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
          aria-label={t("country_search_aria")}
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={activeId}
          autoComplete="off"
          spellCheck={false}
          value={query}
          placeholder={t("country_search_placeholder")}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
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
              setActive(0);
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
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm" style={{ color: "#5E9186" }}>
              {t("country_search_no_match")}
            </p>
          ) : (
            <ul id={listId} role="listbox" className="max-h-[min(22rem,45vh)] overflow-y-auto py-1">
              {results.map((r, i) => {
                const primary = countryDisplayName(r.country, lang);
                const secondary = isKo ? r.country.en : r.country.ko;
                const selected = i === active;
                return (
                  <li
                    key={r.country.iso3}
                    id={`${listId}-${r.country.iso3}`}
                    role="option"
                    aria-selected={selected}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.country.iso3)}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer"
                    style={{ backgroundColor: selected ? "rgba(94,145,134,0.12)" : "transparent" }}
                  >
                    <span className="min-w-0 flex flex-col">
                      <span className="text-sm font-semibold truncate" style={{ color: "#1E3A2F" }}>
                        {primary}
                      </span>
                      <span className="text-[11px] font-mono truncate" style={{ color: "#6B7F7A" }}>
                        {secondary} · {r.country.iso3}
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
              })}
            </ul>
          )}
          {results.length > 0 && (
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
