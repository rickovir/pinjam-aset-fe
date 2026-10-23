import type { ReactNode } from "react";

/**
 * Figma: `Tab` (101:468) — Default / Hover / Active.
 *
 * Height 44px, padding 0 16px, label 14px/600. Active carries a brand
 * underline; the design shows no top or side rules.
 */

export interface TabProps {
  active?: boolean;
  /** Optional count rendered after the label, e.g. "Pending (3)". */
  count?: number;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Tab({
  active = false,
  count,
  children,
  className = "",
  onClick,
}: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={[
        "relative inline-flex h-44 items-center justify-center gap-8 px-16",
        "text-sm font-semibold whitespace-nowrap transition-colors",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-border-focus",
        active ? "text-text-brand" : "text-text-secondary hover:bg-surface-subtle",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      {count !== undefined ? (
        <span
          className={[
            "rounded-badge px-1.5 text-2xs font-semibold",
            active ? "bg-surface-brand-subtle text-text-brand" : "bg-surface-disabled text-text-subtle",
          ].join(" ")}
        >
          {count}
        </span>
      ) : null}
      {active ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-2 bottom-0 h-0.5 rounded-t-2 bg-action-primary"
        />
      ) : null}
    </button>
  );
}

/** Container that lays tabs out with the design's brand underline. */
export function TabList({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div role="tablist" className={`flex items-center gap-4 border-b border-border-default ${className}`}>
      {children}
    </div>
  );
}