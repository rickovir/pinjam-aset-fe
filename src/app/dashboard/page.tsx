import Link from "next/link";

import { AppShell, KpiCard, Page, Panel, StatusBadge } from "@/components";
import { getRole } from "@/lib/role-server";
import { loans } from "@/lib/fixtures";

export const instant = false;

export default async function DashboardPage() {
  const role = await getRole();
  const active = loans.filter((l) => l.status === "On Loan").length;
  const overdue = loans.filter((l) => l.status === "Overdue").length;

  return (
    <AppShell role={role} title="Dashboard">
      <Page
        title="Your loans"
        description="Track what you have borrowed and what needs returning."
      >
        <div className="grid grid-cols-3 gap-24">
          <KpiCard
            label="Equipment on hand"
            value={String(active)}
            icon="package"
            hint="Asset currently borrowed"
          />
          <KpiCard
            label="Overdue"
            value={String(overdue)}
            tone={overdue > 0 ? "danger" : "default"}
            icon="alert-triangle"
            hint={overdue > 0 ? "Return to keep borrowing" : "Good standing"}
          />
          <KpiCard
            label="Loan history"
            value={String(loans.length)}
            icon="history"
            hint="All past requests"
          />
        </div>

        <Panel
          title="Recent requests"
          actions={
            <Link
              href="/loans"
              className="text-sm font-semibold text-text-brand"
            >
              View all
            </Link>
          }
        >
          <ul className="flex flex-col gap-16">
            {loans.map((l) => (
              <li
                key={l.id}
                className="flex items-center justify-between gap-16 border-b border-border-default pb-16 last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-4">
                  <span className="text-sm font-semibold text-text-primary">
                    {l.asset}
                  </span>
                  <span className="text-xs text-text-muted">
                    {l.id} · {l.dates}
                  </span>
                </div>
                <StatusBadge status={l.status} />
              </li>
            ))}
          </ul>
        </Panel>
      </Page>
    </AppShell>
  );
}