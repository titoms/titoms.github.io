import type { ReactNode } from "react";
import { Badge, type BadgeVariant } from "./Badge";
import { Button, type ButtonVariant } from "./Button";
import { Card } from "./Card";
import { cn } from "./utils";

type ServiceCardProps = {
  title: string;
  description: ReactNode;
  icon?: ReactNode;
  price?: string;
  priceUnit?: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  ctaLabel?: string;
  ctaHref?: string;
  ctaVariant?: ButtonVariant;
  featured?: boolean;
};

export const ServiceCard = ({
  title,
  description,
  icon,
  price,
  priceUnit,
  badge,
  badgeVariant = "accent",
  ctaLabel = "Learn more",
  ctaHref,
  ctaVariant = "outline",
  featured = false,
}: ServiceCardProps) => {
  return (
    <Card hover hoverGlow={false} className={cn("flex h-full flex-col gap-4", featured && "border-accent/35")}>
      <div className="flex items-start justify-between gap-4">
        {icon && (
          <div className="grid h-[46px] w-[46px] place-items-center rounded-md border border-accent bg-brand/10 text-subtle">
            {icon}
          </div>
        )}
        {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
      </div>
      <div className="space-y-3">
        <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-white">{title}</h3>
        <div className="text-[0.95rem] leading-7 text-secondary">{description}</div>
      </div>
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4">
        {price && (
          <p className="font-mono text-sm font-medium text-white">
            {price}
            {priceUnit && <span className="text-low"> {priceUnit}</span>}
          </p>
        )}
        {ctaHref && (
          <Button href={ctaHref} variant={ctaVariant} size="sm">
            {ctaLabel}
          </Button>
        )}
      </div>
    </Card>
  );
};
