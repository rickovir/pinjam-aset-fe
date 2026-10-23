import { Button } from "@/components/atoms/Button";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { StatusBadge, type RequestStatus } from "@/components/atoms/StatusBadge";

/**
 * Figma: `Asset Card` (99:349) — Available / On Loan / Under repair / Retired.
 *
 * 300×357 white card. Image band is 298×160 (4:3 minus the 1px border) with a
 * 40px icon centred on gray-150. Body: 16px padding, 8px gaps, in the order
 * Category → Name → Meta → Value + status → Availability → Button.
 *
 * Only `Available` gets an enabled primary CTA; the other three states reuse
 * the secondary/disabled button (component 97:298) and are non-actionable.
 */

export type AssetStatus = Extract<
  RequestStatus,
  "Available" | "On Loan" | "Under repair" | "Retired"
>;

export interface AssetCardProps {
  name: string;
  /** Rendered as "Category · Location" on the first line. */
  category: string;
  location?: string;
  /** Secondary line, e.g. asset tag and condition. */
  meta: string;
  /** Replacement value, shown left of the status badge. */
  value?: string;
  availability: string;
  status: AssetStatus;
  icon?: IconName;
  onRequest?: () => void;
}

export function AssetCard({
  name,
  category,
  location,
  meta,
  value,
  availability,
  status,
  icon = "package",
  onRequest,
}: AssetCardProps) {
  const requestable = status === "Available";

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-card border border-border-default bg-card-bg">
      <div className="flex h-160 items-center justify-center bg-surface-placeholder text-text-subtle">
        <Icon name={icon} size="lg" className="size-40" />
      </div>

      <div className="flex flex-1 flex-col gap-8 p-16">
        <p className="text-xs text-text-secondary">
          {category}
          {location ? ` · ${location}` : ""}
        </p>
        <h3 className="text-sm font-semibold text-text-primary">{name}</h3>
        <p className="text-xs text-text-secondary">{meta}</p>

        <div className="flex items-center justify-between gap-8">
          {value ? (
            <span className="text-sm font-semibold text-text-primary">{value}</span>
          ) : (
            <span />
          )}
          <StatusBadge status={status} />
        </div>

        <p className="text-xs text-text-secondary">{availability}</p>

        <Button
          variant={requestable ? "primary" : "secondary"}
          disabled={!requestable}
          onClick={onRequest}
          className="mt-auto w-full"
        >
          {requestable ? "Request loan" : "Unavailable"}
        </Button>
      </div>
    </article>
  );
}