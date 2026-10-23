import { AppShell, DataTable, KpiCard, Page, StatusBadge } from "@/components";
import { getRole } from "@/lib/role-server";
import { handovers } from "@/lib/fixtures";

export const instant = false;

export default async function HandoverPage() {
  const role = await getRole();

  return (
    <AppShell role={role} title="Handover Queue">
      <Page
        title="Handover queue"
        description="Approved requests waiting to be collected or returned."
      >
        <div className="grid grid-cols-3 gap-24">
          <KpiCard label="To hand over" value={String(handovers.length)} icon="handover" />
          <KpiCard label="Due back today" value="1" icon="clock" />
          <KpiCard label="Overdue" value="1" tone="danger" icon="alert-triangle" />
        </div>

        <DataTable
          rows={handovers}
          rowKey={(h) => h.id}
          columns={[
            { key: "id", header: "Request ID", width: 1, render: (h) => h.id },
            { key: "asset", header: "Asset", width: 2, render: (h) => h.asset },
            { key: "borrower", header: "Borrower", width: 1.5, render: (h) => h.borrower },
            { key: "slot", header: "Slot", width: 1.5, render: (h) => h.slot },
            { key: "office", header: "Office", width: 1, render: (h) => h.office },
            {
              key: "status",
              header: "Status",
              width: 1.5,
              render: (h) => <StatusBadge status={h.status} />,
            },
          ]}
        />
      </Page>
    </AppShell>
  );
}