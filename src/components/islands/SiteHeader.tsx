import { useState } from "react";
import { navLinks, CALENDLY_URL } from "../../config/constants";

const NAV_LINKS = [
  { id: "home", title: "Home", href: "/" },
  { id: "services", title: "Services", href: "/services" },
  { id: "projects", title: "Projects", href: "/projects" },
  { id: "blog", title: "Blog", href: "/blog" },
  { id: "about", title: "About", href: "/about" },
  { id: "contact", title: "Contact", href: "/contact" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-primary/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-site items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <a href="/" className="font-display text-lg font-bold text-white">
          fullstackchris<span className="text-accent">.dev</span>
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
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-colors hover:bg-brand-hover"
          >
            Book a call
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex min-[900px]:hidden flex-col gap-[5px] p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-primary/95 backdrop-blur-xl transition-transform duration-300 min-[900px]:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
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
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="rounded-xl bg-brand px-8 py-3 text-xl font-bold text-white shadow-lg shadow-brand/20 transition-colors hover:bg-brand-hover"
        >
          Book a call
        </a>
      </div>
    </header>
  );
};

export default SiteHeader;
