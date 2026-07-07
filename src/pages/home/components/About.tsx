import { useTranslation } from "react-i18next";
import { aboutImages } from "@/mocks/home";

export default function About() {
  const { t, i18n } = useTranslation();
  return (
    <section id="about" className="py-20 md:py-28" style={{ isolation: "isolate", backgroundColor: "rgba(245, 243, 238, 0.68)" }}>
      <div className="w-full px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] tracking-widest uppercase text-foreground-400">
              {t("about_label")} · 05
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(61,107,98,0.15)" }} />
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-tight text-foreground-950 whitespace-pre-line">
              {t("about_title")}
            </h2>
            <p className="mt-6 font-display text-xl md:text-2xl italic" style={{ color: "#3d6b62" }}>
              {t("about_compass")}
            </p>
            <p className="mt-8 max-w-2xl text-foreground-700 text-base md:text-lg leading-relaxed">
              {t("about_desc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          <div className="md:col-span-2 h-[360px] md:h-[520px] rounded-3xl overflow-hidden bg-background-100">
            <img
              src={aboutImages.left}
              alt="연구실 풍경"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="md:col-span-3 h-[360px] md:h-[520px] rounded-3xl overflow-hidden bg-background-100 relative">
            <img
              src={aboutImages.right}
              alt="리서치 스튜디오"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between gap-4">
              <div className="bg-background-50/70 backdrop-blur rounded-2xl px-5 py-4 max-w-sm">
                <p className="font-mono text-[11px] tracking-widest uppercase text-foreground-600 mb-1">
                  Editorial principle · 01
                </p>
                <p className="font-display text-lg md:text-xl text-foreground-950 leading-snug">
                  {i18n.language === "ko"
                    ? <>"결론보다 <span className="italic">방법론</span>을 먼저 공개한다."</>
                    : <>"We publish the <span className="italic">methodology</span> before the conclusion."</>
                  }
                </p>
              </div>
              <div className="hidden md:flex flex-col items-center justify-center rounded-2xl bg-accent-500 text-foreground-950 w-24 h-24">
                <span className="font-display text-3xl leading-none">2026</span>
                <span className="font-mono text-[10px] tracking-widest uppercase mt-1">Founded</span>
              </div>
            </div>
          </div>
        </div>

        {/* Institute info row */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { k: "청해(淸海) 김기섭", u: "", t: "Director · Giseub Kim" },
            { k: "0009-0004-7638-0182", u: "", t: "ORCID" },
            { k: "2026", u: "", t: "설립 연도" },
            { k: "everbluesea.org", u: "", t: "Website" },
          ].map((s) => (
            <div
              key={s.t}
              className="rounded-3xl border border-background-200 bg-background-50 p-6"
            >
              <p className="font-display text-xl md:text-2xl leading-tight text-foreground-950">
                {s.k}
              </p>
              <p className="mt-3 text-sm text-foreground-600">{s.t}</p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}