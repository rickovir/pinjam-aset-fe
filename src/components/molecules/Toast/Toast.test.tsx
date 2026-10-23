import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Toast } from "./Toast";

describe("Toast", () => {
  it("announces itself politely with title and body", () => {
    render(
      <Toast type="success" title="Request submitted">
        Track it under My Loans.
      </Toast>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Request submitted")).toBeInTheDocument();
    expect(screen.getByText("Track it under My Loans.")).toBeInTheDocument();
  });

  it("can be dismissed", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(<Toast title="Saved" onDismiss={onDismiss} />);
    await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("hides the dismiss control when nothing is wired up", () => {
    render(<Toast title="Saved" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
