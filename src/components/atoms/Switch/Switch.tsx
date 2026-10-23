"use client";

import { useId, useState } from "react";

/**
 * Figma: `Switch` (101:498) — Off / On.
 *
 * Track 40×24, radius 999, 2px inset padding, 20px white knob.
 * Off track is slate-500 (#5c667d); on track is brand purple (#5f47d1).
 * Knob slides between the two edges.
 */

export interface SwitchProps {
  label: string;
  defaultOn?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  label,
  defaultOn = false,
  disabled = false,
  className = "",
}: SwitchProps) {
  const [on, setOn] = useState(defaultOn);
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
        role="switch"
        checked={on}
        disabled={disabled}
        onChange={(e) => setOn(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={[
          "flex h-24 w-40 shrink-0 items-center rounded-pill p-2",
          "transition-colors",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-focus",
          on ? "bg-action-primary" : disabled ? "bg-surface-disabled" : "bg-border-input",
        ].join(" ")}
      >
        <span
          className={[
            "size-20 rounded-pill bg-surface-default shadow-sm transition-transform",
            on ? "translate-x-16" : "translate-x-0",
          ].join(" ")}
        />
      </span>
      {label}
    </label>
  );
}