import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Timeline, TimelineStep } from "./TimelineStep";

describe("TimelineStep", () => {
  it("shows title, detail and timestamp", () => {
    render(
      <TimelineStep
        state="current"
        title="On loan"
        detail="Due back 5 Nov"
        timestamp="now"
      />,
    );
    expect(screen.getByText("On loan")).toBeInTheDocument();
    expect(screen.getByText("Due back 5 Nov")).toBeInTheDocument();
    expect(screen.getByText("now")).toBeInTheDocument();
  });

  it("draws the connector unless it is the last step", () => {
    const { container, rerender } = render(
      <TimelineStep state="done" title="Submitted" />,
    );
    // Marker column holds the dot plus the connector to the next step.
    expect(container.querySelector("li > div")?.children).toHaveLength(2);
    rerender(<TimelineStep state="done" title="Submitted" isLast />);
    expect(container.querySelector("li > div")?.children).toHaveLength(1);
  });
});

describe("Timeline", () => {
  it("stacks steps in an ordered list", () => {
    render(
      <Timeline>
        <TimelineStep state="done" title="Submitted" isLast />
      </Timeline>,
    );
    expect(screen.getByRole("list")).toBeInstanceOf(HTMLOListElement);
    expect(screen.getByText("Submitted")).toBeInTheDocument();
  });
});
