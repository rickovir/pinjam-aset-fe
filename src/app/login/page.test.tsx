import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

import LoginPage from "./page";

describe("LoginPage", () => {
  it("centres the sign-in card on the canvas", () => {
    render(<LoginPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Sign in to PinjamAset" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });
});
