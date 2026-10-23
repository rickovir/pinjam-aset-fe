/**
 * Figma: `Avatar` (99:529) — Small / Medium / Large.
 *
 * Initials on the brand-subtle surface in brand text:
 *   Small  24px, 11px/700   Medium 32px, 12px/600   Large 40px, 14px/600
 */

export type AvatarSize = "sm" | "md" | "lg";

const specs: Record<AvatarSize, { box: string; text: string }> = {
  sm: { box: "size-24", text: "text-2xs font-bold" },
  md: { box: "size-32", text: "text-xs font-semibold" },
  lg: { box: "size-40", text: "text-sm font-semibold" },
};

export interface AvatarProps {
  /** Full name — initials are derived from it unless `initials` is given. */
  name: string;
  initials?: string;
  size?: AvatarSize;
  className?: string;
}

function deriveInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({
  name,
  initials,
  size = "md",
  className = "",
}: AvatarProps) {
  const { box, text } = specs[size];

  return (
    <span
      title={name}
      className={`inline-flex shrink-0 items-center justify-center rounded-pill bg-surface-brand-subtle text-text-brand ${box} ${text} ${className}`}
    >
      {initials ?? deriveInitials(name)}
    </span>
  );
}