import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { assets } from "@/lib/fixtures";
import { RequestPanel } from "./RequestPanel";

const available = assets[0]; // AST-0142 MacBook, Available
const onLoan = assets[2]; // AST-0118 Dell, On Loan

describe("RequestPanel", () => {
  it("blocks an overdue borrower outright", () => {
    render(<RequestPanel asset={available} hasOverdue />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "You cannot request new equipment yet",
    );
    expect(screen.queryByLabelText("Pick-up date")).not.toBeInTheDocument();
  });

  it("submits a valid range for an available asset", async () => {
    const user = userEvent.setup();
    render(<RequestPanel asset={available} hasOverdue={false} />);
    await user.type(screen.getByLabelText("Pick-up date"), "2026-10-22");
    await user.type(screen.getByLabelText("Return date"), "2026-10-25");
    await user.click(screen.getByRole("button", { name: "Submit request" }));
    expect(screen.getByText("Request submitted")).toBeInTheDocument();
    expect(screen.getByText(/AST-0142 is now waiting/)).toBeInTheDocument();
  });

  it("rejects a loan longer than 14 days", async () => {
    const user = userEvent.setup();
    render(<RequestPanel asset={available} hasOverdue={false} />);
    await user.type(screen.getByLabelText("Pick-up date"), "2026-10-22");
    await user.type(screen.getByLabelText("Return date"), "2026-11-22");
    expect(screen.getByText("Maximum loan period is 14 days.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit request" })).toBeDisabled();
  });

  it("rejects a reversed date range", async () => {
    const user = userEvent.setup();
    render(<RequestPanel asset={available} hasOverdue={false} />);
    await user.type(screen.getByLabelText("Pick-up date"), "2026-10-25");
    await user.type(screen.getByLabelText("Return date"), "2026-10-22");
    expect(screen.getByText("Choose a valid range")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit request" })).toBeDisabled();
  });

  it("keeps the CTA off for an unavailable asset", () => {
    render(<RequestPanel asset={onLoan} hasOverdue={false} />);
    expect(screen.getByRole("button", { name: "Submit request" })).toBeDisabled();
    expect(screen.getByText("On Loan")).toBeInTheDocument();
  });
});
