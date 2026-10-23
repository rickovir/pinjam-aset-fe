import { Sidebar } from "@/components/organisms/Sidebar";
import { TopBar } from "@/components/organisms/TopBar";
import type { Role } from "@/lib/roles";

/**
 * Shared shell for every signed-in screen: 240px navy sidebar beside a main
 * column holding a 64px top bar over scrollable content. Matches the Figma
 * screen frame (1440 wide, sidebar 240 + main 1200, min-height 900).
 */
export function AppShell({
  role,
  title,
  children,
}: {
  role: Role;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-stretch bg-surface-canvas">
      <Sidebar role={role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title={title} role={role} />
        <main className="flex-1 px-32 py-32">{children}</main>
      </div>
    </div>
  );
}