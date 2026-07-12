import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { localizedHtmlPath, useTranslationManifest } from "@/lib/localizedPath";

interface ReportMeta {
  title: string;
  title_en: string;
  engine: string;
  category: string;
  category_en: string;
  scope: string;
  scope_en: string;
  date: string;
  author: string;
  tags: string[];
  html_path: string;
  status: string;
}

interface Report {
  meta: ReportMeta;
  summary_ko: string;
  summary_en: string;
  body: string;
}

export default function ReportPage() {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const isKo = i18n.language === "ko";
  useTranslationManifest();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/reports/${id}.json`)
      .then((r) => r.json())
      .then((data) => { setReport(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-mono text-sm"
        style={{ backgroundColor: "#F6F3EE", color: "#5E9186" }}
      >
        Loading...
      </div>
    );
  }

  if (!report) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: "#F6F3EE" }}
      >
        <p className="font-mono text-sm" style={{ color: "#5E9186" }}>
          보고서를 찾을 수 없습니다
        </p>
        <a href="/" className="font-mono text-xs underline" style={{ color: "#B8850E" }}>
          ← 홈으로
        </a>
      </div>
    );
  }

  // html_path 있으면 iframe 표시, 없으면 기존 body 방식 fallback
  const hasHtml = !!report.meta.html_path;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F6F3EE" }}>
      {/* 상단 바 */}
      <div
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 h-14 flex items-center justify-between border-b"
        style={{ backgroundColor: "rgba(245,243,238,0.96)", borderColor: "rgba(61,107,98,0.15)" }}
      >
        <a href="/" className="flex items-center gap-2" style={{ color: "#1E3A2F" }}>
          <i className="ri-arrow-left-line" />
          <span className="font-mono text-xs tracking-widest uppercase">Everblue Sea</span>
        </a>
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ backgroundColor: "rgba(94,145,134,0.12)", color: "#3d6b62" }}
          >
            {isKo ? report.meta.category : report.meta.category_en}
          </span>
          <span
            className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ backgroundColor: "rgba(184,133,14,0.10)", color: "#B8850E" }}
          >
            {report.meta.engine}
          </span>
        </div>
      </div>

      {hasHtml ? (
        /* ── iframe 모드: 원본 HTML 통짜 표시 ── */
        <div className="pt-14" style={{ height: "100vh" }}>
          <iframe
            src={localizedHtmlPath(report.meta.html_path, i18n.language)}
            title={isKo ? report.meta.title : report.meta.title_en}
            style={{
              width: "100%",
              height: "calc(100vh - 56px)",
              border: "none",
              backgroundColor: "#F5F3EE",
            }}
          />
        </div>
      ) : (
        /* ── fallback: JSON body 텍스트 표시 (샘플 r-001~r-003용) ── */
        <main className="max-w-3xl mx-auto px-6 pt-28 pb-24">
          <div className="flex items-center gap-4 mb-8 font-mono text-[11px] tracking-widest uppercase text-foreground-400">
            <span>{report.meta.date}</span>
            <span>·</span>
            <span>{report.meta.engine}</span>
            <span>·</span>
            <span>{report.meta.author}</span>
          </div>

          <h1
            className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-tight mb-8"
            style={{ color: "#1E3A2F" }}
          >
            {isKo ? report.meta.title : report.meta.title_en}
          </h1>

          <div className="h-px mb-10" style={{ backgroundColor: "rgba(61,107,98,0.15)" }} />

          <div
            className="rounded-xl p-5 mb-10 font-mono text-sm leading-relaxed"
            style={{ backgroundColor: "rgba(94,145,134,0.08)", borderLeft: "3px solid #5E9186", color: "#2A3D35" }}
          >
            <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "#5E9186" }}>
              {isKo ? "요약" : "Summary"}
            </p>
            {isKo ? report.summary_ko : report.summary_en}
          </div>

          <div
            className="prose prose-lg max-w-none leading-relaxed"
            style={{ color: "#2A3D35" }}
            dangerouslySetInnerHTML={{ __html: report.body }}
          />

          <div className="mt-16 pt-8 border-t flex flex-wrap gap-2" style={{ borderColor: "rgba(61,107,98,0.15)" }}>
            {report.meta.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-wider px-3 py-1 rounded-full"
                style={{ backgroundColor: "rgba(94,145,134,0.10)", color: "#3d6b62" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}