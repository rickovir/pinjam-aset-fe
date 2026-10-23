import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";

/**
 * Figma: `Toast` (101:430) — Success / Error / Info.
 *
 * Inverse surface (navy-900), 12px 16px padding, 12px gap, radius 12.
 * Title 14px/600 white, body 12px/400 in slate-100. Dismissible via a
 * trailing ghost icon button.
 */

export type ToastType = "success" | "error" | "info";

const icons: Record<ToastType, IconName> = {
  success: "check",
  error: "alert-triangle",
  info: "info",
};

export interface ToastProps {
  type?: ToastType;
  title: string;
  children?: ReactNode;
  /** Renders the trailing dismiss control. Wire to your own handler. */
  onDismiss?: () => void;
  className?: string;
}

export function Toast({
  type = "info",
  title,
  children,
  onDismiss,
  className = "",
}: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex w-380 items-start gap-12 rounded-card bg-surface-inverse px-16 py-12 text-text-inverse ${className}`}
    >
      <Icon name={icons[type]} size="md" className="mt-0.5 shrink-0 text-text-inverse-brand" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-sm font-semibold">{title}</p>
        {children ? (
          <p className="text-xs text-text-inverse-secondary">{children}</p>
        ) : null}
      </div>
      {onDismiss ? (
        <IconButton
          icon="x"
          label="Dismiss notification"
          variant="ghost"
          onClick={onDismiss}
          className="-m-4 shrink-0 text-text-inverse-secondary hover:bg-white/10 hover:text-text-inverse"
        />
      ) : null}
    </div>
  );
}