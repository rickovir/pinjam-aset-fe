import type { InputHTMLAttributes, ReactNode } from "react";

import { Icon, type IconName } from "@/components/atoms/Icon";

/**
 * Figma: `Input` (98:270) — 15 variants across Type × State.
 *
 * Vertical stack with 6px gaps: label (14px/600) / field (40px, radius 8,
 * 12px horizontal padding, 1px border) / helper row (12px/400).
 * Field borders: default #5c667d, focus #5f47d1 at 2px, error #bf333d.
 */

export type InputType = "text" | "select" | "search";
export type InputState = "default" | "error" | "disabled";

const fieldByState: Record<InputState, string> = {
  default:
    "bg-input-bg text-input-text ring-1 ring-input-border focus-within:ring-2 focus-within:ring-input-border-focus",
  error:
    "bg-input-bg text-input-text ring-1 ring-input-border-error focus-within:ring-2 focus-within:ring-input-border-error",
  disabled:
    "bg-input-bg-disabled text-text-disabled ring-1 ring-border-default",
};

const helperByState: Record<InputState, string> = {
  default: "text-input-helper",
  error: "text-input-error-text",
  disabled: "text-text-disabled",
};

/** Figma places one of these at the field's leading edge per Type. */
const leadingIcon: Partial<Record<InputType, IconName>> = {
  search: "search",
  select: "chevron-down",
};

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helper?: string;
  type?: InputType;
  state?: InputState;
  /** Renders a `select`-style chevron and styles the field accordingly. */
  children?: ReactNode;
}

export function Input({
  label,
  helper,
  type = "text",
  state = "default",
  disabled = state === "disabled",
  className = "",
  id,
  ...props
}: InputProps) {
  const fieldId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const isSelect = type === "select";

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {label ? (
        <label
          htmlFor={isSelect ? undefined : fieldId}
          className="text-sm font-semibold text-input-label"
        >
          {label}
        </label>
      ) : null}

      <div
        className={[
          "flex h-40 items-center gap-8 rounded-input px-12",
          "text-sm transition-shadow",
          fieldByState[state],
        ].join(" ")}
      >
        {leadingIcon[type] ? (
          <Icon name={leadingIcon[type]!} size="md" className="shrink-0 text-text-muted" />
        ) : null}

        {isSelect ? (
          <select
            id={fieldId}
            disabled={disabled}
            className="min-w-0 flex-1 appearance-none bg-transparent outline-none disabled:cursor-not-allowed"
            defaultValue=""
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          />
        ) : (
          <input
            id={fieldId}
            type={type === "search" ? "text" : "text"}
            disabled={disabled}
            placeholder={props.placeholder ?? "Placeholder"}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-input-placeholder disabled:cursor-not-allowed"
            {...props}
          />
        )}

        {type === "search" ? <SearchAffix /> : null}
      </div>

      {helper ? (
        <p className={`text-xs ${helperByState[state]}`}>{helper}</p>
      ) : null}
    </div>
  );
}

function SearchAffix() {
  return (
    <kbd className="shrink-0 rounded-4 border border-border-default bg-surface-subtle px-4 text-2xs text-text-muted">
      /
    </kbd>
  );
}