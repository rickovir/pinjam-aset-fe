import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KpiCard } from "./KpiCard";

describe("KpiCard", () => {
  it("shows label, value and hint", () => {
    render(
      <KpiCard
        label="Assets on loan"
        value="18"
        hint="+3 this week"
        icon="package"
      />,
    );
    expect(screen.getByText("Assets on loan")).toBeInTheDocument();
    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.getByText("+3 this week")).toBeInTheDocument();
  });

  it("renders without a hint", () => {
    render(<KpiCard label="Assets on loan" value="18" />);
    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.queryByText("+3 this week")).not.toBeInTheDocument();
  });
});
