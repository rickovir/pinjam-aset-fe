import type { ButtonHTMLAttributes } from "react";

import { Icon, type IconName } from "@/components/atoms/Icon";

/**
 * Figma: `Icon Button` (97:378) — 8 variants, Style × State.
 *
 * 40×40 square, radius 8px, 1px slate-500 border, 20px icon centred.
 * Icon-only controls need an accessible name — `label` is required.
 */

export type IconButtonVariant = "secondary" | "ghost";

const variants: Record<IconButtonVariant, string> = {
  secondary:
    "bg-button-secondary-bg text-button-secondary-text ring-1 ring-border-input hover:bg-button-secondary-bg-hover",
  ghost:
    "bg-transparent text-text-secondary hover:bg-button-tertiary-bg-hover",
};

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  icon: IconName;
  /** Required: icon-only buttons have no visible text to name them. */
  label: string;
  /** Figma's `Style` axis; named `variant` to avoid React's `style` prop. */
  variant?: IconButtonVariant;
}

export function IconButton({
  icon,
  label,
  variant = "secondary",
  className = "",
  disabled = false,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={label}
      aria-disabled={disabled || undefined}
      className={[
        "inline-flex size-40 items-center justify-center rounded-8",
        "transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        "disabled:cursor-not-allowed",
        disabled
          ? "bg-surface-disabled text-text-disabled ring-0"
          : variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Icon name={icon} size="md" />
    </button>
  );
}