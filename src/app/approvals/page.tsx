import Link from "next/link";

import { AppShell, Button, DataTable, Page, StatusBadge, Tab, TabList } from "@/components";
import { getRole } from "@/lib/role-server";
import { approvals } from "@/lib/fixtures";

export const instant = false;

export default async function ApprovalsPage() {
  const role = await getRole();
  const pending = approvals.filter((a) => a.status === "Pending Manager");

  return (
    <AppShell role={role} title="Pending Approvals">
      <Page
        title="Pending approvals"
        description="Requests waiting on your decision. Overdue loans are blocked automatically."
      >
        <TabList>
          <Tab active count={pending.length}>
            Pending
          </Tab>
          <Tab count={8}>History</Tab>
        </TabList>

        <DataTable
          rows={approvals}
          rowKey={(a) => a.id}
          columns={[
            { key: "id", header: "Request ID", width: 1, render: (a) => a.id },
            { key: "asset", header: "Asset", width: 2, render: (a) => a.asset },
            { key: "borrower", header: "Borrower", width: 1.5, render: (a) => a.borrower },
            { key: "dates", header: "Dates", width: 1.5, render: (a) => a.dates },
            {
              key: "status",
              header: "Status",
              width: 1.5,
              render: (a) => <StatusBadge status={a.status} />,
            },
            {
              key: "action",
              header: "Action",
              width: 1.4,
              render: (a) => (
                <Link href={`/approvals/${a.id}`}>
                  <Button variant="primary">Approve</Button>
                </Link>
              ),
            },
          ]}
        />
      </Page>
    </AppShell>
  );
}