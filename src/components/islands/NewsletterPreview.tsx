import { useEffect, useState } from "react";

type NewsletterPreviewProps = {
  items: string[];
};

const TYPE_DELAY_MS = 28;
const LINE_DELAY_MS = 320;
const LOOP_HOLD_MS = 3600;

const NewsletterPreview = ({ items }: NewsletterPreviewProps) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(media.matches);

    syncPreference();
    media.addEventListener("change", syncPreference);

    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || items.length === 0) return;

    const currentLine = items[lineIndex] ?? "";
    const delay =
      lineIndex >= items.length
        ? LOOP_HOLD_MS
        : charIndex < currentLine.length
          ? TYPE_DELAY_MS
          : LINE_DELAY_MS;

    const timeout = window.setTimeout(() => {
      if (lineIndex >= items.length) {
        setLineIndex(0);
        setCharIndex(0);
        return;
      }

      if (charIndex < currentLine.length) {
        setCharIndex((current) => current + 1);
        return;
      }

      setLineIndex((current) => current + 1);
      setCharIndex(0);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [charIndex, items, lineIndex, reducedMotion]);

  const visibleItems = reducedMotion
    ? items
    : items.map((item, index) => {
        if (index < lineIndex) return item;
        if (index === lineIndex) return item.slice(0, charIndex);
        return "";
      });

  return (
    <ul className="space-y-4 px-6 py-6" aria-label="Newsletter issue preview">
      {visibleItems.map((item, index) => {
        const isActive = !reducedMotion && index === lineIndex && lineIndex < items.length;
        const shouldRender = reducedMotion || item || index <= lineIndex;

        return (
          <li
            key={items[index]}
            className={`newsletter-typed-line flex items-start gap-2 ${isActive ? "is-active" : ""} ${shouldRender ? "" : "opacity-0"}`}
            aria-hidden={!shouldRender}
          >
            <span className="mt-0.5 text-accent">-</span>
            <span>{shouldRender ? item : ""}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default NewsletterPreview;
