"use client";

import { useMemo, useState } from "react";

import { Alert } from "@/components/molecules/Alert";
import { AssetCard } from "@/components/molecules/AssetCard";
import { Button } from "@/components/atoms/Button";
import { FilterChip } from "@/components/atoms/FilterChip";
import { Input } from "@/components/atoms/Input";
import { assets, categories, locations } from "@/lib/fixtures";

/**
 * Employee / Equipment Catalogue (Figma 105:116).
 *
 * Content column, 32px padding, 24px gaps:
 *   Page header → Filter bar (search + 3 selects) → Active filter chips →
 *   count line → 3-column card grid.
 */

const sortLabel = "sorted by availability";

export function CatalogueClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [requested, setRequested] = useState<string[]>([]);

  const activeChips = [
    category && { key: "category", label: category },
    location && { key: "location", label: location },
    status && { key: "status", label: status },
  ].filter(Boolean) as { key: string; label: string }[];

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets.filter((a) => {
      const haystack = `${a.name} ${a.category} ${a.location} ${a.id} ${a.condition}`;
      if (q && !haystack.toLowerCase().includes(q)) {
        return false;
      }
      if (category && a.category !== category) return false;
      if (location && a.location !== location) return false;
      if (status && a.status !== status) return false;
      return true;
    });
  }, [query, category, location, status]);

  function clearAll() {
    setCategory("");
    setLocation("");
    setStatus("");
  }

  function removeChip(key: string) {
    if (key === "category") setCategory("");
    if (key === "location") setLocation("");
    if (key === "status") setStatus("");
  }

  return (
    <div className="flex flex-col gap-24">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold">Browse equipment</h2>
        <p className="text-sm text-text-secondary">
          Check availability first, then request a loan. Maximum loan period is
          14 days.
        </p>
      </div>

      {requested.length > 0 ? (
        <Alert type="success" title="Request submitted">
          {requested.length === 1
            ? `${requested[0]} is now waiting for manager approval.`
            : `${requested.length} requests are now waiting for manager approval.`}
        </Alert>
      ) : null}

      <div className="flex flex-wrap items-end gap-16">
        <Input
          type="search"
          label="Search"
          placeholder="Search by name or asset ID"
          className="w-360"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          label="Office"
          value={location}
          onChange={setLocation}
          options={locations}
        />
        <Select
          label="Category"
          value={category}
          onChange={setCategory}
          options={categories}
        />
        <Select
          label="Availability"
          value={status}
          onChange={setStatus}
          options={["Available", "On Loan", "Under repair", "Retired"]}
        />
      </div>

      {activeChips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-8">
          <span className="text-sm text-text-secondary">Active filters:</span>
          {activeChips.map((chip) => (
            <FilterChip
              key={chip.key}
              selected
              onRemove={() => removeChip(chip.key)}
            >
              {chip.label}
            </FilterChip>
          ))}
          <Button variant="tertiary" onClick={clearAll}>
            Clear all
          </Button>
        </div>
      ) : null}

      <p className="text-sm text-text-secondary">
        {visible.length} item{visible.length === 1 ? "" : "s"} · {sortLabel}
      </p>

      {visible.length === 0 ? (
        <Alert type="info" title="No equipment matches these filters">
          Try clearing a filter or searching for something else.
        </Alert>
      ) : (
        <div className="grid w-full grid-cols-3 gap-24">
          {visible.map((a) => (
            <AssetCard
              key={a.id}
              name={a.name}
              category={a.category}
              location={a.location}
              meta={`${a.id} · ${a.condition}`}
              value={a.value}
              availability={a.availability}
              status={a.status}
              icon={a.icon}
              onRequest={() =>
                setRequested((prev) =>
                  prev.includes(a.id) ? prev : [...prev, a.id],
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="flex w-200 flex-col gap-6">
      <span className="text-sm font-semibold text-input-label">{label}</span>
      <span className="flex h-40 items-center rounded-input bg-input-bg px-12 ring-1 ring-input-border focus-within:ring-2 focus-within:ring-input-border-focus">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 appearance-none bg-transparent text-sm text-input-text outline-none"
        >
          <option value="">All</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}