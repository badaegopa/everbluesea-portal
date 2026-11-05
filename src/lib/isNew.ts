// 게시일로부터 일정 기간 'NEW' 표시 (청해 2026-11-06) — 기본 7일 유지
export const NEW_WINDOW_DAYS = 7;

/** dateStr("YYYY-MM-DD")가 오늘로부터 days일 이내면 true. 미래/무효 날짜는 false. */
export function isNew(dateStr?: string, days: number = NEW_WINDOW_DAYS): boolean {
  if (!dateStr) return false;
  const d = new Date(`${dateStr}T00:00:00`);
  if (isNaN(d.getTime())) return false;
  const diffDays = (Date.now() - d.getTime()) / 86_400_000;
  return diffDays >= 0 && diffDays < days;
}
