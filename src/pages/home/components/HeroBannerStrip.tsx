import { useTranslation } from "react-i18next";

export default function HeroBannerStrip() {
  const { i18n } = useTranslation();
  const isKo = i18n.language === "ko";

  const dureChips = [
    { name: "남구", value: "0.61" },
    { name: "동구", value: "0.59" },
    { name: "북구", value: "0.55" },
    { name: "중구", value: "0.50" },
    { name: "울주군", value: "0.47" },
  ];

  const ssrnPapers = [
    { id: "6632858", label: "Λ¹²", href: "https://ssrn.com/abstract=6632858" },
    { id: "6806478", label: "BSLI", href: "https://ssrn.com/abstract=6806478" },
    { id: "7033138", label: "UI", href: "https://ssrn.com/abstract=7033138" },
  ];

  return (
    <div className="w-full" style={{ isolation: "isolate" }}>
      {/* DURE-η 배너 */}
      <div
        className="w-full px-6 md:px-10 py-4 md:py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ backgroundColor: "#1E3A2F" }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs md:text-sm text-white/90 font-medium">
            {isKo
              ? "DURE-η · 울산광역시 공공데이터 AI 활용 창업경진대회 심사중"
              : "DURE-η · Ulsan Public Data AI Competition — Under Review"}
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="text-xs md:text-sm text-white/70">
            {isKo
              ? "두레에타 — 사회구조 진단 대시보드"
              : "DURE-η — Social Structure Diagnostic Dashboard"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {dureChips.map((c) => (
            <span
              key={c.name}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white/90 bg-white/10"
            >
              {c.name} η{c.value}
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
            </span>
          ))}
        </div>
        {/* 심사 완료 후 활성화될 버튼 — 현재 비활성 */}
        <a
          href="/tools/dure_eta_v8.html"
          className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg text-xs font-mono whitespace-nowrap transition"
          style={{
            backgroundColor: "rgba(184,133,14,0.25)",
            color: "#FCD34D",
            border: "1px solid rgba(184,133,14,0.4)",
            pointerEvents: "none",
            opacity: 0.7,
          }}
          aria-disabled="true"
          tabIndex={-1}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
          </svg>
          {isKo ? "대시보드 열기 (심사 후 공개)" : "Open Dashboard (Post-Review)"}
        </a>
      </div>

      {/* SSRN 등재 배너 */}
      <div
        className="w-full px-6 md:px-10 py-5 md:py-6 border-b"
        style={{ backgroundColor: "rgba(240,244,241,0.60)", borderColor: "#D5DDD8" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full" style={{ backgroundColor: "#5E9186" }}>
            <i className="ri-article-line text-white text-lg" />
          </div>
          <div className="flex-1">
            <p className="text-sm md:text-base font-medium" style={{ color: "#1E3A2F" }}>
              {isKo ? "SSRN 논문 등재 완료" : "Papers Published on SSRN"}
            </p>
            <p className="mt-1 text-xs md:text-sm" style={{ color: "#5E9186" }}>
              {isKo
                ? "Λ¹² 사회동역학 프레임워크 · BSLI 기초사회생활지수 · UI 봉기지수 — 전문 무료 열람"
                : "Λ¹² Sociodynamic Framework · BSLI · Uprising Index — Open Access"}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {ssrnPapers.map((p) => (
              <a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg text-xs font-mono text-white transition hover:opacity-85 whitespace-nowrap"
                style={{ backgroundColor: "#1E3A2F" }}
              >
                <i className="ri-external-link-line text-xs" />
                {p.label} · {p.id}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}