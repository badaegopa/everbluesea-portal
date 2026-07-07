import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import EnginePanel from "@/pages/home/components/EnginePanel";
import { engineDetails } from "@/mocks/engineDetails";
import type { EngineDetail } from "@/mocks/engineDetails";
import { mainCategories } from "@/mocks/home";
import { nationReports } from "@/mocks/nationReports";

export default function Categories() {
  const { t, i18n } = useTranslation();
  const isKo = i18n.language === "ko";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("전체");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [selectedEngine, setSelectedEngine] = useState<EngineDetail | null>(null);

  const activeCategory = mainCategories.find((c) => c.id === selectedCategory);

  const handleCardClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setActiveFilter(isKo ? "전체" : "All");
      setActiveTopic(null);
    } else {
      setSelectedCategory(categoryId);
      setActiveFilter(isKo ? "전체" : "All");
      setActiveTopic(null);
    }
  };

  const handleEngineInfo = (engineKey: string) => {
    if (engineKey && engineDetails[engineKey]) {
      setSelectedEngine(engineDetails[engineKey]);
    }
  };

  return (
    <section id="categories" className="py-20 md:py-28 border-y border-background-200" style={{ isolation: "isolate", backgroundColor: "rgba(245, 243, 238, 0.68)" }}>
      <div className="w-full px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] tracking-widest uppercase text-foreground-400">
              {t("engines_label")} · 02
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(61,107,98,0.15)" }} />
          </div>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-tight text-foreground-950">
              {t("engines_title")}
            </h2>
            <p className="mt-5 text-foreground-600 text-base md:text-lg leading-relaxed max-w-xl">
              {t("engines_sub")}
            </p>
          </div>
        </div>

        {/* Category cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8">
          {mainCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const currentLabel = isKo ? cat.label : (cat.labelEn || cat.label);
            const currentFilters = isKo ? cat.subFilters : (cat.subFiltersEn || cat.subFilters);
            const currentTopics = isKo ? cat.topics : (cat.topicsEn || cat.topics);
            const isNationalOpen = cat.id === "cat-national" && isActive;
            return (
              <React.Fragment key={cat.id}>
              <div
                onClick={() => handleCardClick(cat.id)}
                className={`relative rounded-2xl border overflow-hidden p-5 md:p-6 cursor-pointer transition-all duration-200 min-h-[260px] flex flex-col justify-between ${
                  cat.isCore
                    ? "border-background-200/70 hover:border-primary-300/60"
                    : "border-background-200/50 hover:border-background-300"
                } ${isActive ? "ring-2 ring-primary-400" : ""}`}
              >
                {/* Background image */}
                {cat.image ? (
                  <img src={cat.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3" style={{ backgroundColor: "rgba(94,145,134,0.08)" }}>
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#5E9186" }}>COMING SOON</span>
                    <span className="font-mono text-[10px]" style={{ color: "#B8850E" }}>{isKo ? "준비 중입니다" : "In preparation"}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/45" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`font-mono text-xs tracking-widest uppercase ${cat.isCore ? "text-primary-300" : "text-foreground-300"}`}>
                      {cat.engineLabel}
                    </span>
                    <div className="flex items-center gap-2">
                      {cat.engineKey && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEngineInfo(cat.engineKey); }}
                          className="px-3 py-1 rounded-full text-xs font-bold tracking-wide transition cursor-pointer"
                          style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#ffffff", backdropFilter: "blur(4px)" }}
                        >
                          엔진 설명
                        </button>
                      )}
                      <span className="text-xs font-mono text-white/80 bg-white/15 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {cat.count}{isKo ? "건" : ""}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-lg md:text-xl leading-tight text-white">
                    {currentLabel}
                  </h3>

                  {isActive && (
                    <div className="relative z-10 mt-3 flex flex-wrap gap-2">
                      {currentFilters.map((f) => (
                        <button
                          key={f}
                          onClick={(e) => { e.stopPropagation(); setActiveFilter(f); }}
                          className={`px-3 py-1 rounded-full text-xs font-mono transition cursor-pointer whitespace-nowrap border ${activeFilter === f ? "bg-white text-foreground-950 border-white" : "bg-white/20 text-white border-white/40 hover:bg-white/35"}`}
                        >
                          {f}
                        </button>
                      ))}
                      {currentTopics && currentTopics.map((topic) => (
                        <button
                          key={topic}
                          onClick={(e) => { e.stopPropagation(); setActiveTopic(activeTopic === topic ? null : topic); }}
                          className={`px-3 py-1 rounded-full text-xs font-mono transition cursor-pointer whitespace-nowrap border ${activeTopic === topic ? "bg-amber-400 text-foreground-950 border-amber-400" : "bg-white/10 text-white/80 border-white/30 hover:bg-white/25"}`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  )}

                  {isActive && (
                    <span className="inline-flex items-center text-xs text-primary-300 mt-3">
                      <i className="ri-check-line mr-1" /> {isKo ? "선택됨" : "Selected"}
                    </span>
                  )}
                </div>
              </div>

              {/* 국가분석 카드 바로 아래 행 — 인라인 목록 */}
              {isNationalOpen && (() => {
                const filtered = nationReports
                  .filter((r) => {
                    if (activeFilter === "전체" || activeFilter === "All") return true;
                    if (activeFilter === "단독" || activeFilter === "Standalone") return r.scope === "단독";
                    if (activeFilter === "권역별" || activeFilter === "Regional") return r.scope === "권역별";
                    return true;
                  })
                  .sort((a, b) => b.date.localeCompare(a.date));
                return (
                  <div className="col-span-full rounded-2xl border border-background-200/70 bg-background-50 p-4 md:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#5E9186" }}>
                          {isKo ? `국가 분석 보고서 · ${filtered.length}편` : `National Analysis · ${filtered.length}`}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {(isKo ? ["전체", "권역별", "단독"] : ["All", "Regional", "Standalone"]).map((f) => (
                            <button
                              key={f}
                              onClick={(e) => { e.stopPropagation(); setActiveFilter(f); }}
                              className={`px-3 py-1 rounded-full text-xs font-mono transition cursor-pointer whitespace-nowrap ${activeFilter === f ? "bg-primary-500 text-background-50" : "bg-background-100 text-foreground-700 hover:bg-background-200"}`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                      <a href="/reports" className="font-mono text-xs underline" style={{ color: "#B8850E" }}>
                        {isKo ? "전체 페이지로 보기 →" : "Open full page →"}
                      </a>
                    </div>
                    <div className="max-h-[420px] overflow-y-auto rounded-xl border" style={{ borderColor: "rgba(61,107,98,0.12)" }}>
                      {filtered.map((r) => (
                        <a
                          key={r.id}
                          href={r.htmlPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-4 py-3 border-b transition hover:bg-background-100/60"
                          style={{ borderColor: "rgba(61,107,98,0.08)" }}
                        >
                          <span className="text-sm leading-snug" style={{ color: "#1E3A2F" }}>
                            {r.title}
                          </span>
                          <span className="flex items-center gap-2 flex-shrink-0 font-mono text-[10px]" style={{ color: "#5E9186" }}>
                            <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(94,145,134,0.10)" }}>{r.region}</span>
                            <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(184,133,14,0.10)", color: "#B8850E" }}>{r.scope}</span>
                            <span>{r.date}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })()}
              </React.Fragment>
            );
          })}
        </div>


        {/* Sub-filters bar */}
        {activeCategory && (() => {
          const currentLabel = isKo ? activeCategory.label : (activeCategory.labelEn || activeCategory.label);
          const currentFilters = isKo ? activeCategory.subFilters : (activeCategory.subFiltersEn || activeCategory.subFilters);
          const currentTopics = isKo ? activeCategory.topics : (activeCategory.topicsEn || activeCategory.topics);
          const isAxioms = activeCategory.id === "cat-axioms";
          const isFeedback = activeCategory.id === "cat-feedback";
          const selectedAxiom = isAxioms && activeFilter !== "전체" && activeFilter !== "All"
            ? engineDetails["axioms"]?.axioms?.find((a) => a.id === activeFilter)
            : null;
          return (
            <div className="rounded-2xl border border-background-200/70 bg-background-50 p-4 md:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs tracking-widest uppercase text-foreground-600">{activeCategory.engineLabel}</span>
                  <span className="text-foreground-400">·</span>
                  <span className="text-sm font-medium text-foreground-800">{currentLabel}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {currentFilters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer whitespace-nowrap ${activeFilter === f ? "bg-primary-500 text-background-50" : "bg-background-100 text-foreground-700 hover:bg-background-200"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {isAxioms && selectedAxiom && (
                  <div className="pt-4 border-t border-background-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="font-mono text-xs font-bold px-2.5 py-1 rounded"
                        style={{ backgroundColor: "#B8850E20", color: "#B8850E" }}
                      >
                        {selectedAxiom.id}
                      </span>
                      <span className="text-base font-semibold text-foreground-900">{selectedAxiom.name}</span>
                      {selectedAxiom.isNew && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: "#B8850E" }}>
                          신규
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground-700 leading-relaxed mb-3">{selectedAxiom.summary}</p>
                    <p className="text-sm text-foreground-800 leading-relaxed">{selectedAxiom.detail}</p>
                    {selectedAxiom.formula && (
                      <div
                        className="mt-3 px-4 py-3 rounded-lg font-mono text-sm overflow-x-auto"
                        style={{ backgroundColor: "#B8850E10", color: "#B8850E", borderLeft: "3px solid #B8850E" }}
                      >
                        {selectedAxiom.formula}
                      </div>
                    )}
                  </div>
                )}

                {isFeedback && (
                  <div className="pt-4 border-t border-background-200">
                    <p className="text-sm text-foreground-700 leading-relaxed mb-4">
                      연구·협업·데이터 요청 등 어떤 문의든 환영합니다. GitHub 계정 없이 이메일로 바로 연락하실 수 있습니다.
                    </p>
                    <a
                      href={`mailto:hello@everbluesea.org?subject=${encodeURIComponent(activeFilter + ' 문의')}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition hover:opacity-90"
                      style={{ backgroundColor: "#2e6b63" }}
                    >
                      <i className="ri-mail-send-line" />
                      hello@everbluesea.org 로 보내기
                    </a>
                  </div>
                )}

                {currentTopics.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-background-200">
                    <span className="text-xs font-mono text-foreground-500 mr-1 whitespace-nowrap">
                      {isKo ? "주제:" : "Topic:"}
                    </span>
                    {currentTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setActiveTopic(activeTopic === topic ? null : topic)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer whitespace-nowrap ${activeTopic === topic ? "bg-accent-500 text-background-50" : "bg-background-100 text-foreground-700 hover:bg-background-200"}`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      <EnginePanel engine={selectedEngine} onClose={() => setSelectedEngine(null)} />
    </section>
  );
}

function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.querySelector("script")) return;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "badaegopa/-everbluesea");
    script.setAttribute("data-repo-id", "R_kgDOR98S8A");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOR98S8M4DAhXb");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    ref.current.appendChild(script);
  }, []);
  return <div ref={ref} className="giscus" style={{ minHeight: "300px" }} />;
}