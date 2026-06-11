import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type AnchorButtonProps = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-brand text-[var(--text-on-accent)] shadow-[0_0_0_1px_rgba(167,139,250,0.4),0_8px_24px_rgba(124,92,232,0.25)] hover:bg-brand-hover hover:text-[var(--text-on-accent)] hover:shadow-glow",
  secondary:
    "border-strong bg-tertiary text-white hover:border-accent hover:bg-raised hover:text-white btn-grad-hover",
  ghost:
    "border-transparent bg-transparent text-secondary hover:bg-tertiary hover:text-white btn-grad-hover",
};

const sizes: Record<ButtonSize, string> = {
  sm: "rounded-sm px-3.5 py-2.5 text-[0.85rem]",
  md: "rounded-md px-[22px] py-3.5 text-[0.95rem]",
  lg: "rounded-md px-7 py-4 text-[1.05rem]",
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border font-body font-semibold leading-none no-underline transition-[transform,background,border-color,box-shadow,color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

export const Button = (props: ButtonProps) => {
  const { variant = "primary", size = "md", className, children } = props;
  const buttonClassName = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && typeof props.href === "string") {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as AnchorButtonProps;

    return (
      <a className={buttonClassName} {...rest}>
        {children}
      </a>
    );
  }

  const nativeProps = props as NativeButtonProps;
  const { variant: _v, size: _s, className: _c, children: _ch, href: _href, ...buttonProps } = nativeProps;

  return (
    <button className={buttonClassName} type="button" {...buttonProps}>
      {children}
    </button>
  );
};
