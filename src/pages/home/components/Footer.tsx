import { useTranslation } from "react-i18next";

export default function Footer() {
  const { i18n } = useTranslation();
  const isKo = i18n.language === "ko";

  const cols = [
    {
      title: "Reports",
      links: ["최신 분석", "REVERBANT", "BSLI", "UI · Λ¹²"],
    },
    {
      title: "Institute",
      links: ["연구소 소개", "방법론", "SSRN 논문", "연락처"],
    },

  ];

  return (
    <footer style={{ isolation: "isolate", backgroundColor: "#1E3A2F" }} className="text-white/90">
      <div className="w-full px-6 md:px-10 pt-16 md:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 flex items-center justify-center rounded-full text-white"
                style={{ backgroundColor: "#5E9186" }}
              >
                <i className="ri-bar-chart-2-line text-lg" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-body text-[15px] font-semibold text-white">
                  늘푸른바다
                </span>
                <span className="font-mono text-[9px] tracking-widest uppercase text-white/50">
                  Everblue Sea Institute
                </span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              민중의 고통을 가리키는 나침반.
              <br />독립 사회동역학 연구소 · 2026
            </p>
            <p className="mt-6 text-xs font-mono text-white/40 tracking-widest uppercase">
              Ulsan · Seoul · Global
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <p className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-4">
                {c.title}
              </p>
              <ul className="space-y-3">
                {c.links.map((l) => {
                  const label = typeof l === "string" ? l : l.label;
                  const href = typeof l === "string" ? "#top" : l.href;
                  const isExternal = typeof l !== "string";
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/80 hover:text-amber-300 transition cursor-pointer whitespace-nowrap inline-flex items-center gap-1"
                      >
                        {label}
                        {isExternal && <i className="ri-external-link-line text-[10px]" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-4">
              Contact
            </p>
            <a
              href="mailto:hello@everbluesea.org"
              className="text-sm text-white/80 hover:text-amber-300 transition cursor-pointer whitespace-nowrap block"
            >
              hello@everbluesea.org
            </a>
            <p className="mt-2 font-mono text-xs text-white/40">
              ORCID 0009-0004-7638-0182
            </p>
            <p className="font-mono text-xs text-white/40">
              SSRN · Giseub Kim
            </p>
            <p className="mt-3 text-sm text-white/50">
              협찬 및 협업 문의
            </p>
          </div>
        </div>

        {/* Slogan */}
        <div className="mt-14 md:mt-16 py-8 border-t border-white/10">
          <p className="text-center text-sm md:text-base text-white/50 leading-relaxed max-w-2xl mx-auto font-display italic">
            {isKo ? (
              <>인류의 경험과 수많은 훌륭한 데이터들이 모여<br />은하수와 같은 현명한 빛으로 거듭나길 염원하는 마음으로</>
            ) : (
              <>May the accumulated wisdom of human experience and data<br />be reborn as the luminous light of the Milky Way.</>
            )}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 Everblue Sea Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}