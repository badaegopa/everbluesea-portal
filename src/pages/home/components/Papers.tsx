import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function GiscusPanel({ paperId, paperTitle }: { paperId: string; paperTitle: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ── 배포 시 아래 주석 블록 해제 + 상수값 채우기 ──
    const REPO        = "badaegopa/everbluesea-vault";
    const REPO_ID     = "R_XXXXXXXX";
    const CATEGORY    = "General";
    const CATEGORY_ID = "DIC_XXXXXXXX";

    const script = document.createElement("script");
    script.src                   = "https://giscus.app/client.js";
    script.setAttribute("data-repo",            REPO);
    script.setAttribute("data-repo-id",         REPO_ID);
    script.setAttribute("data-category",        CATEGORY);
    script.setAttribute("data-category-id",     CATEGORY_ID);
    script.setAttribute("data-mapping",         "specific");
    script.setAttribute("data-term",            `paper-${paperId}`);
    script.setAttribute("data-reactions-enabled","1");
    script.setAttribute("data-emit-metadata",   "0");
    script.setAttribute("data-input-position",  "top");
    script.setAttribute("data-theme",           "light");
    script.setAttribute("data-lang",            "ko");
    script.crossOrigin = "anonymous";
    script.async = true;
    containerRef.current?.appendChild(script);
    return () => { containerRef.current?.innerHTML = ""; };
    ── 여기까지 ── */
    void paperId; void paperTitle;
  }, [paperId, paperTitle]);

  return (
    <div
      className="border-t border-foreground-100/60 mt-0 px-0 md:px-14 py-6"
      style={{ backgroundColor: "rgba(245,243,238,0.7)" }}
    >
      <div ref={containerRef} className="giscus-container">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[11px] tracking-widest uppercase text-foreground-400">
            Discussion
          </span>
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded-full border"
            style={{ borderColor: "#B8850E", color: "#B8850E" }}
          >
            배포 시 활성화
          </span>
        </div>
        <div
          className="rounded-xl border border-foreground-100/50 p-5 text-sm text-foreground-500 font-mono"
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs"
              style={{ backgroundColor: "rgba(94,145,134,0.15)", color: "#5E9186" }}
            >
              G
            </div>
            <div className="flex-1">
              <div className="text-foreground-400 text-xs mb-1">
                GitHub Discussions via giscus · paper-{paperId}
              </div>
              <div className="text-foreground-300 text-xs leading-relaxed">
                댓글을 작성하려면 GitHub 계정이 필요합니다.
                이 논문에 대한 질문, 피드백, 토론을 환영합니다.
              </div>
              <div className="mt-3 flex gap-2">
                <div className="h-7 w-24 rounded" style={{ backgroundColor: "rgba(94,145,134,0.12)" }} />
                <div className="h-7 w-16 rounded" style={{ backgroundColor: "rgba(94,145,134,0.08)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Papers() {
  const { t } = useTranslation();
  const [openComment, setOpenComment] = useState<string | null>(null);
  const papers = [
    {
      id: "01",
      title: "A Triple-Coordinate Framework for Social Dynamics: BRI, SSI, and GPI Derived from Chaos Theory, Attractor Dynamics, and Fractal Self-Similarity",
      badge: "SSRN 6509200",
      href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6509200",
    },
    {
      id: "02",
      title: "The \u039b\u00b9\u00b2 National Sociodynamic Index: A 12-Dimensional Attractor Model for Societal Phase-Space Analysis with SEISMOS Empirical Validation",
      badge: "SSRN 6632858",
      href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6632858",
    },
    {
      id: "03",
      title: "Basic Social Life Index (BSLI): Framework Design and 139-Country Empirical Validation for Measuring Grassroots Living Stability",
      badge: "SSRN 7033138",
      href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7033138",
      note: "Under Review",
    },
    {
      id: "04",
      title: "REVERBANT v1.1: Dynamic Social Perturbation Response Engine — Axioms A0~A12",
      badge: "준비중",
      href: null,
    },
    {
      id: "05",
      title: "Uprising Index (UI): A Sociodynamic Instability Measurement Framework",
      badge: "SSRN 7033138",
      href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7033138",
    },
  ];

  return (
    <section id="papers" className="py-20 md:py-28" style={{ isolation: "isolate", backgroundColor: "rgba(240,244,241,0.82)" }}>
      <div className="w-full px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] tracking-widest uppercase text-foreground-400">
              {t("papers_label")} · 04
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(61,107,98,0.15)" }} />
          </div>
          <h2 className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-tight text-foreground-950 mb-4">
            {t("papers_title")}
          </h2>
          <p className="font-mono text-xs md:text-sm text-foreground-500 tracking-wide">
            {t("papers_sub")}
          </p>
        </div>

        <div className="border-t border-foreground-200/40">
          {papers.map((paper) => {
            const isOpen = openComment === paper.id;
            return (
              <div key={paper.id} className="border-b border-foreground-200/40">
                <div
                  className="flex items-start gap-5 md:gap-10 py-6 md:py-7 cursor-pointer group"
                  onClick={() => setOpenComment(isOpen ? null : paper.id)}
                >
                  <span className="font-mono text-sm md:text-base text-foreground-400 pt-0.5 flex-shrink-0 w-8">
                    {paper.id}
                  </span>
                  <span className="text-base md:text-lg leading-relaxed flex-1 text-foreground-900 group-hover:text-primary-800 transition">
                    {paper.title}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {paper.href && (
                      <a
                        href={paper.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-full transition hover:bg-primary-100"
                        title="SSRN에서 열기"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-700">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    )}
                    <span className={`font-mono text-[11px] tracking-wider whitespace-nowrap px-3 py-1 rounded-full ${paper.href ? "bg-primary-100 text-primary-800" : "bg-background-200 text-foreground-500"}`}>
                      {paper.badge}
                    </span>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      className={`text-foreground-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>
                {isOpen && (
                  <GiscusPanel paperId={paper.id} paperTitle={paper.title} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}