import { describe, expect, it } from "vitest";

import { requestStatuses } from "@/components/atoms/StatusBadge";
import {
  approvals,
  assets,
  categories,
  currentUser,
  handovers,
  loanTimeline,
  loans,
  locations,
  returns,
} from "./fixtures";

const statuses = requestStatuses as readonly string[];

describe("assets", () => {
  it("gives every asset a unique id and a valid status", () => {
    const ids = assets.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const asset of assets) {
      expect(statuses).toContain(asset.status);
    }
  });

  it("keeps the category and location lists in sync with the asset set", () => {
    for (const asset of assets) {
      expect(categories).toContain(asset.category);
      expect(locations).toContain(asset.location);
    }
  });

  it("covers the four card statuses across the demo set", () => {
    const used = new Set(assets.map((a) => a.status));
    for (const status of ["Available", "On Loan", "Under repair", "Retired"]) {
      expect(used).toContain(status);
    }
  });
});

describe("request queues", () => {
  it("uses request statuses on loans, approvals, handovers and returns", () => {
    for (const row of loans) expect(statuses).toContain(row.status);
    for (const row of approvals) expect(statuses).toContain(row.status);
    for (const row of handovers) expect(statuses).toContain(row.status);
    for (const row of returns) expect(statuses).toContain(row.state);
  });

  it("gives every queue row a unique id", () => {
    for (const list of [loans, approvals, handovers, returns]) {
      const ids = list.map((row) => row.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe("loanTimeline", () => {
  it("draws a valid step sequence ending on the current step", () => {
    const states = loanTimeline.map((step) => step.state);
    for (const state of states) {
      expect(["done", "current", "upcoming", "rejected"]).toContain(state);
    }
    expect(states[states.length - 1]).toBe("current");
  });
});

describe("currentUser", () => {
  it("names the demo persona", () => {
    expect(currentUser.name).toBe("Ayu Pratama");
    expect(currentUser.role).toBe("Employee");
  });
});
