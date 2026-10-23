import { notFound } from "next/navigation";

import { AppShell, Icon, Page, Panel, StatusBadge } from "@/components";
import { getRole } from "@/lib/role-server";
import { assets } from "@/lib/fixtures";
import { RequestPanel } from "../RequestPanel";

export const instant = false;

export default async function EquipmentDetailPage({
  params,
}: PageProps<"/equipment/[id]">) {
  const { id } = await params;
  const asset = assets.find((a) => a.id === id);
  if (!asset) notFound();

  const role = await getRole();

  return (
    <AppShell role={role} title="Equipment detail">
      <Page
        title={asset.name}
        description={`${asset.id} · ${asset.location} office`}
      >
        <div className="grid grid-cols-3 gap-24">
          <div className="col-span-2 flex flex-col gap-24">
            <Panel>
              <div className="flex gap-24">
                <div className="flex size-160 shrink-0 items-center justify-center rounded-card bg-surface-placeholder text-text-subtle">
                  <Icon name={asset.icon} size="lg" className="size-40" />
                </div>
                <dl className="flex flex-1 flex-col gap-12">
                  <Row label="Asset tag" value={asset.id} />
                  <Row label="Category" value={asset.category} />
                  <Row label="Office" value={asset.location} />
                  <Row label="Condition" value={asset.condition} />
                  <Row label="Replacement value" value={asset.value} />
                  <Row
                    label="Availability"
                    value={<StatusBadge status={asset.status} />}
                  />
                </dl>
              </div>
            </Panel>

            <Panel title="Request this equipment">
              <RequestPanel asset={asset} hasOverdue={false} />
            </Panel>
          </div>

          <Panel title="Availability">
            <p className="text-sm text-text-secondary">{asset.availability}</p>
            <p className="text-xs text-text-muted">
              Loans are capped at 14 days. Request goes to your line manager,
              then GA for handover.
            </p>
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