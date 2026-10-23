import { redirect } from "next/navigation";

import { getRole } from "@/lib/role-server";
import { roleHome } from "@/lib/roles";

// Reads the demo-role cookie, which can't be prerendered into a static shell.
// Next.js 16's documented opt-out for request-dependent routes.
export const instant = false;

export default async function Home() {
  const role = await getRole();
  redirect(roleHome[role]);
}