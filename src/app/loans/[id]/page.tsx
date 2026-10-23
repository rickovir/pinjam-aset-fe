import { notFound } from "next/navigation";

import {
  AppShell,
  Button,
  Page,
  Panel,
  StatusBadge,
  Timeline,
  TimelineStep,
} from "@/components";
import { getRole } from "@/lib/role-server";
import { loanTimeline, loans } from "@/lib/fixtures";

export const instant = false;

export default async function LoanDetailPage({
  params,
}: PageProps<"/loans/[id]">) {
  const { id } = await params;
  const loan = loans.find((l) => l.id === id);
  if (!loan) notFound();

  const role = await getRole();

  return (
    <AppShell role={role} title="Loan detail">
      <Page
        title={loan.asset}
        description={`${loan.id} · borrowed by ${loan.borrower}`}
        actions={
          <>
            <Button variant="secondary">Cancel request</Button>
            <Button variant="primary">Extend loan</Button>
          </>
        }
      >
        <div className="grid grid-cols-3 gap-24">
          <Panel title="Request">
            <dl className="flex flex-col gap-12">
              <Row label="Request ID" value={loan.id} />
              <Row label="Asset" value={loan.asset} />
              <Row label="Borrower" value={loan.borrower} />
              <Row label="Loan period" value={loan.dates} />
              <Row
                label="Status"
                value={<StatusBadge status={loan.status} />}
              />
            </dl>
          </Panel>

          <Panel title="Progress" className="col-span-2">
            <Timeline>
              {loanTimeline.map((step, i) => (
                <TimelineStep
                  key={step.title}
                  state={step.state}
                  title={step.title}
                  detail={step.detail}
                  timestamp={step.timestamp}
                  isLast={i === loanTimeline.length - 1}
                />
              ))}
            </Timeline>
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