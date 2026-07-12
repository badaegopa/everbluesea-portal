import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { nationReports } from "@/mocks/nationReports";
import { localizedHtmlPath, useTranslationManifest } from "@/lib/localizedPath";

const REGIONS = ["전체", "유럽", "아메리카", "동북아시아", "기후·소멸", "중동", "동남아시아", "남아시아"];
const SCOPES = ["전체", "단독", "권역별"];

export default function ReportsPage() {
  const { i18n } = useTranslation();
  const isKo = i18n.language === "ko";
  useTranslationManifest();
  const [region, setRegion] = useState("전체");
  const [scope, setScope] = useState("전체");

  const filtered = useMemo(() => {
    return nationReports
      .filter((r) => region === "전체" || r.region === region)
      .filter((r) => scope === "전체" || r.scope === scope)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [region, scope]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EE" }}>
      {/* Fixed top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 h-14 flex items-center justify-between border-b"
        style={{ backgroundColor: "rgba(245,243,238,0.96)", borderColor: "rgba(61,107,98,0.15)" }}
      >
        <a href="/" className="flex items-center gap-2" style={{ color: "#1E3A2F" }}>
          <i className="ri-arrow-left-line" />
          <span className="font-mono text-xs tracking-widest uppercase">Everblue Sea</span>
        </a>
      </div>

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-24">
        {/* Title */}
        <div className="mb-12">
          <h1
            className="font-display text-3xl md:text-4xl xl:text-5xl leading-[1.05] tracking-tight mb-3"
            style={{ color: "#1E3A2F" }}
          >
            {isKo ? "국가 분석 보고서" : "Country Analysis Reports"}
          </h1>
          <p className="font-mono text-sm tracking-wide" style={{ color: "#5E9186" }}>
            {isKo ? "Λ¹² 사회동역학 엔진 · 37편" : "Λ¹² Sociodynamic Engine · 37 Reports"}
          </p>
        </div>

        {/* Region filter */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className="px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition cursor-pointer whitespace-nowrap"
              style={
                region === r
                  ? { backgroundColor: "#5E9186", color: "#fff" }
                  : { backgroundColor: "rgba(94,145,134,0.10)", color: "#3d6b62" }
              }
            >
              {r}
            </button>
          ))}
        </div>

        {/* Scope filter */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {SCOPES.map((s) => (
            <button
              key={s}
              onClick={() => setScope(s)}
              className="px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition cursor-pointer whitespace-nowrap"
              style={
                scope === s
                  ? { backgroundColor: "#B8850E", color: "#fff" }
                  : { backgroundColor: "rgba(184,133,14,0.10)", color: "#B8850E" }
              }
            >
              {s}
            </button>
          ))}
        </div>

        {/* Report list */}
        <div className="border-t" style={{ borderColor: "rgba(61,107,98,0.15)" }}>
          {filtered.map((r) => (
            <a
              key={r.id}
              href={localizedHtmlPath(r.htmlPath, i18n.language)}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-b py-5 group cursor-pointer transition hover:bg-background-100/50"
              style={{ borderColor: "rgba(61,107,98,0.10)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-display text-base md:text-lg leading-snug transition"
                    style={{ color: "#1E3A2F" }}
                  >
                    {r.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span
                      className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(94,145,134,0.12)", color: "#3d6b62" }}
                    >
                      {r.region}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(184,133,14,0.10)", color: "#B8850E" }}
                    >
                      {r.scope}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: "#5E9186" }}>
                      {r.engine}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: "#9BA89F" }}>
                      {r.date}
                    </span>
                  </div>
                </div>
                <i
                  className="ri-arrow-right-line text-sm hidden sm:block flex-shrink-0"
                  style={{ color: "#B8850E" }}
                />
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-16 font-mono text-sm" style={{ color: "#5E9186" }}>
            {isKo ? "해당 조건의 보고서가 없습니다." : "No reports match the selected filters."}
          </p>
        )}
      </main>
    </div>
  );
}