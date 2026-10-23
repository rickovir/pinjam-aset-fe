import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pathname: "/catalogue" }));

vi.mock("next/navigation", () => ({
  usePathname: () => nav.pathname,
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

import { roleNav } from "@/lib/roles";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  beforeEach(() => {
    nav.pathname = "/catalogue";
  });

  it("brands itself as PinjamAset", () => {
    render(<Sidebar role="employee" />);
    expect(screen.getByText("PinjamAset")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("lists the employee rail using nav copy, not route names", () => {
    render(<Sidebar role="employee" />);
    expect(screen.getByRole("link", { name: /Equipment/ })).toBeInTheDocument();
    expect(screen.queryByText("Catalogue")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /My Loans/ })).toBeInTheDocument();
  });

  it("swaps the rail per role", () => {
    render(<Sidebar role="ga" />);
    for (const item of roleNav.ga) {
      const label = item.navLabel ?? item.label;
      expect(screen.getByRole("link", { name: new RegExp(label) })).toBeInTheDocument();
    }
  });

  it("pins sign out at the bottom of the rail", () => {
    render(<Sidebar role="employee" />);
    const links = screen.getAllByRole("link");
    expect(links[links.length - 1]).toHaveTextContent("Sign out");
  });
});
