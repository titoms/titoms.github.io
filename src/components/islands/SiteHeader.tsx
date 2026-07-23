import { useEffect, useState } from "react";
import logo2026 from "../../assets/logo-2026.webp";
import { BOOK_CALL_URL } from "../../config/constants";
import { Button } from "../ui";
import { getLocalizedPath, useTranslations } from "../../i18n/ui";

type LanguageLink = { locale: string; href: string; active: boolean };

const NAV_ORDER = [
  { id: "home", key: "nav.home", href: "/" },
  { id: "services", key: "nav.services", href: "/services/" },
  { id: "projects", key: "nav.projects", href: "/projects/" },
  { id: "blog", key: "nav.blog", href: "/blog/" },
  { id: "about", key: "nav.about", href: "/about/" },
  { id: "contact", key: "nav.contact", href: "/contact/" },
];

const LanguageSelector = ({
  className = "",
  languageLinks,
  label,
}: {
  className?: string;
  languageLinks: LanguageLink[];
  label: string;
}) => (
  <div className={`language-switcher ${className}`} aria-label={label}>
    {languageLinks.map(({ locale, href, active }) => (
      <a
        key={locale}
        href={href}
        className="language-switcher__button"
        aria-current={active ? "true" : undefined}
        data-active={active ? "true" : undefined}
      >
        {locale.toUpperCase()}
      </a>
    ))}
  </div>
);

const normalizePath = (path: string) => {
  if (path === "/") return path;
  return path.replace(/\/+$/, "");
};

const isActiveLink = (href: string, pathname: string) => {
  const normalizedHref = normalizePath(href);
  const normalizedPathname = normalizePath(pathname);

  if (normalizedHref === "/" || /^\/(fr|es)$/.test(normalizedHref)) {
    return normalizedPathname === normalizedHref;
  }

  return normalizedPathname === normalizedHref || normalizedPathname.startsWith(`${normalizedHref}/`);
};

type SiteHeaderProps = {
  locale?: string;
  languageLinks?: LanguageLink[];
  currentPath?: string;
};

const SiteHeader = ({ locale = "en", languageLinks = [], currentPath = "/" }: SiteHeaderProps) => {
  const t = useTranslations(locale);
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const bookCallUrl = getLocalizedPath(BOOK_CALL_URL, locale);
  const [open, setOpen] = useState(false);
  const pathname = currentPath;

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
          <a href={localePrefix || "/"} className="flex items-center gap-3 font-display text-lg font-bold text-white">
            <img src={logo2026.src} alt="" className="h-9 w-9 shrink-0 object-contain" />
            <span>
              fullstackchris<span className="text-accent">.dev</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 min-[900px]:flex">
            {NAV_ORDER.map((link) => {
              const href = `${localePrefix}${link.href}`;
              const active = isActiveLink(href, pathname);
              return (
                <a
                  key={link.id}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link text-sm font-medium transition-colors ${active ? "nav-link--active text-white" : "text-secondary hover:text-white"}`}
                >
                  {t(link.key)}
                </a>
              );
            })}
            <Button
              href={bookCallUrl}
              size="sm"
              className="text-sm"
            >
              {t("nav.bookCall")}
            </Button>
            <LanguageSelector languageLinks={languageLinks} label={t("languageSwitcher.label")} />
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="relative z-[60] grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface/80 transition-colors hover:bg-raised min-[900px]:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
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
          {NAV_ORDER.map((link) => {
            const href = `${localePrefix}${link.href}`;
            const active = isActiveLink(href, pathname);
            return (
              <a
                key={link.id}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`nav-link text-2xl font-medium transition-colors ${active ? "nav-link--active text-white" : "text-secondary hover:text-white"}`}
              >
                {t(link.key)}
              </a>
            );
          })}
          <Button
            href={bookCallUrl}
            size="lg"
            onClick={() => setOpen(false)}
            className="text-xl"
          >
            {t("nav.bookCall")}
          </Button>
          <LanguageSelector className="mt-3" languageLinks={languageLinks} label={t("languageSwitcher.label")} />
        </nav>
      </div>
    </>
  );
};

export default SiteHeader;
