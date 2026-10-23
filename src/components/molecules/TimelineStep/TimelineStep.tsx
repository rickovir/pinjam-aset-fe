import { Icon, type IconName } from "@/components/atoms/Icon";

/**
 * Figma: `Timeline Step` (99:520) — Done / Current / Upcoming / Rejected.
 *
 * One row of an approval or loan-history timeline: a state marker on the left
 * and a title/detail pair on the right.
 */

export type TimelineState = "done" | "current" | "upcoming" | "rejected";

const specs: Record<
  TimelineState,
  { icon: IconName; dot: string; text: string; ring: string }
> = {
  done: {
    icon: "check",
    dot: "bg-status-success-bg text-status-success-fg",
    text: "text-text-primary",
    ring: "border-0",
  },
  current: {
    icon: "clock",
    dot: "bg-status-warning-bg text-status-warning-fg",
    text: "text-text-primary",
    ring: "border-0",
  },
  upcoming: {
    icon: "clock",
    dot: "bg-surface-disabled text-text-muted",
    text: "text-text-muted",
    ring: "border-0",
  },
  rejected: {
    icon: "x",
    dot: "bg-status-danger-bg text-status-danger-fg",
    text: "text-text-danger",
    ring: "border-0",
  },
};

export interface TimelineStepProps {
  state: TimelineState;
  title: string;
  detail?: string;
  timestamp?: string;
  /** Draws the connector to the next step. */
  isLast?: boolean;
}

export function TimelineStep({
  state,
  title,
  detail,
  timestamp,
  isLast = false,
}: TimelineStepProps) {
  const { icon, dot, text } = specs[state];

  return (
    <li className="flex gap-16">
      <div className="flex flex-col items-center">
        <span
          className={`flex size-32 shrink-0 items-center justify-center rounded-pill ${dot}`}
        >
          <Icon name={icon} size="sm" />
        </span>
        {!isLast ? (
          <span aria-hidden="true" className="w-2 flex-1 bg-border-default" />
        ) : null}
      </div>

      <div className={`flex min-w-0 flex-1 flex-col gap-4 pb-24 ${text}`}>
        <div className="flex items-baseline justify-between gap-16">
          <p className="text-sm font-semibold">{title}</p>
          {timestamp ? (
            <span className="shrink-0 text-xs text-text-muted">{timestamp}</span>
          ) : null}
        </div>
        {detail ? <p className="text-sm text-text-secondary">{detail}</p> : null}
      </div>
    </li>
  );
}

/** Vertical stack of `TimelineStep`s. */
export function Timeline({ children }: { children: React.ReactNode }) {
  return <ol className="flex flex-col">{children}</ol>;
}