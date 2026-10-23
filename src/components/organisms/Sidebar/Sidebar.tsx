import { Icon } from "@/components/atoms/Icon";
import { NavItem } from "@/components/molecules/NavItem";
import type { IconName } from "@/components/atoms/Icon";
import { roleFooterNav, roleNav, type Role } from "@/lib/roles";

/**
 * Figma: `Sidebar` (101:692), Role=Employee shown.
 *
 * 240px fixed navy-900 rail, 16px horizontal / 24px vertical padding, 4px gaps.
 * Logo block (32px brand mark + wordmark) sits above a MENU eyebrow label,
 * then the role's nav items, with the sign-out item pinned to the bottom.
 */
export function Sidebar({ role }: { role: Role }) {
  return (
    <nav
      aria-label="Main"
      className="flex min-h-screen w-240 shrink-0 flex-col bg-nav-bg p-16 py-24"
    >
      <div className="mb-24 flex items-center gap-12 pb-24">
        <span className="flex size-32 shrink-0 items-center justify-center rounded-8 bg-action-primary text-text-inverse">
          <Icon name="package" size="md" />
        </span>
        <span className="text-lg font-semibold text-text-inverse">PinjamAset</span>
      </div>

      <p className="mb-8 text-2xs font-semibold tracking-wide text-text-inverse-muted uppercase">
        Menu
      </p>

      <ul className="flex flex-col gap-4">
        {roleNav[role].map((item) => (
          <li key={item.href + item.label}>
            <NavItem
              href={item.href}
              label={item.navLabel ?? item.label}
              icon={item.icon as IconName}
            />
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      <ul className="flex flex-col gap-4">
        <li>
          <NavItem
            href={roleFooterNav[role].href}
            label={roleFooterNav[role].label}
            icon={roleFooterNav[role].icon as IconName}
          />
        </li>
      </ul>
    </nav>
  );
}