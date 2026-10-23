import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("starts unchecked unless defaultChecked", () => {
    const { unmount } = render(<Checkbox label="Include retired" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    unmount();
    render(<Checkbox label="Include retired" defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("toggles when the label or the box is clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Include retired" />);
    await user.click(screen.getByText("Include retired"));
    expect(screen.getByRole("checkbox")).toBeChecked();
    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Include retired" disabled />);
    const box = screen.getByRole("checkbox");
    expect(box).toBeDisabled();
    await user.click(screen.getByText("Include retired"));
    expect(box).not.toBeChecked();
  });

  it("draws the check glyph only when checked", () => {
    const { container } = render(<Checkbox label="Include retired" defaultChecked />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
