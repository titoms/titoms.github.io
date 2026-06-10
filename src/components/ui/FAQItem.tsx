import { useState, type ReactNode } from "react";
import { cn } from "./utils";

type FAQItemProps = {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export const FAQItem = ({ question, children, defaultOpen = false }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-6 text-left font-display text-[1.1rem] font-medium text-white"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className={cn("shrink-0 text-low transition-transform duration-200", isOpen && "rotate-45 text-accent")}>
          +
        </span>
      </button>
      <div className={cn("grid transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="max-w-prose pb-6 text-[0.95rem] leading-7 text-secondary">{children}</div>
        </div>
      </div>
    </div>
  );
};
