import { describe, expect, it } from "vitest";

import { icons } from "@/components/atoms/Icon";
import {
  isRole,
  roleFooterNav,
  roleHome,
  roleLabels,
  roleNav,
  roles,
} from "./roles";

describe("roles", () => {
  it("defines the three demo roles with display labels", () => {
    expect(roles).toEqual(["employee", "manager", "ga"]);
    for (const role of roles) {
      expect(roleLabels[role]).toBeTruthy();
    }
    expect(roleLabels.manager).toBe("Line Manager");
  });

  it("routes each role to its own landing page", () => {
    expect(roleHome.employee).toBe("/catalogue");
    expect(roleHome.manager).toBe("/approvals");
    expect(roleHome.ga).toBe("/inventory");
  });

  it("gives every nav entry an href and a design-system icon", () => {
    const iconNames = Object.keys(icons);
    for (const role of roles) {
      const entries = [...roleNav[role], roleFooterNav[role]];
      expect(entries.length).toBeGreaterThan(0);
      for (const entry of entries) {
        expect(entry.href).toMatch(/^\//);
        expect(entry.label).toBeTruthy();
        expect(iconNames).toContain(entry.icon);
      }
    }
  });

  it("keeps nav hrefs unique within a role", () => {
    for (const role of roles) {
      const hrefs = [...roleNav[role], roleFooterNav[role]].map((e) => e.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });
});

describe("isRole", () => {
  it("accepts the known roles", () => {
    expect(isRole("employee")).toBe(true);
    expect(isRole("manager")).toBe(true);
    expect(isRole("ga")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isRole("admin")).toBe(false);
    expect(isRole("")).toBe(false);
    expect(isRole(undefined)).toBe(false);
    expect(isRole(null)).toBe(false);
  });
});
