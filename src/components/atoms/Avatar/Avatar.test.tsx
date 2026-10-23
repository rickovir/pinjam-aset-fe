import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("derives initials from the first two name parts", () => {
    render(<Avatar name="Ayu Pratama" />);
    expect(screen.getByTitle("Ayu Pratama")).toHaveTextContent("AP");
  });

  it("uses a lone word's initial and ignores extra words", () => {
    const { rerender } = render(<Avatar name="Budi" />);
    expect(screen.getByTitle("Budi")).toHaveTextContent("B");
    rerender(<Avatar name="Dewi Lestari Wijaya" />);
    expect(screen.getByTitle("Dewi Lestari Wijaya")).toHaveTextContent("DL");
  });

  it("prefers explicit initials", () => {
    render(<Avatar name="Ayu Pratama" initials="XX" />);
    expect(screen.getByTitle("Ayu Pratama")).toHaveTextContent("XX");
  });
});
