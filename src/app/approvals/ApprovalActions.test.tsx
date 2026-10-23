import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { approvals } from "@/lib/fixtures";
import { ApprovalActions } from "./ApprovalActions";

const approval = approvals[0]; // REQ-0244, Dell Latitude, Ayu Pratama

describe("ApprovalActions", () => {
  it("offers a note field and both decisions", () => {
    render(<ApprovalActions approval={approval} />);
    expect(screen.getByLabelText("Note")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approve" })).toBeInTheDocument();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("confirms a rejection before committing, and can back out", async () => {
    const user = userEvent.setup();
    render(<ApprovalActions approval={approval} />);
    await user.click(screen.getByRole("button", { name: "Reject" }));
    expect(screen.getByRole("alertdialog")).toHaveTextContent("Reject this request?");
    expect(screen.getByRole("alertdialog")).toHaveTextContent("Ayu Pratama will be notified");
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approve" })).toBeInTheDocument();
  });

  it("lands on a rejection alert after confirming", async () => {
    const user = userEvent.setup();
    render(<ApprovalActions approval={approval} />);
    await user.click(screen.getByRole("button", { name: "Reject" }));
    await user.click(screen.getByRole("button", { name: "Reject request" }));
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Request rejected");
    expect(alert).toHaveTextContent("REQ-0244 has been rejected");
  });

  it("approves and passes the asset on to GA, echoing the note", async () => {
    const user = userEvent.setup();
    render(<ApprovalActions approval={approval} />);
    await user.type(screen.getByLabelText("Note"), "Approved for the workshop");
    await user.click(screen.getByRole("button", { name: "Approve" }));
    await user.click(screen.getByRole("button", { name: "Approve request" }));
    const alert = screen.getByRole("status");
    expect(alert).toHaveTextContent("Request approved");
    expect(alert).toHaveTextContent("sent to GA for handover");
    expect(alert).toHaveTextContent("Note: “Approved for the workshop”");
  });
});
