import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ConfirmDialog } from "./ConfirmDialog";

function renderDialog(props: Record<string, unknown> = {}) {
  return render(
    <ConfirmDialog
      title="Approve REQ-0244?"
      description="Dell Latitude 7440, 28 Oct – 10 Nov."
      {...props}
    />,
  );
}

describe("ConfirmDialog", () => {
  it("presents an alertdialog with title and description", () => {
    renderDialog();
    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Approve REQ-0244?")).toBeInTheDocument();
    expect(screen.getByText("Dell Latitude 7440, 28 Oct – 10 Nov.")).toBeInTheDocument();
  });

  it("confirms and cancels through the buttons", async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const user = userEvent.setup();
    renderDialog({ onConfirm, onCancel });
    await user.click(screen.getByRole("button", { name: "Approve request" }));
    expect(onConfirm).toHaveBeenCalledOnce();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("swaps to destructive copy for rejections", async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    renderDialog({ type: "reject", onConfirm });
    await user.click(screen.getByRole("button", { name: "Reject request" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("renders inline without the modal wrapper", () => {
    renderDialog({ inline: true });
    expect(screen.getByRole("alertdialog")).toHaveAttribute("aria-modal", "false");
  });

  it("renders without a description", () => {
    renderDialog({ description: undefined });
    expect(screen.getByRole("alertdialog")).toHaveTextContent("Approve REQ-0244?");
  });

  it("takes custom button labels", () => {
    renderDialog({ confirmLabel: "Hand over", cancelLabel: "Keep queued" });
    expect(screen.getByRole("button", { name: "Hand over" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Keep queued" })).toBeInTheDocument();
  });
});
