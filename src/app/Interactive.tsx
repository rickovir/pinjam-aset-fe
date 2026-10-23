"use client";

import { useState } from "react";

import {
  Checkbox,
  FilterChip,
  IconButton,
  Switch,
  Tab,
  TabList,
  Toast,
} from "@/components";

/**
 * Client-only island for the Phase 2 proof sheet. Everything here takes an
 * event handler, so it cannot live in the Server Component tree.
 */
export function InteractiveShowcase() {
  const [tab, setTab] = useState("pending");
  const [toast, setToast] = useState(true);
  const [chips, setChips] = useState(["Jakarta"]);

  const toggle = (label: string) =>
    setChips((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label],
    );

  return (
    <div className="flex flex-col gap-24">
      <div className="flex flex-wrap items-center gap-8">
        {["Jakarta", "Bandung", "Surabaya"].map((city) => (
          <FilterChip
            key={city}
            selected={chips.includes(city)}
            onRemove={() => toggle(city)}
            onClick={() => toggle(city)}
          >
            {city}
          </FilterChip>
        ))}
      </div>

      <TabList>
        {(
          [
            ["pending", "Pending", 2],
            ["approved", "Approved", 5],
            ["all", "All", 9],
          ] as const
        ).map(([key, label, count]) => (
          <Tab
            key={key}
            active={tab === key}
            count={count}
            onClick={() => setTab(key)}
          >
            {label}
          </Tab>
        ))}
      </TabList>

      <div className="flex flex-wrap items-center gap-32">
        <Checkbox label="Option label" defaultChecked />
        <Checkbox label="Option label" />
        <Checkbox label="Option label" disabled />
        <Switch label="Notifications off" />
        <Switch label="Notifications on" defaultOn />
      </div>

      <div className="flex flex-wrap items-center gap-12">
        <IconButton icon="more" label="More actions" variant="ghost" />
        <button
          type="button"
          onClick={() => setToast((t) => !t)}
          className="text-sm font-semibold text-text-brand underline"
        >
          Toggle toast
        </button>
      </div>

      {toast ? (
        <Toast
          type="success"
          title="Request submitted"
          onDismiss={() => setToast(false)}
        >
          REQ-0231 is now waiting for manager approval.
        </Toast>
      ) : null}
    </div>
  );
}