"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon, type IconName } from "@/components/atoms/Icon";

/**
 * Figma: `Nav Item` (99:479) — Default / Hover / Active / Focus.
 *
 * 40px tall, 12px horizontal padding, 12px gap, 20px icon, 14px label.
 * On the navy sidebar: active = navy-800 fill with brand-purple label;
 * inactive = transparent with slate-100 label.
 */

export interface NavItemProps {
  href: string;
  label: string;
  icon: IconName;
  /** Forces the active treatment regardless of the current path. */
  active?: boolean;
}

export function NavItem({ href, label, icon, active }: NavItemProps) {
  const pathname = usePathname();
  const isActive = active ?? pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={[
        "flex h-40 items-center gap-12 rounded-8 px-12",
        "text-sm transition-colors",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-text-inverse-brand",
        isActive
          ? "bg-nav-item-active-bg font-semibold text-nav-text-active"
          : "text-nav-text hover:bg-nav-item-active-bg/60",
      ].join(" ")}
    >
      <Icon name={icon} size="md" className="shrink-0" />
      {label}
    </Link>
  );
}