/**
 * Role definitions for the PinjamAset demo.
 *
 * There is no backend or real auth in this build — the role lives in a cookie
 * so the server can pick the right navigation and default landing page. The
 * role switcher in the top bar writes it.
 */

export const roles = ["employee", "manager", "ga"] as const;

export type Role = (typeof roles)[number];

export const roleLabels: Record<Role, string> = {
  employee: "Employee",
  manager: "Line Manager",
  ga: "GA Admin",
};

export type NavEntry = {
  label: string;
  /**
   * Label shown in the sidebar. The design's Employee rail reads "Equipment",
   * not "Catalogue", so route name and nav copy are allowed to differ.
   */
  navLabel?: string;
  href: string;
  icon: string;
};

/** Landing page per role — where `/` redirects. */
export const roleHome: Record<Role, string> = {
  employee: "/catalogue",
  manager: "/approvals",
  ga: "/inventory",
};

/**
 * Figma `Sidebar` (101:692) has a variant per role. Employee's set is
 * Dashboard / Catalogue / My Loans / Sign out; the Manager and GA sets follow
 * the same shape, keyed to their own flows.
 */
export const roleNav: Record<Role, NavEntry[]> = {
  employee: [
    { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { label: "Catalogue", navLabel: "Equipment", href: "/catalogue", icon: "package" },
    { label: "My Loans", href: "/loans", icon: "clipboard-check" },
  ],
  manager: [
    { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { label: "Pending Approvals", href: "/approvals", icon: "clipboard-check" },
    { label: "Team Loans", href: "/loans", icon: "list" },
  ],
  ga: [
    { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { label: "Requests", href: "/approvals", icon: "clipboard-check" },
    { label: "Handover Queue", href: "/handover", icon: "handover" },
    { label: "Returns", href: "/returns", icon: "history" },
    { label: "Inventory", href: "/inventory", icon: "package" },
  ],
};

/** Trailing item, pinned to the bottom of the sidebar. */
export const roleFooterNav: Record<Role, NavEntry> = {
  employee: { label: "Sign out", href: "/login", icon: "log-out" },
  manager: { label: "Sign out", href: "/login", icon: "log-out" },
  ga: { label: "Sign out", href: "/login", icon: "log-out" },
};

export function isRole(value: string | undefined | null): value is Role {
  return !!value && (roles as readonly string[]).includes(value);
}