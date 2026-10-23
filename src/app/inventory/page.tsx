import { AppShell, DataTable, KpiCard, Page, StatusBadge } from "@/components";
import { getRole } from "@/lib/role-server";
import { assets } from "@/lib/fixtures";

export const instant = false;

export default async function InventoryPage() {
  const role = await getRole();
  const available = assets.filter((a) => a.status === "Available").length;
  const repair = assets.filter((a) => a.status === "Under repair").length;

  return (
    <AppShell role={role} title="Inventory">
      <Page
        title="Inventory"
        description="Every asset on record, with current availability."
      >
        <div className="grid grid-cols-4 gap-24">
          <KpiCard label="Total assets" value={String(assets.length)} icon="package" />
          <KpiCard label="Available" value={String(available)} icon="check" />
          <KpiCard label="Under repair" value={String(repair)} tone="warning" icon="alert-triangle" />
          <KpiCard
            label="Retired"
            value={String(assets.filter((a) => a.status === "Retired").length)}
            icon="x"
          />
        </div>

        <DataTable
          rows={assets}
          rowKey={(a) => a.id}
          columns={[
            { key: "id", header: "Asset tag", width: 1, render: (a) => a.id },
            { key: "name", header: "Name", width: 2, render: (a) => a.name },
            { key: "category", header: "Category", width: 1.2, render: (a) => a.category },
            { key: "office", header: "Office", width: 1.2, render: (a) => a.location },
            { key: "condition", header: "Condition", width: 1.5, render: (a) => a.condition },
            { key: "value", header: "Value", width: 1.5, render: (a) => a.value },
            {
              key: "status",
              header: "Status",
              width: 1.4,
              render: (a) => <StatusBadge status={a.status} />,
            },
          ]}
        />
      </Page>
    </AppShell>
  );
}