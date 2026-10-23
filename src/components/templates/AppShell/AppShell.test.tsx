import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("wraps the page in the sidebar, top bar and main region", () => {
    render(
      <AppShell role="employee" title="Dashboard">
        <p>Dashboard content</p>
      </AppShell>,
    );
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Dashboard" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Dashboard content");
  });
});
