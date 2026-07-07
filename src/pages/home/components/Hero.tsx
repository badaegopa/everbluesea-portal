import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* 세계지도 배경 */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0, opacity: 0.35 }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
          alt=""
          aria-hidden="true"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>



      {/* Hero 콘텐츠 */}
      <div
        className="relative flex flex-col items-center text-center gap-6 md:gap-8 px-6 pt-28 md:pt-32 pb-16"
        style={{ zIndex: 3 }}
      >
        {/* 뱃지 */}
        <div
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase"
          style={{
            backgroundColor: "rgba(94,145,134,0.10)",
            color: "#3d6b62",
            border: "1px solid rgba(94,145,134,0.22)",
          }}
        >
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#B8850E" }} />
          {t("hero_badge")}
        </div>

        {/* 타이포 */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="font-mono text-base md:text-lg tracking-[0.2em]"
            style={{ color: "#3d6b62" }}
          >
            {t("hero_title_2")}
          </span>
          <h1 className="font-display leading-[1.05] tracking-tight" style={{ color: "#2A3D35" }}>
            <em
              className="not-italic block text-3xl md:text-4xl"
              style={{ fontStyle: "italic", color: "#B8850E" }}
            >
              Everblue Sea
            </em>
            <span className="block text-5xl md:text-7xl xl:text-8xl">
              Institute for Social<br />Dynamics
            </span>
          </h1>
        </div>

        {/* Λ¹² 공식 박스 */}
        <div
          className="rounded-xl px-6 py-4 font-mono text-sm md:text-base text-left max-w-2xl w-full"
          style={{
            backgroundColor: "rgba(245,243,238,0.80)",
            border: "1px solid rgba(94,145,134,0.22)",
            color: "#2A3D35",
          }}
        >
          <div className="tracking-wide">
            Λ¹² = &#123; BRI · SSI · GPI · PFI · Ω_MZ · AMI · NI · GCI · LPI · SC · PDI &#125; + CI
          </div>
          <div className="text-xs mt-1.5" style={{ color: "#5E9186" }}>
            ▸ 11 internal variables · 1 external lead variable (Corruption Index)
          </div>
        </div>

        {/* 철학 문구 */}
        <p className="text-base md:text-lg max-w-xl leading-relaxed" style={{ color: "#4a5a52" }}>
          {t("hero_compass")}
        </p>

      </div>
    </section>
  );
}