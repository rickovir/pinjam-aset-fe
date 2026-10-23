import type { ReactNode } from "react";

/**
 * Content block for a signed-in screen: page heading (title + supporting line)
 * followed by sections separated by 24px. Matches the Figma `Content` frame —
 * 32px padding, 24px gaps.
 */
export function Page({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-24">
      <div className="flex items-start justify-between gap-24">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold text-text-primary">{title}</h2>
          {description ? (
            <p className="text-sm text-text-secondary">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 gap-8">{actions}</div> : null}
      </div>

      {children}
    </div>
  );
}

/** A bordered content panel used for forms and detail blocks. */
export function Panel({
  title,
  actions,
  children,
  className = "",
}: {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`flex flex-col gap-16 rounded-card border border-border-default bg-card-bg p-24 ${className}`}
    >
      {title || actions ? (
        <div className="flex items-center justify-between gap-16">
          {title ? (
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          ) : null}
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}