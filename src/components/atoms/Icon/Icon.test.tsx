import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { icons, Icon } from "./Icon";

describe("Icon", () => {
  it("carries the 27 design-system glyphs", () => {
    expect(Object.keys(icons)).toHaveLength(27);
  });

  it("is hidden from assistive tech without a label", () => {
    const { container } = render(<Icon name="check" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("becomes a labelled image with a label", () => {
    const { container } = render(<Icon name="bell" label="Notifications" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).toHaveAttribute("aria-label", "Notifications");
    expect(svg).not.toHaveAttribute("aria-hidden");
  });

  it.each([
    ["sm", "16"],
    ["md", "20"],
    ["lg", "24"],
  ] as const)("maps the %s token to %spx", (size, px) => {
    const { container } = render(<Icon name="check" size={size} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", px);
    expect(svg).toHaveAttribute("height", px);
  });
});
