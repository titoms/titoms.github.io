import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) => (
  <div
    className={cn(
      "flex max-w-prose flex-col gap-4",
      align === "center" && "mx-auto items-center text-center",
      className,
    )}
    {...props}
  >
    {eyebrow && (
      <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
        {align === "left" && <span className="h-px w-[18px] bg-accent" aria-hidden="true" />}
        {eyebrow}
      </p>
    )}
    <h2 className="font-display text-[clamp(1.75rem,3vw,2.4rem)] font-semibold leading-tight text-white">
      {title}
    </h2>
    {description && <p className="text-[1.05rem] leading-7 text-secondary">{description}</p>}
  </div>
);
