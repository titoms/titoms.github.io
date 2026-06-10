import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type BadgeVariant = "default" | "accent" | "positive";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
};

const variants: Record<BadgeVariant, string> = {
  default: "border-strong bg-tertiary text-secondary",
  accent: "border-accent bg-brand/10 text-subtle",
  positive: "border-positive/40 bg-positive/10 text-positive",
};

export const Badge = ({
  children,
  variant = "default",
  dot = false,
  className,
  ...props
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-pill border px-[11px] py-[5px] font-mono text-[0.78rem] font-medium leading-none tracking-[0.02em]",
      variants[variant],
      className,
    )}
    {...props}
  >
    {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
    {children}
  </span>
);
