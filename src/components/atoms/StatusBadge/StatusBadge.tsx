import { Icon, type IconName } from "@/components/atoms/Icon";

/**
 * Figma: `Status Badge` (98:439) — 13 statuses.
 *
 * All badges: height 19px, radius 999px, padding 2px 8px, gap 4px,
 * 16px icon + 12px label. Each status maps to a fixed tone and icon;
 * the pairing below was read off the component frames, not guessed.
 */

export type BadgeTone = "success" | "warning" | "danger" | "info" | "neutral";

export const requestStatuses = [
  "Draft",
  "Pending Manager",
  "Pending GA",
  "Approved",
  "Rejected",
  "Cancelled",
  "On Loan",
  "Overdue",
  "Returned",
  "Available",
  "Reserved",
  "Under repair",
  "Retired",
] as const;

export type RequestStatus = (typeof requestStatuses)[number];

type StatusSpec = { tone: BadgeTone; icon: IconName };

const specs: Record<RequestStatus, StatusSpec> = {
  Draft: { tone: "neutral", icon: "edit" },
  "Pending Manager": { tone: "warning", icon: "clock" },
  "Pending GA": { tone: "warning", icon: "clock" },
  Approved: { tone: "success", icon: "check" },
  Rejected: { tone: "danger", icon: "x" },
  Cancelled: { tone: "neutral", icon: "x" },
  "On Loan": { tone: "info", icon: "package" },
  Overdue: { tone: "danger", icon: "alert-triangle" },
  Returned: { tone: "success", icon: "check" },
  Available: { tone: "success", icon: "check" },
  Reserved: { tone: "info", icon: "clock" },
  "Under repair": { tone: "warning", icon: "alert-triangle" },
  Retired: { tone: "neutral", icon: "x" },
};

const toneClasses: Record<BadgeTone, string> = {
  success: "bg-badge-success-bg text-badge-success-fg",
  warning: "bg-badge-warning-bg text-badge-warning-fg",
  danger: "bg-badge-danger-bg text-badge-danger-fg",
  info: "bg-badge-info-bg text-badge-info-fg",
  neutral: "bg-badge-neutral-bg text-badge-neutral-fg",
};

export interface StatusBadgeProps {
  status: RequestStatus;
  /** Hides the leading glyph for dense table layouts. */
  hideIcon?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  hideIcon = false,
  className = "",
}: StatusBadgeProps) {
  const { tone, icon } = specs[status];

  return (
    <span
      className={[
        "inline-flex items-center gap-4 rounded-badge px-8 py-2",
        "text-xs font-semibold whitespace-nowrap",
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {!hideIcon && <Icon name={icon} size="sm" />}
      {status}
    </span>
  );
}