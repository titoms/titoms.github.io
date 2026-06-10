import type { ReactNode } from "react";
import { cn } from "./utils";

type ProcessStepProps = {
  number: number | string;
  title: string;
  children: ReactNode;
  isLast?: boolean;
};

export const ProcessStep = ({ number, title, children, isLast = false }: ProcessStepProps) => (
  <div className="relative flex gap-6 pb-8">
    {!isLast && <span className="absolute bottom-0 left-[17px] top-[38px] w-px bg-white/15" aria-hidden="true" />}
    <span className="z-10 grid h-9 w-9 shrink-0 place-items-center rounded-pill border border-accent bg-tertiary font-mono text-sm font-medium text-subtle">
      {number}
    </span>
    <div className={cn("space-y-2", !isLast && "pb-2")}>
      <h3 className="font-display text-[1.1rem] font-semibold text-white">{title}</h3>
      <div className="text-[0.95rem] leading-7 text-secondary">{children}</div>
    </div>
  </div>
);
