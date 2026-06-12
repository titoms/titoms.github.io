import { useEffect, useState } from "react";
import logo2026 from "../../assets/logo-2026.png";
import { BOOK_CALL_URL } from "../../config/constants";
import { Button } from "../ui";

const NAV_LINKS = [
  { id: "home", title: "Home", href: "/" },
  { id: "services", title: "Services", href: "/services" },
  { id: "projects", title: "Projects", href: "/projects" },
  { id: "blog", title: "Blog", href: "/blog" },
  { id: "about", title: "About", href: "/about" },
  { id: "contact", title: "Contact", href: "/contact" },
];

const LanguageSelector = ({ className = "" }: { className?: string }) => (
  <div className={`language-switcher ${className}`} aria-label="Language">
    {["en", "fr", "es"].map((lang) => (
      <button
        key={lang}
        type="button"
        className="language-switcher__button"
        data-lang-choice={lang}
        aria-pressed="false"
        onClick={() => {
          if (typeof window !== "undefined") {
            (window as unknown as { __setSiteLang?: (language: string) => void }).__setSiteLang?.(lang);
          }
        }}
      >
        {lang.toUpperCase()}
      </button>
    ))}
  </div>
);

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-border bg-primary/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-site items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <a href="/" className="flex items-center gap-3 font-display text-lg font-bold text-white">
            <img src={logo2026.src} alt="" className="h-9 w-9 shrink-0 object-contain" />
            <span>
              fullstackchris<span className="text-accent">.dev</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 min-[900px]:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-sm font-medium text-secondary transition-colors hover:text-white"
              >
                {link.title}
              </a>
            ))}
            <Button
              href={BOOK_CALL_URL}
              size="sm"
              className="text-sm"
            >
              Book a call
            </Button>
            <LanguageSelector />
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="relative z-[60] grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface/80 transition-colors hover:bg-raised min-[900px]:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-navigation"
            aria-expanded={open}
          >
            <span className="flex flex-col gap-[5px]">
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 min-[900px]:hidden bg-primary/95 backdrop-blur-xl transition-[opacity,transform] duration-300 ${
          open ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
        }`}
      >
        <nav className="flex min-h-[100dvh] flex-col items-center justify-center gap-7 px-6 pb-10 pt-24">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-medium text-secondary transition-colors hover:text-white"
            >
              {link.title}
            </a>
          ))}
          <Button
            href={BOOK_CALL_URL}
            size="lg"
            onClick={() => setOpen(false)}
            className="text-xl"
          >
            Book a call
          </Button>
          <LanguageSelector className="mt-3" />
        </nav>
      </div>
    </>
  );
};

export default SiteHeader;
