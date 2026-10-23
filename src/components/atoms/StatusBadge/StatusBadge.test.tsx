import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { requestStatuses, StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders the status with its icon", () => {
    const { container } = render(<StatusBadge status="Approved" />);
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("can hide the icon for dense table layouts", () => {
    const { container } = render(<StatusBadge status="Approved" hideIcon />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("renders every request status", () => {
    for (const status of requestStatuses) {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      unmount();
    }
  });
});
