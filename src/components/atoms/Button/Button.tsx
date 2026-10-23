import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Icon, type IconName } from "@/components/atoms/Icon";

/**
 * Figma: `Button` (97:343) — 16 variants across Style × State.
 *
 * Geometry (all styles): height 40px, padding 8px 16px, gap 8px,
 * radius 8px, label 14px/600.
 *
 * Secondary's border is slate-500 (#5c667d) in the component frames, which is
 * what `input/border` points at — not the lighter `border/default`.
 */

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg-hover",
  secondary:
    "bg-button-secondary-bg text-button-secondary-text ring-1 ring-border-input hover:bg-button-secondary-bg-hover",
  tertiary:
    "bg-transparent text-button-tertiary-text hover:bg-button-tertiary-bg-hover",
  destructive:
    "bg-button-destructive-bg text-button-destructive-text hover:bg-action-destructive/90",
};

const disabledStyles =
  "bg-surface-disabled text-text-disabled ring-0 hover:bg-surface-disabled";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Figma's `Style` axis. Named `variant` rather than `style` to avoid
   * colliding with React's built-in `style` attribute.
   */
  variant?: ButtonVariant;
  /** Figma's `Show icon` property. Pair with `icon` to render the leading glyph. */
  showIcon?: boolean;
  icon?: IconName;
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  showIcon = false,
  icon,
  disabled = false,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={[
        "inline-flex h-40 items-center justify-center gap-8 rounded-button px-16",
        "text-sm font-semibold whitespace-nowrap",
        "transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        "disabled:cursor-not-allowed",
        disabled ? disabledStyles : variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {showIcon && icon ? <Icon name={icon} size="md" /> : null}
      {children}
    </button>
  );
}