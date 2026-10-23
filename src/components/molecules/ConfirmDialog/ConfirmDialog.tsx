"use client";

import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";

/**
 * Figma: `Confirm Dialog` (101:395) — Type: Approve / Reject.
 *
 * 520px wide (`size/modal/md`), radius 12, with a scrim behind it. The reject
 * variant tints the icon and the confirm button with the danger token.
 */

export type DialogType = "approve" | "reject";

export interface ConfirmDialogProps {
  type?: DialogType;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Hides the scrim/close affordance so it can render inline. */
  inline?: boolean;
}

export function ConfirmDialog({
  type = "approve",
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  inline = false,
}: ConfirmDialogProps) {
  const danger = type === "reject";

  const panel = (
    <div
      role="alertdialog"
      aria-modal={!inline}
      aria-labelledby="confirm-dialog-title"
      className="flex w-520 max-w-full flex-col gap-24 rounded-modal bg-modal-bg p-32"
    >
      <div className="flex items-start gap-16">
        <span
          className={`flex size-48 shrink-0 items-center justify-center rounded-pill ${
            danger ? "bg-status-danger-bg text-status-danger-fg" : "bg-status-success-bg text-status-success-fg"
          }`}
        >
          <Icon name={danger ? "x" : "check"} size="lg" />
        </span>
        <div className="flex min-w-0 flex-col gap-4">
          <h2 id="confirm-dialog-title" className="text-xl font-semibold text-text-primary">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-text-secondary">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-end gap-8">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant={danger ? "destructive" : "primary"} onClick={onConfirm}>
          {confirmLabel ?? (danger ? "Reject request" : "Approve request")}
        </Button>
      </div>
    </div>
  );

  if (inline) return panel;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-modal-scrim/50 p-32">
      {panel}
    </div>
  );
}