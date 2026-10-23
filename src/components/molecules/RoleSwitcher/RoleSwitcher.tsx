"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { roleHome, roleLabels, roles, type Role } from "@/lib/roles";

/**
 * Demo-only control for jumping between the three roles. There is no auth in
 * this build, so the role is persisted as a cookie and the server reads it to
 * pick navigation and the landing page.
 */
export function RoleSwitcher({ role }: { role: Role }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function switchTo(next: Role) {
    document.cookie = `pa-role=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => {
      router.push(roleHome[next]);
      router.refresh();
    });
  }

  return (
    <label
      className={[
        "flex items-center gap-8 text-xs text-text-secondary",
        pending ? "opacity-60" : "",
      ].join(" ")}
    >
      <span className="whitespace-nowrap">Viewing as</span>
      <select
        value={role}
        disabled={pending}
        onChange={(e) => switchTo(e.target.value as Role)}
        aria-label="Switch demo role"
        className="h-32 rounded-8 border border-border-input bg-surface-default px-8 text-xs font-semibold text-text-primary outline-none focus:border-2 focus:border-border-focus"
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {roleLabels[r]}
          </option>
        ))}
      </select>
    </label>
  );
}