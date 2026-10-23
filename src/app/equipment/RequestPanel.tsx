"use client";

import { useState } from "react";

import { Alert } from "@/components/molecules/Alert";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { StatusBadge } from "@/components/atoms/StatusBadge";
import type { Asset } from "@/lib/fixtures";

/**
 * Request form for the equipment detail screen. Demonstrates the two blocked
 * states the design calls out: an overdue borrower cannot request, and a loan
 * longer than 14 days fails validation.
 */

const MAX_DAYS = 14;

export function RequestPanel({ asset, hasOverdue }: { asset: Asset; hasOverdue: boolean }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const days =
    start && end
      ? Math.round(
          (new Date(end).getTime() - new Date(start).getTime()) / 86_400_000,
        )
      : null;

  const tooLong = days !== null && days > MAX_DAYS;
  const invalid = tooLong || (days !== null && days <= 0);

  if (hasOverdue) {
    return (
      <Alert type="error" title="You cannot request new equipment yet">
        REQ-0228 (Sony A7 IV Camera) was due back on 14 Oct. Return or renew it
        before raising a new request.
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-24">
      {submitted && !invalid ? (
        <Alert type="success" title="Request submitted">
          {asset.id} is now waiting for manager approval.
        </Alert>
      ) : null}

      <div className="grid grid-cols-2 gap-16">
        <Input
          type="text"
          label="Pick-up date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          state={invalid ? "error" : "default"}
          helper={invalid ? "Choose a valid range" : "Earliest available date"}
        />
        <Input
          type="text"
          label="Return date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          state={tooLong ? "error" : "default"}
          helper={
            tooLong
              ? `Maximum loan period is ${MAX_DAYS} days.`
              : `${MAX_DAYS} days maximum`
          }
        />
      </div>

      <Input
        label="Reason"
        helper="A short note helps your manager decide."
        placeholder="Client workshop onsite"
      />

      <div className="flex items-center justify-between gap-16">
        <StatusBadge status={asset.status} />
        <Button
          variant="primary"
          disabled={asset.status !== "Available" || invalid}
          onClick={() => setSubmitted(true)}
        >
          Submit request
        </Button>
      </div>
    </div>
  );
}