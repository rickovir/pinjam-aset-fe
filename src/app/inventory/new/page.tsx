import { AppShell, Page, Panel } from "@/components";
import { getRole } from "@/lib/role-server";
import { EquipmentForm } from "../EquipmentForm";

export const instant = false;

export default async function AddEquipmentPage() {
  const role = await getRole();

  return (
    <AppShell role={role} title="Add equipment">
      <Page
        title="Add equipment"
        description="Register a new asset against an office."
      >
        <Panel>
          <EquipmentForm mode="add" />
        </Panel>
      </Page>
    </AppShell>
  );
}