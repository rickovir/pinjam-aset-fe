import { AppShell, DataTable, Page, StatusBadge } from "@/components";
import { getRole } from "@/lib/role-server";
import { returns } from "@/lib/fixtures";

export const instant = false;

export default async function ReturnsPage() {
  const role = await getRole();

  return (
    <AppShell role={role} title="Return Processing">
      <Page
        title="Return processing"
        description="Check assets back in, then mark the loan returned."
      >
        <DataTable
          rows={returns}
          rowKey={(r) => r.id}
          columns={[
            { key: "id", header: "Request ID", width: 1, render: (r) => r.id },
            { key: "asset", header: "Asset", width: 2, render: (r) => r.asset },
            { key: "borrower", header: "Borrower", width: 1.5, render: (r) => r.borrower },
            { key: "due", header: "Due back", width: 1.2, render: (r) => r.due },
            {
              key: "state",
              header: "State",
              width: 1.5,
              render: (r) => (
                <StatusBadge
                  status={
                    r.state === "Overdue" ? "Overdue" : ("On Loan" as const)
                  }
                />
              ),
            },
          ]}
        />
      </Page>
    </AppShell>
  );
}