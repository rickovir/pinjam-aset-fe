import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

import { roleLabels } from "@/lib/roles";
import { TopBar } from "./TopBar";

describe("TopBar", () => {
  it("shows the page title, user and notifications", () => {
    render(<TopBar title="Equipment catalogue" role="employee" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Equipment catalogue" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Ayu Pratama")).toBeInTheDocument();
    // Scoped to spans: the same role label also appears as a RoleSwitcher option.
    expect(screen.getByText(roleLabels.employee, { selector: "span" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Notifications" })).toBeInTheDocument();
  });

  it("names the role under the user", () => {
    render(<TopBar title="Approvals" role="manager" />);
    expect(screen.getByText(roleLabels.manager, { selector: "span" })).toBeInTheDocument();
  });
});
