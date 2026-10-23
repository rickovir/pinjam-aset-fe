import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders its label as a push button", () => {
    render(<Button>Save changes</Button>);
    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("blocks clicks and flags aria-disabled when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button disabled onClick={onClick}>Go</Button>);
    const button = screen.getByRole("button", { name: "Go" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it.each([
    ["primary", "bg-button-primary-bg"],
    ["secondary", "ring-border-input"],
    ["tertiary", "bg-transparent"],
    ["destructive", "bg-button-destructive-bg"],
  ] as const)("styles the %s variant", (variant, marker) => {
    render(<Button variant={variant}>Label</Button>);
    expect(screen.getByRole("button", { name: "Label" })).toHaveClass(marker);
  });

  it("shows a leading icon only when showIcon and icon are both set", () => {
    const { rerender } = render(
      <Button showIcon icon="plus">
        Add
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Add" }).querySelector("svg")).not.toBeNull();

    rerender(<Button icon="plus">Add</Button>);
    expect(screen.getByRole("button", { name: "Add" }).querySelector("svg")).toBeNull();
  });
});
