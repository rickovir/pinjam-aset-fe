import { Icon, type IconName } from "@/components/atoms/Icon";

/**
 * Figma: `KPI Card` (99:382) — Tone: Default / Warning / Danger.
 *
 * 260px wide, 20px padding, 12px gaps. Top row space-between: label left,
 * 36×36 icon badge right. Tone tints ONLY the badge background — the value
 * stays ink in every variant.
 */

export type KpiTone = "default" | "warning" | "danger";

const badgeByTone: Record<KpiTone, string> = {
  default: "bg-surface-brand-subtle text-text-brand",
  warning: "bg-status-warning-bg text-status-warning-fg",
  danger: "bg-status-danger-bg text-status-danger-fg",
};

export interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: KpiTone;
  icon?: IconName;
}

export function KpiCard({
  label,
  value,
  hint,
  tone = "default",
  icon = "package",
}: KpiCardProps) {
  return (
    <div className="flex flex-col gap-12 rounded-card border border-border-default bg-card-bg p-20">
      <div className="flex items-center justify-between gap-8">
        <span className="text-sm font-semibold text-text-secondary">
          {label}
        </span>
        <span
          className={`flex size-36 shrink-0 items-center justify-center rounded-card ${badgeByTone[tone]}`}
        >
          <Icon name={icon} size="md" />
        </span>
      </div>
      <span className="text-3xl font-bold text-text-primary">{value}</span>
      {hint ? <span className="text-xs text-text-secondary">{hint}</span> : null}
    </div>
  );
}