import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Icon } from "@/components/atoms/Icon";

/**
 * Figma: `Filter Chip` (101:459) — Default / Selected.
 *
 * Height 32px, radius 999px, padding 4px 12px, gap 6px, label 14px/600.
 * Selected adds brand fill, brand border and a 16px remove glyph.
 */

export interface FilterChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  selected?: boolean;
  /** Only rendered when `selected`. */
  onRemove?: () => void;
  children?: ReactNode;
}

export function FilterChip({
  selected = false,
  onRemove,
  className = "",
  children,
  type = "button",
  ...props
}: FilterChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={[
        "inline-flex h-32 items-center gap-6 rounded-pill px-12",
        "text-sm font-semibold whitespace-nowrap transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        selected
          ? "bg-surface-brand-subtle text-text-brand ring-1 ring-action-primary"
          : "bg-surface-default text-text-secondary ring-1 ring-border-input hover:bg-surface-subtle",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
      {selected && onRemove ? (
        <span
          role="presentation"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="-mr-4 cursor-pointer rounded-4 p-2 hover:bg-action-primary/10"
        >
          <Icon name="x" size="sm" />
        </span>
      ) : selected ? (
        <Icon name="x" size="sm" />
      ) : null}
    </button>
  );
}