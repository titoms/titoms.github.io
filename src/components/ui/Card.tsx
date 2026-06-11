import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
};

export const Card = ({ children, hover = false, glow = false, className, ...props }: CardProps) => (
  <div
    className={cn(
      "relative rounded-lg border border-border bg-tertiary p-6 transition-[transform,background,border-color,box-shadow] duration-200",
      hover && "card-hover-glow hover:-translate-y-1 hover:border-strong hover:bg-raised hover:shadow-glow",
      glow && "card-glow-surface shadow-card",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
