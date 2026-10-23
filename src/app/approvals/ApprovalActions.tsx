"use client";

import { useState } from "react";

import { Alert } from "@/components/molecules/Alert";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { Input } from "@/components/atoms/Input";
import type { Approval } from "@/lib/fixtures";

/** Approve / reject actions for the approval detail screen. */
export function ApprovalActions({ approval }: { approval: Approval }) {
  const [dialog, setDialog] = useState<"approve" | "reject" | null>(null);
  const [note, setNote] = useState("");
  const [done, setDone] = useState<"approve" | "reject" | null>(null);

  if (done) {
    return (
      <Alert
        type={done === "approve" ? "success" : "error"}
        title={done === "approve" ? "Request approved" : "Request rejected"}
      >
        {approval.id} has been {done === "approve" ? "sent to GA for handover" : "rejected"}.
        {note ? ` Note: “${note}”` : ""}
      </Alert>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-16">
        <Input
          label="Note"
          helper="Optional. Shared with the requester."
          placeholder="Add a note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setDialog("reject")}
            className="inline-flex h-40 items-center justify-center rounded-button bg-button-destructive-bg px-16 text-sm font-semibold text-button-destructive-text"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => setDialog("approve")}
            className="inline-flex h-40 items-center justify-center rounded-button bg-button-primary-bg px-16 text-sm font-semibold text-button-primary-text"
          >
            Approve
          </button>
        </div>
      </div>

      {dialog ? (
        <ConfirmDialog
          type={dialog}
          title={dialog === "approve" ? "Approve this request?" : "Reject this request?"}
          description={
            dialog === "approve"
              ? `${approval.asset} will be reserved and passed to GA for handover.`
              : `${approval.borrower} will be notified. They can submit a new request later.`
          }
          onCancel={() => setDialog(null)}
          onConfirm={() => {
            setDialog(null);
            setDone(dialog);
          }}
        />
      ) : null}
    </>
  );
}