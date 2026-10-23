import { Avatar } from "@/components/atoms/Avatar";
import { IconButton } from "@/components/atoms/IconButton";
import { RoleSwitcher } from "@/components/molecules/RoleSwitcher";
import { roleLabels, type Role } from "@/lib/roles";

/**
 * Figma: `Top Bar` (101:693) — 1200 × 64, white, 32px horizontal padding,
 * space-between.
 *
 * Left: page title, 18px/600.
 * Right: 186px cluster of bell IconButton (40×40) + user block (avatar 32px,
 * 12px gap, stacked name 14px/600 over role 12px/400).
 */
export function TopBar({ title, role }: { title: string; role: Role }) {
  return (
    <header className="flex h-64 shrink-0 items-center justify-between border-b border-border-default bg-surface-default px-32">
      <h1 className="text-xl font-semibold text-text-primary">{title}</h1>

      <div className="flex items-center gap-16">
        <RoleSwitcher role={role} />
        <IconButton icon="bell" label="Notifications" variant="ghost" />

        <div className="flex items-center gap-12">
          <Avatar name="Ayu Pratama" size="md" />
          <span className="flex flex-col">
            <span className="text-sm font-semibold text-text-primary">
              Ayu Pratama
            </span>
            <span className="text-xs text-text-secondary">
              {roleLabels[role]}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}