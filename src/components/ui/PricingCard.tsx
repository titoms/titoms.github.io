import type { ReactNode } from "react";
import { Badge } from "./Badge";
import { Button, type ButtonVariant } from "./Button";
import { Card } from "./Card";
import { cn } from "./utils";

type PricingCardProps = {
  title: string;
  description?: ReactNode;
  price: string;
  period?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  note?: ReactNode;
  ctaVariant?: ButtonVariant;
};

export const PricingCard = ({
  title,
  description,
  price,
  period,
  features,
  ctaLabel,
  ctaHref,
  featured = false,
  note,
  ctaVariant,
}: PricingCardProps) => (
  <Card
    glow={featured}
    className={cn(
      "flex h-full flex-col gap-5",
      featured && "breathing-violet-glow border-accent bg-gradient-to-b from-brand/10 to-tertiary shadow-glow",
    )}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
        {description && <div className="text-sm leading-6 text-secondary">{description}</div>}
      </div>
      {featured && <Badge variant="accent">Featured</Badge>}
    </div>
    <p className="font-display text-[2.6rem] font-bold leading-none tracking-normal text-white">
      {price}
      {period && <span className="font-mono text-[0.95rem] font-normal text-low"> {period}</span>}
    </p>
    <ul className="flex flex-col gap-3">
      {features.map((feature) => (
        <li key={feature} className="flex gap-3 text-[0.95rem] leading-6 text-secondary">
          <span className="mt-1 text-positive" aria-hidden="true">
            ✓
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    {note && <div className="text-sm leading-6 text-low">{note}</div>}
    <Button href={ctaHref} variant={ctaVariant ?? (featured ? "primary" : "secondary")} className="mt-auto">
      {ctaLabel}
    </Button>
  </Card>
);
