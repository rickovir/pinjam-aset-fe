import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/atoms/Button";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("shows the title and supporting line", () => {
    render(<EmptyState title="No results" description="Try a different filter." />);
    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.getByText("Try a different filter.")).toBeInTheDocument();
  });

  it("hosts an action through children", () => {
    render(
      <EmptyState title="No results">
        <Button>Clear filters</Button>
      </EmptyState>,
    );
    expect(screen.getByRole("button", { name: "Clear filters" })).toBeInTheDocument();
  });
});
