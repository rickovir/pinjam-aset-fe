import { cookies } from "next/headers";

import { isRole, type Role } from "./roles";

/**
 * Reads the demo role from the cookie the RoleSwitcher writes.
 * Server-side so navigation and the landing page match the current role.
 */
export async function getRole(): Promise<Role> {
  const store = await cookies();
  const value = store.get("pa-role")?.value;
  return isRole(value) ? value : "employee";
}