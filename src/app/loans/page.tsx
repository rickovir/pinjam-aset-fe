import { DataTable, AppShell, Page, StatusBadge, Tab, TabList } from "@/components";
import { getRole } from "@/lib/role-server";
import { loans } from "@/lib/fixtures";

export const instant = false;

const tabs = ["All", "Active", "Returned"] as const;

export default async function MyLoansPage() {
  const role = await getRole();

  return (
    <AppShell role={role} title="My Loans">
      <Page
        title="My loans"
        description="Every request you have raised, and where it stands."
      >
        <TabList>
          {tabs.map((t, i) => (
            <Tab key={t} active={i === 0} count={i === 0 ? loans.length : undefined}>
              {t}
            </Tab>
          ))}
        </TabList>

        <DataTable
          rows={loans}
          rowKey={(l) => l.id}
          columns={[
            { key: "id", header: "Request ID", width: 1, render: (l) => l.id },
            { key: "asset", header: "Asset", width: 2, render: (l) => l.asset },
            { key: "dates", header: "Dates", width: 2, render: (l) => l.dates },
            {
              key: "status",
              header: "Status",
              width: 2,
              render: (l) => <StatusBadge status={l.status} />,
            },
          ]}
        />
      </Page>
    </AppShell>
  );
}