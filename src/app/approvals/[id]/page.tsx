import { notFound } from "next/navigation";

import { AppShell, Page, Panel, StatusBadge } from "@/components";
import { getRole } from "@/lib/role-server";
import { approvals } from "@/lib/fixtures";
import { ApprovalActions } from "../ApprovalActions";

export const instant = false;

export default async function ApprovalDetailPage({
  params,
}: PageProps<"/approvals/[id]">) {
  const { id } = await params;
  const approval = approvals.find((a) => a.id === id);
  if (!approval) notFound();

  const role = await getRole();

  return (
    <AppShell role={role} title="Approval detail">
      <Page
        title={approval.asset}
        description={`${approval.id} · requested by ${approval.borrower}`}
      >
        <div className="grid grid-cols-3 gap-24">
          <Panel title="Request">
            <dl className="flex flex-col gap-12">
              <Row label="Request ID" value={approval.id} />
              <Row label="Asset" value={approval.asset} />
              <Row label="Borrower" value={approval.borrower} />
              <Row label="Reason" value={approval.reason} />
              <Row label="Loan period" value={approval.dates} />
              <Row
                label="Status"
                value={<StatusBadge status={approval.status} />}
              />
            </dl>
          </Panel>

          <Panel title="Decision" className="col-span-2">
            <ApprovalActions approval={approval} />
          </Panel>
        </div>
      </Page>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-16">
      <dt className="text-sm text-text-secondary">{label}</dt>
      <dd className="text-sm font-medium text-text-primary">{value}</dd>
    </div>
  );
}