import { expect, it } from "vitest";

import * as components from "@/components";

it("exports the full component surface from the barrel", () => {
  const exported = Object.keys(components);
  const expected = [
    // atoms
    "Avatar",
    "Button",
    "Checkbox",
    "FilterChip",
    "Icon",
    "icons",
    "IconButton",
    "Input",
    "StatusBadge",
    "requestStatuses",
    "Switch",
    "Tab",
    "TabList",
    // molecules
    "Alert",
    "AssetCard",
    "ConfirmDialog",
    "EmptyState",
    "KpiCard",
    "NavItem",
    "RoleSwitcher",
    "Timeline",
    "TimelineStep",
    "Toast",
    // organisms
    "DataTable",
    "Sidebar",
    "TopBar",
    // templates
    "AppShell",
    "Page",
    "Panel",
  ];
  for (const name of expected) {
    expect(exported, `missing export: ${name}`).toContain(name);
  }
});
