import { beforeEach, describe, expect, it, vi } from "vitest";

const cookieJar = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("next/headers", () => ({
  cookies: async () => cookieJar,
}));

import { getRole } from "./role-server";

describe("getRole", () => {
  beforeEach(() => {
    cookieJar.get.mockReset();
  });

  it("returns the cookie role when it is valid", async () => {
    cookieJar.get.mockReturnValue({ value: "manager" });
    await expect(getRole()).resolves.toBe("manager");
    expect(cookieJar.get).toHaveBeenCalledWith("pa-role");
  });

  it("falls back to employee for an unknown role", async () => {
    cookieJar.get.mockReturnValue({ value: "ceo" });
    await expect(getRole()).resolves.toBe("employee");
  });

  it("falls back to employee when the cookie is missing", async () => {
    cookieJar.get.mockReturnValue(undefined);
    await expect(getRole()).resolves.toBe("employee");
  });
});
