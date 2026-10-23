import { notFound } from "next/navigation";

import { AppShell, Page, Panel } from "@/components";
import { getRole } from "@/lib/role-server";
import { assets } from "@/lib/fixtures";
import { EquipmentForm } from "../../EquipmentForm";

export const instant = false;

export default async function EditEquipmentPage({
  params,
}: PageProps<"/inventory/[id]/edit">) {
  const { id } = await params;
  const asset = assets.find((a) => a.id === id);
  if (!asset) notFound();

  const role = await getRole();

  return (
    <AppShell role={role} title="Edit equipment">
      <Page title={`Edit ${asset.id}`} description={asset.name}>
        <Panel>
          <EquipmentForm mode="edit" />
        </Panel>
      </Page>
    </AppShell>
  );
}