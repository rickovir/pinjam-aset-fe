import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pathname: "/catalogue" }));

vi.mock("next/navigation", () => ({
  usePathname: () => nav.pathname,
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

import { NavItem } from "./NavItem";

describe("NavItem", () => {
  it("links to its href and shows the label", () => {
    render(<NavItem href="/loans" label="My Loans" icon="clipboard-check" />);
    const link = screen.getByRole("link", { name: /My Loans/ });
    expect(link).toHaveAttribute("href", "/loans");
    expect(link).not.toHaveAttribute("aria-current");
  });

  it("marks the current page", () => {
    render(<NavItem href="/catalogue" label="Equipment" icon="package" />);
    expect(screen.getByRole("link", { name: /Equipment/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("lets the active prop override the pathname", () => {
    render(<NavItem href="/loans" label="My Loans" icon="clipboard-check" active />);
    expect(screen.getByRole("link", { name: /My Loans/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
