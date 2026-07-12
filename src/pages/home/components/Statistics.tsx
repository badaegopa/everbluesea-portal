import { useTranslation } from "react-i18next";

export default function Statistics() {
  const { t, i18n } = useTranslation();
  const isKo = i18n.language === "ko";

  const stats = [
    {
      value: "206",
      unit: isKo ? "개국" : "nations",
      label: t("stat_countries"),
      source: isKo ? "Λ¹² · World Bank · UN Stats" : "Λ¹² · World Bank · UN Stats",
      index: "01",
    },
    {
      value: "965,913",
      unit: "",
      label: t("stat_acled"),
      source: isKo ? "ACLED 2026 전수 분석" : "ACLED 2026 full dataset",
      index: "02",
    },
    {
      value: "A0–A12",
      unit: "",
      label: t("stat_axioms"),
      source: isKo ? "모든 엔진 공통 토대 · 2026-07-03" : "All Engines Common Foundation · 2026-07-03",
      index: "03",
    },
    {
      value: "2",
      unit: "",
      label: t("stat_ssrn"),
      source: "SSRN 6632858 · 6509200",
      index: "04",
    },
  ];

  return (
    <section
      className="py-16 md:py-20"
      style={{ isolation: "isolate", backgroundColor: "rgba(245,243,238,0.72)" }}
    >
      <div className="w-full px-6 md:px-10">
        {/* 섹션 룰라인 */}
        <div className="flex items-center gap-4 mb-10 md:mb-14">
          <span className="font-mono text-[10px] tracking-widest uppercase text-foreground-400">
            SOCIODYNAMICS RESEARCH · EST. 2026
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(61,107,98,0.15)" }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <div
              key={s.index}
              className={`py-6 md:py-8 px-4 md:px-6 ${
                i < stats.length - 1 ? "border-r border-foreground-200/30" : ""
              }`}
            >
              {/* 인덱스 번호 */}
              <p className="font-mono text-[10px] tracking-widest text-foreground-300 mb-4">
                {s.index}
              </p>

              {/* 핵심 수치 */}
              <p
                className="font-display text-4xl md:text-5xl xl:text-6xl leading-none tracking-tight"
                style={{ color: "#1E3A2F" }}
              >
                {s.value}
                {s.unit && (
                  <span
                    className="font-body text-base md:text-lg ml-1.5"
                    style={{ color: "#5E9186" }}
                  >
                    {s.unit}
                  </span>
                )}
              </p>

              {/* 라벨 */}
              <p className="mt-3 text-sm font-medium" style={{ color: "#3d6b62" }}>
                {s.label}
              </p>

              {/* 출처 */}
              <p className="mt-1.5 font-mono text-[10px] tracking-wide text-foreground-400">
                {s.source}
              </p>
            </div>
          ))}
        </div>

        {/* 하단 룰라인 */}
        <div className="mt-10 md:mt-14 h-px" style={{ backgroundColor: "rgba(61,107,98,0.15)" }} />
      </div>
    </section>
  );
}