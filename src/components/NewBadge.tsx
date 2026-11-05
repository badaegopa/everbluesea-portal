// 'NEW' 네온 배지 (청해 2026-11-06) — 게시일로부터 7일간 노출. 시안 네온 글로우.
// 크기·위치는 className 으로 조절(카드 코너는 absolute, 목록 행은 inline).

export function NewBadge({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label="NEW"
      className={`inline-flex items-center justify-center font-mono font-bold leading-none tracking-widest select-none ${className}`}
      style={{
        color: "#ffffff",
        background: "linear-gradient(135deg,#67e8f9 0%,#22d3ee 55%,#06b6d4 100%)",
        boxShadow: "0 0 10px rgba(34,211,238,0.85), 0 0 4px rgba(103,232,249,0.7)",
        textShadow: "0 0 5px rgba(255,255,255,0.65)",
        borderRadius: "6px",
      }}
    >
      NEW
    </span>
  );
}
