import { useState, useEffect } from "react";

/* ── 홈 하단 공지 알림 띠 ─────────────────────────────────────────────
   ★ 공지할 때: NOTICE_ENABLED 를 true 로 바꾸고 아래 본문 문구를 고친다.
     공지가 바뀌면 NOTICE_KEY 값도 새로 바꿔야 이전에 닫은 방문자에게도 다시 보인다.
   ★ 공지가 없을 때: NOTICE_ENABLED = false (화면에 아무것도 그리지 않음).
     2026-10-08 청해 지시로 끔 — 소스는 공지 전달용으로 보존. */
const NOTICE_ENABLED = false;
const NOTICE_KEY = "dure_notice_hidden";

export default function NoticeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!NOTICE_ENABLED) return;
    const hidden = sessionStorage.getItem(NOTICE_KEY);
    if (!hidden) setVisible(true);
  }, []);

  const handleHide = () => {
    sessionStorage.setItem(NOTICE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(560px, calc(100vw - 32px))",
        backgroundColor: "#F5F3EE",
        border: "1px solid #DDD8CE",
        borderLeft: "4px solid #B8850E",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(42,61,53,0.13)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* 아이콘 */}
      <div
        style={{
          flexShrink: 0,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "rgba(184,133,14,0.12)",
          border: "1px solid rgba(184,133,14,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "15px",
          marginTop: "1px",
        }}
      >
        🔧
      </div>

      {/* 본문 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "10px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#B8850E",
            marginBottom: "5px",
          }}
        >
          알림 · 늘푸른바다 사회동역학연구소
        </div>
        <p
          style={{
            fontSize: "13.5px",
            lineHeight: "1.65",
            color: "#2A3D35",
            margin: 0,
          }}
        >
          홈페이지 리뉴얼로 인해{" "}
          <strong style={{ color: "#1E3A2F" }}>두레에타 시뮬레이터</strong>의
          수치 결과값이 정확히 복원되지 않는 문제가 있습니다.{" "}
          <span style={{ color: "#5E9186" }}>빠른 시일 내에 조치하겠습니다.</span>
        </p>
      </div>

      {/* 닫기 */}
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
        <button
          onClick={handleHide}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9A9A9A",
            fontSize: "18px",
            lineHeight: 1,
            padding: "0 2px",
          }}
          title="닫기"
        >
          ✕
        </button>
        <button
          onClick={handleHide}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "10px",
            letterSpacing: "1px",
            padding: "4px 10px",
            borderRadius: "20px",
            border: "1px solid #DDD8CE",
            backgroundColor: "rgba(94,145,134,0.08)",
            color: "#5E9186",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          오늘 하루 보지 않기
        </button>
      </div>
    </div>
  );
}
