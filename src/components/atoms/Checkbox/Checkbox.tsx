"use client";

import { useId, useState } from "react";

import { Icon } from "@/components/atoms/Icon";

/**
 * Figma: `Checkbox` (101:489) — Checked × State.
 *
 * 20×20 box, radius 6, 2px border (#5c667d), label 14px/400, 8px gap.
 */

export interface CheckboxProps {
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({
  label,
  defaultChecked = false,
  disabled = false,
  className = "",
}: CheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-8 text-sm ${
        disabled ? "cursor-not-allowed text-text-disabled" : "cursor-pointer text-text-primary"
      } ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => setChecked(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={[
          "flex size-20 shrink-0 items-center justify-center rounded-6",
          "border-2 transition-colors",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-focus",
          checked
            ? "border-action-primary bg-action-primary text-text-inverse"
            : disabled
              ? "border-border-default bg-surface-disabled"
              : "border-border-input bg-surface-default",
        ].join(" ")}
      >
        {checked ? <Icon name="check" size="sm" className="text-text-inverse" /> : null}
      </span>
      {label}
    </label>
  );
}