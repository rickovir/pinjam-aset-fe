import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { InteractiveShowcase } from "./Interactive";

describe("InteractiveShowcase", () => {
  it("starts with Jakarta selected among the chips", () => {
    render(<InteractiveShowcase />);
    expect(screen.getByRole("button", { name: "Jakarta" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Bandung" })).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles chips on click", async () => {
    const user = userEvent.setup();
    render(<InteractiveShowcase />);
    await user.click(screen.getByRole("button", { name: "Bandung" }));
    expect(screen.getByRole("button", { name: "Bandung" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Jakarta" }));
    expect(screen.getByRole("button", { name: "Jakarta" })).toHaveAttribute("aria-pressed", "false");
  });

  it("deselects through the chip's remove glyph", async () => {
    const user = userEvent.setup();
    render(<InteractiveShowcase />);
    await user.click(screen.getByRole("button", { name: "Jakarta" }).querySelector("span")!);
    expect(screen.getByRole("button", { name: "Jakarta" })).toHaveAttribute("aria-pressed", "false");
  });

  it("moves the active tab on click", async () => {
    const user = userEvent.setup();
    render(<InteractiveShowcase />);
    expect(screen.getByRole("tab", { name: /Pending/ }).getAttribute("aria-selected")).toBe("true");
    await user.click(screen.getByRole("tab", { name: /All/ }));
    expect(screen.getByRole("tab", { name: /All/ }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tab", { name: /Pending/ }).getAttribute("aria-selected")).toBe("false");
  });

  it("shows and dismisses the toast", async () => {
    const user = userEvent.setup();
    render(<InteractiveShowcase />);
    expect(screen.getByText("Request submitted")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(screen.queryByText("Request submitted")).not.toBeInTheDocument();
  });

  it("brings the toast back with the toggle", async () => {
    const user = userEvent.setup();
    render(<InteractiveShowcase />);
    await user.click(screen.getByRole("button", { name: "Toggle toast" }));
    expect(screen.queryByText("Request submitted")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Toggle toast" }));
    expect(screen.getByText("Request submitted")).toBeInTheDocument();
  });
});
