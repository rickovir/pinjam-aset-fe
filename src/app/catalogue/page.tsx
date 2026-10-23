import { AppShell } from "@/components/templates/AppShell";
import { getRole } from "@/lib/role-server";
import { CatalogueClient } from "./CatalogueClient";

// The shell renders navigation from the demo-role cookie, a request read that
// cannot be prerendered. Next.js 16's documented opt-out for such routes.
export const instant = false;

export default async function CataloguePage() {
  const role = await getRole();

  return (
    <AppShell role={role} title="Catalogue">
      <CatalogueClient />
    </AppShell>
  );
}