import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { featuredReports } from "@/mocks/home";

export default function FeaturedReports() {
  const { t, i18n } = useTranslation();
  const isKo = i18n.language === "ko";

  return (
    <section
      id="reports"
      className="py-20 md:py-28"
      style={{ isolation: "isolate", backgroundColor: "rgba(245,243,238,0.58)" }}
    >
      <div className="w-full px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] tracking-widest uppercase text-foreground-400">
              Latest Analysis · 2026.07 · 01
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(61,107,98,0.15)" }} />
          </div>
          <h2 className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-tight text-foreground-950">
            {t("latest_title")}
          </h2>
        </div>

        {/* Report list */}
        <div className="border-t border-foreground-200/40">
          {featuredReports.map((r) => {
            const title = isKo ? r.title : (r.titleEn || r.title);
            const excerpt = isKo ? r.excerpt : (r.excerptEn || r.excerpt);
            const category = isKo ? r.category : (r.categoryEn || r.category);

            return (
              <Link
                key={r.id}
                to={`/reports/${r.id}`}
                className="block border-b border-foreground-200/40 group cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-8 md:py-10">
                  {/* Image */}
                  <div className="lg:col-span-3 xl:col-span-2">
                    <div className="relative h-40 lg:h-full min-h-[120px] rounded-xl overflow-hidden">
                      <img
                        src={r.image}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="lg:col-span-9 xl:col-span-10 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3 font-mono text-[11px] tracking-widest uppercase text-foreground-500">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono"
                          style={{ backgroundColor: "rgba(94,145,134,0.12)", color: "#3d6b62" }}
                        >
                          {category}
                        </span>
                        <span>{r.date}</span>
                        <span className="hidden md:inline">·</span>
                        <span className="hidden md:inline">{r.author}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl xl:text-4xl leading-tight text-foreground-950 group-hover:text-primary-800 transition">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed max-w-3xl">
                        {excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono tracking-wide text-foreground-400 group-hover:text-foreground-700 transition">
                      <span>{isKo ? "상세 보기" : "Read more"}</span>
                      <i className="ri-arrow-right-line" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-10 flex justify-end gap-6">
          <Link
            to="/reports"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-wide text-foreground-600 hover:text-foreground-950 transition cursor-pointer"
          >
            {isKo ? "국가 분석 보고서 37편 전체 보기" : "View All 37 Country Analysis Reports"}
            <i className="ri-arrow-right-line" />
          </Link>
          <a
            href="#categories"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-wide text-foreground-600 hover:text-foreground-950 transition cursor-pointer"
          >
            {t("latest_all")}
            <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}