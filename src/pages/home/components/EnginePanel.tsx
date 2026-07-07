import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { EngineDetail, AxiomItem } from "@/mocks/engineDetails";

interface EnginePanelProps {
  engine: EngineDetail | null;
  onClose: () => void;
}

export default function EnginePanel({ engine, onClose }: EnginePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const isKo = i18n.language === "ko";
  const isOpen = engine !== null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  if (!engine) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-foreground-950/40 transition-opacity duration-300 cursor-pointer"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="fixed top-0 right-0 z-[210] h-full w-full md:w-[520px] bg-background-50 flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* 상단 액센트 바 */}
        <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: engine.accent }} />

        <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          {/* 닫기 버튼 */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-background-200 bg-background-50 text-foreground-700 hover:bg-background-100 transition cursor-pointer"
            >
              <i className="ri-close-line text-lg" />
            </button>
          </div>

          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: engine.accent + "15",
                  borderColor: engine.accent + "40",
                  color: engine.accent,
                }}
              >
                {engine.label}
              </span>
              <span className="font-mono text-xs text-foreground-500">{engine.version}</span>
            </div>
            <h2 className="font-display text-2xl text-foreground-950 mb-1">
              {isKo ? engine.nameKo : engine.nameEn}
            </h2>
            <p className="text-sm text-foreground-500 font-mono">
              {isKo ? engine.nameEn : engine.nameKo}
            </p>
          </div>

          <div className="space-y-8 flex-1">

            {/* 01 무엇을 측정하는가 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-widest text-foreground-400">01</span>
                <div className="flex-1 h-px" style={{ backgroundColor: engine.accent + "30" }} />
                <h4 className="font-mono text-[10px] tracking-widest uppercase text-foreground-500">
                  {isKo ? "무엇을 측정하는가" : "What It Measures"}
                </h4>
              </div>
              <p className="text-sm text-foreground-800 leading-relaxed">
                {isKo ? engine.whatItMeasures : engine.whatItMeasuresEn}
              </p>
            </div>

            {/* 02 왜 만들었는가 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-widest text-foreground-400">02</span>
                <div className="flex-1 h-px" style={{ backgroundColor: engine.accent + "30" }} />
                <h4 className="font-mono text-[10px] tracking-widest uppercase text-foreground-500">
                  {isKo ? "왜 만들었는가" : "Why Built"}
                </h4>
              </div>
              <p className="text-sm text-foreground-800 leading-relaxed">
                {isKo ? engine.whyBuilt : engine.whyBuiltEn}
              </p>
            </div>

            {/* 03 핵심 공식 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[10px] tracking-widest text-foreground-400">03</span>
                <div className="flex-1 h-px" style={{ backgroundColor: engine.accent + "30" }} />
                <h4 className="font-mono text-[10px] tracking-widest uppercase text-foreground-500">
                  {isKo ? "핵심 공식" : "Core Formulas"}
                </h4>
              </div>
              <div className="space-y-5">
                {engine.formulas.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border"
                    style={{ borderColor: engine.accent + "25" }}
                  >
                    {/* 수식 박스 */}
                    <div
                      className="px-5 py-4 font-mono text-sm md:text-base text-center leading-relaxed"
                      style={{
                        backgroundColor: engine.accent + "10",
                        color: engine.accent,
                        borderBottom: `1px solid ${engine.accent}20`,
                      }}
                    >
                      {f.expression}
                    </div>
                    {/* 공식 설명 */}
                    <div className="px-5 py-3 bg-background-50">
                      <p className="text-xs text-foreground-600 leading-relaxed mb-3">
                        {f.description}
                      </p>
                      {/* 기호 설명표 */}
                      <div className="space-y-1.5">
                        {f.variables.map((v) => (
                          <div key={v.symbol} className="flex items-start gap-3">
                            <span
                              className="font-mono text-[11px] px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
                              style={{
                                backgroundColor: engine.accent + "12",
                                color: engine.accent,
                              }}
                            >
                              {v.symbol}
                            </span>
                            <span className="text-xs text-foreground-600 leading-relaxed">
                              {v.meaning}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {engine.axioms && engine.axioms.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-foreground-400">◆</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: engine.accent + "30" }} />
                  <h4 className="font-mono text-[10px] tracking-widest uppercase text-foreground-500">
                    13가지 공리
                  </h4>
                </div>
                <div className="space-y-2">
                  {engine.axioms.map((ax) => (
                    <AxiomRow key={ax.id} ax={ax} accent={engine.accent} />
                  ))}
                </div>
                {engine.axiomsQuote && (
                  <div className="mt-5 px-5 py-4 rounded-xl" style={{ backgroundColor: engine.accent + "0D", borderLeft: `3px solid ${engine.accent}` }}>
                    <p className="text-sm italic leading-relaxed text-foreground-800">"{engine.axiomsQuote}"</p>
                    {engine.axiomsQuoteBy && (
                      <p className="mt-2 text-xs font-mono" style={{ color: engine.accent }}>— {engine.axiomsQuoteBy}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 04 데이터 출처 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-widest text-foreground-400">04</span>
                <div className="flex-1 h-px" style={{ backgroundColor: engine.accent + "30" }} />
                <h4 className="font-mono text-[10px] tracking-widest uppercase text-foreground-500">
                  {isKo ? "데이터 출처" : "Data Sources"}
                </h4>
              </div>
              <div className="space-y-2">
                {engine.dataSources.map((src) => (
                  <a
                    key={src.name}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg border transition hover:border-opacity-60 group"
                    style={{ borderColor: engine.accent + "20", backgroundColor: engine.accent + "05" }}
                  >
                    <i className="ri-database-2-line text-xs flex-shrink-0" style={{ color: engine.accent }} />
                    <span className="text-sm text-foreground-700 group-hover:text-foreground-950 transition flex-1">
                      {src.name}
                    </span>
                    <i className="ri-external-link-line text-xs text-foreground-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* 05 분류 체계 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-widest text-foreground-400">05</span>
                <div className="flex-1 h-px" style={{ backgroundColor: engine.accent + "30" }} />
                <h4 className="font-mono text-[10px] tracking-widest uppercase text-foreground-500">
                  {isKo ? "분류 체계" : "Classification"}
                </h4>
              </div>
              <div
                className="px-4 py-3 rounded-lg font-mono text-sm"
                style={{
                  backgroundColor: engine.accent + "10",
                  borderLeft: `3px solid ${engine.accent}`,
                  color: engine.accent,
                }}
              >
                {isKo ? engine.classification : engine.classificationEn}
              </div>
            </div>

          </div>

        </div>
        </div>

        <div className="flex-shrink-0 px-6 md:px-8 py-5 border-t border-background-200 flex items-center gap-3 bg-background-50">
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-background-200 bg-background-50 text-foreground-800 text-sm font-medium hover:bg-background-100 transition cursor-pointer"
            >
              {isKo ? "닫기" : "Close"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-background-50 transition hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: engine.accent }}
            >
              {isKo ? "확인" : "Got it"}
              <i className="ri-check-line" />
            </button>
          </div>
      </div>
    </>
  );
}

function AxiomRow({ ax, accent }: { ax: AxiomItem; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen((v) => !v)} className="rounded-lg border cursor-pointer transition" style={{ borderColor: open ? accent + "50" : accent + "20", backgroundColor: open ? accent + "0D" : ax.isNew ? accent + "08" : "transparent" }}>
      <div className="flex items-start gap-3 px-4 py-3">
        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5" style={{ backgroundColor: accent + "15", color: accent }}>{ax.id}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground-900">{ax.name}</span>
            {ax.isNew && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: accent }}>신규</span>}
          </div>
          <p className="text-xs text-foreground-600 leading-relaxed mt-1">{ax.summary}</p>
          {open && (
            <div className="mt-3 pt-3 border-t" style={{ borderColor: accent + "20" }}>
              <p className="text-xs text-foreground-800 leading-relaxed">{ax.detail}</p>
              {ax.formula && <div className="mt-2.5 px-3 py-2 rounded font-mono text-[11px] overflow-x-auto" style={{ backgroundColor: accent + "10", color: accent }}>{ax.formula}</div>}
            </div>
          )}
        </div>
        <i className={`ri-arrow-down-s-line text-sm flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: accent }} />
      </div>
    </div>
  );
}