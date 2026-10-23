import { Icon, type IconName } from "@/components/atoms/Icon";

/**
 * Figma: `Empty State` (101:433).
 *
 * Centred icon, title, supporting line, and an optional action.
 */
export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon = "package",
  title,
  description,
  children,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center gap-8 rounded-card border border-border-default bg-card-bg px-32 py-48 text-center ${className}`}
    >
      <span className="flex size-48 items-center justify-center rounded-pill bg-surface-brand-subtle text-text-brand">
        <Icon name={icon} size="lg" />
      </span>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold text-text-primary">{title}</p>
        {description ? (
          <p className="max-w-96 text-sm text-text-secondary">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}