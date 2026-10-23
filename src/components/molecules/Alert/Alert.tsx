import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/atoms/Icon";

/**
 * Figma: `Alert` (98:473) — Info / Success / Warning / Error.
 *
 * Horizontal, 12px 16px padding, 12px gap, radius 12, 20px leading icon,
 * then a vertical title (14px/600) / message (14px/400) pair with 2px gap.
 */

export type AlertType = "info" | "success" | "warning" | "error";

const specs: Record<AlertType, { icon: IconName; bg: string; iconColor: string }> = {
  info: {
    icon: "info",
    bg: "bg-status-info-bg",
    iconColor: "text-status-info-fg",
  },
  success: {
    icon: "check",
    bg: "bg-status-success-bg",
    iconColor: "text-status-success-fg",
  },
  warning: {
    icon: "alert-triangle",
    bg: "bg-status-warning-bg",
    iconColor: "text-status-warning-fg",
  },
  error: {
    icon: "alert-triangle",
    bg: "bg-status-danger-bg",
    iconColor: "text-status-danger-fg",
  },
};

export interface AlertProps {
  type?: AlertType;
  title?: string;
  children?: ReactNode;
  className?: string;
}

export function Alert({
  type = "info",
  title,
  children,
  className = "",
}: AlertProps) {
  const { icon, bg, iconColor } = specs[type];

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`flex items-start gap-12 rounded-card px-16 py-12 ${bg} ${className}`}
    >
      <Icon name={icon} size="md" className={`mt-0.5 shrink-0 ${iconColor}`} />
      <div className="flex min-w-0 flex-col gap-0.5">
        {title ? (
          <p className="text-sm font-semibold text-text-primary">{title}</p>
        ) : null}
        {children ? (
          <div className="text-sm text-text-secondary">{children}</div>
        ) : null}
      </div>
    </div>
  );
}