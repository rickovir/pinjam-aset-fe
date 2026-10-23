import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ push: vi.fn(), refresh: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: mocks.push, refresh: mocks.refresh, replace: vi.fn(), back: vi.fn() }),
}));

import { roleHome, roleLabels, roles } from "@/lib/roles";
import { RoleSwitcher } from "./RoleSwitcher";

describe("RoleSwitcher", () => {
  beforeEach(() => {
    mocks.push.mockClear();
    mocks.refresh.mockClear();
    document.cookie = "pa-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  });

  it("offers every demo role with its display label", () => {
    render(<RoleSwitcher role="employee" />);
    const select = screen.getByLabelText("Switch demo role") as HTMLSelectElement;
    expect(select.value).toBe("employee");
    for (const role of roles) {
      expect(screen.getByRole("option", { name: roleLabels[role] })).toBeInTheDocument();
    }
  });

  it("writes the role cookie and navigates to its home on change", async () => {
    const user = userEvent.setup();
    render(<RoleSwitcher role="employee" />);
    await user.selectOptions(screen.getByLabelText("Switch demo role"), "manager");
    expect(document.cookie).toContain("pa-role=manager");
    expect(mocks.push).toHaveBeenCalledWith(roleHome.manager);
    expect(mocks.refresh).toHaveBeenCalled();
  });
});
