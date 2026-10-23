import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ push: vi.fn(), refresh: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: mocks.push, refresh: mocks.refresh, replace: vi.fn(), back: vi.fn() }),
}));

import { roleHome } from "@/lib/roles";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    mocks.push.mockClear();
    mocks.refresh.mockClear();
    document.cookie = "pa-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  });

  it("renders the sign-in card with email and role fields", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Sign in to PinjamAset" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Work email")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("employee");
  });

  it("refuses an email without @ and shows the error alert", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.type(screen.getByLabelText("Work email"), "ayu.company.com");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Could not sign in");
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it("clears the error once the email is edited", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.type(screen.getByLabelText("Work email"), "nope");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Work email"), "@company.com");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("writes the role cookie and lands on that role's home", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.type(screen.getByLabelText("Work email"), "ayu@company.com");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(document.cookie).toContain("pa-role=employee");
    expect(mocks.push).toHaveBeenCalledWith(roleHome.employee);
    expect(mocks.refresh).toHaveBeenCalled();
  });

  it("honours a different role choice", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.type(screen.getByLabelText("Work email"), "ayu@company.com");
    await user.selectOptions(screen.getByRole("combobox"), "manager");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(document.cookie).toContain("pa-role=manager");
    expect(mocks.push).toHaveBeenCalledWith(roleHome.manager);
  });
});
