import { tickerItems } from "@/mocks/home";

export default function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="border-y border-background-200 overflow-hidden" style={{ backgroundColor: "rgba(30,58,47,0.62)" }}>
      <div className="flex items-center gap-4 py-3">
        <div className="flex items-center gap-2 pl-6 md:pl-10 pr-4 border-r border-background-300 whitespace-nowrap">
          <span className="inline-flex w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest uppercase text-foreground-700">
            Live indicators
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex gap-10 animate-ticker whitespace-nowrap">
            {items.map((t, i) => (
              <span
                key={i}
                className="font-mono text-sm text-foreground-800 flex items-center gap-2"
              >
                <i className="ri-line-chart-line text-primary-700" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}