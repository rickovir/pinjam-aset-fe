import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FilterChip } from "./FilterChip";

describe("FilterChip", () => {
  it("flags its selected state via aria-pressed", () => {
    const { rerender } = render(<FilterChip>Laptop</FilterChip>);
    expect(screen.getByRole("button", { name: "Laptop" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    rerender(<FilterChip selected>Laptop</FilterChip>);
    expect(screen.getByRole("button", { name: "Laptop" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("fires onClick on the chip", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<FilterChip onClick={onClick}>Camera</FilterChip>);
    await user.click(screen.getByRole("button", { name: "Camera" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("removes without selecting the chip", async () => {
    const onClick = vi.fn();
    const onRemove = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <FilterChip selected onClick={onClick} onRemove={onRemove}>
        Laptop
      </FilterChip>,
    );
    await user.click(container.querySelector("span")!);
    expect(onRemove).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
  });
});
