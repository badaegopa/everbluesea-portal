import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { navLinks } from "@/mocks/home";

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"KO" | "EN">("KO");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
      style={scrolled ? { backgroundColor: "rgba(245,243,238,0.82)", borderColor: "rgba(61,107,98,0.15)" } : {}}
    >
      <div className="w-full px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label="늘푸른바다 사회동역학연구소"
        >
          <div
            className="w-9 h-9 flex items-center justify-center rounded-full text-white"
            style={{ backgroundColor: "#1E3A2F" }}
          >
            <i className="ri-bar-chart-2-line text-lg" />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="font-body text-[13px] font-semibold tracking-tight"
              style={{ color: scrolled ? "#1E3A2F" : "#ffffff" }}
            >
              늘푸른바다
            </span>
            <span
              className="font-mono text-[9px] tracking-widest uppercase opacity-60"
              style={{ color: scrolled ? "#1E3A2F" : "#ffffff" }}
            >
              Everblue Sea Institute
            </span>
          </div>
        </a>

        {/* Desktop nav + lang toggle */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-1">
            {navLinks.map((l, i) => (
              <span key={l.href} className="flex items-center gap-1">
                <a
                  href={l.href}
                  className="text-sm transition cursor-pointer whitespace-nowrap px-2 py-1"
                  style={{
                    color: scrolled ? "#1E3A2F" : "#ffffff",
                    opacity: 0.7,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.7";
                  }}
                >
                  {t(l.tKey)}
                </a>
                {i < navLinks.length - 1 && (
                  <span
                    className="text-xs select-none"
                    style={{ color: scrolled ? "rgba(30,58,47,0.25)" : "rgba(255,255,255,0.25)" }}
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Language toggle */}
          <div
            className="flex items-center text-xs font-mono tracking-wider select-none"
            style={{ color: scrolled ? "rgba(30,58,47,0.5)" : "rgba(255,255,255,0.5)" }}
          >
            <button
              onClick={() => { setLang("KO"); i18n.changeLanguage("ko"); }}
              className="cursor-pointer px-1 transition"
              style={{ color: lang === "KO" ? (scrolled ? "#1E3A2F" : "#ffffff") : undefined }}
            >
              KO
            </button>
            <span className="mx-0.5" style={{ color: scrolled ? "rgba(30,58,47,0.25)" : "rgba(255,255,255,0.25)" }}>
              /
            </span>
            <button
              onClick={() => { setLang("EN"); i18n.changeLanguage("en"); }}
              className="cursor-pointer px-1 transition"
              style={{ color: lang === "EN" ? (scrolled ? "#1E3A2F" : "#ffffff") : undefined }}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
          style={{
            border: scrolled
              ? "1px solid rgba(30, 58, 47, 0.2)"
              : "1px solid rgba(255, 255, 255, 0.3)",
          }}
          aria-label="메뉴 열기"
        >
          <i
            className={`text-lg ${open ? "ri-close-line" : "ri-menu-line"}`}
            style={{ color: scrolled ? "#1E3A2F" : "#ffffff" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background-50 border-t border-background-200 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm py-1 cursor-pointer"
              style={{ color: "#1E3A2F" }}
            >
              {t(l.tKey)}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-background-200">
            <span className="text-xs font-mono text-foreground-500">언어</span>
            <button
              onClick={() => { setLang("KO"); i18n.changeLanguage("ko"); }}
              className="text-xs cursor-pointer px-1"
              style={{ color: lang === "KO" ? "#1E3A2F" : "#6B7F7A", fontWeight: lang === "KO" ? 600 : 400 }}
            >
              KO
            </button>
            <span className="text-xs text-foreground-400">/</span>
            <button
              onClick={() => { setLang("EN"); i18n.changeLanguage("en"); }}
              className="text-xs cursor-pointer px-1"
              style={{ color: lang === "EN" ? "#1E3A2F" : "#6B7F7A", fontWeight: lang === "EN" ? 600 : 400 }}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </header>
  );
}