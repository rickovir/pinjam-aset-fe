"use client";

import { useState } from "react";

import { Alert } from "@/components/molecules/Alert";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

/**
 * Add / edit equipment form. Renders the validation-error state the design
 * calls out: empty tag, malformed value, and a missing category.
 */

const empty = { tag: "", name: "", category: "", office: "", value: "" };

export function EquipmentForm({ mode = "add" }: { mode?: "add" | "edit" }) {
  const [form, setForm] = useState(
    mode === "edit" ? { ...empty, tag: "AST-0142", name: 'MacBook Pro 14"', category: "Laptop", office: "Jakarta", value: "Rp 15.000.000" } : empty,
  );
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof empty) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const errors: Partial<Record<keyof typeof empty, string>> = {};
  if (submitted || form.tag !== "") {
    if (!form.tag.trim()) errors.tag = "Asset tag is required.";
  }
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.category) errors.category = "Choose a category.";
  if (!form.office) errors.office = "Choose an office.";
  if (form.value && !/^Rp\s[\d.]+$/.test(form.value.trim())) {
    errors.value = "Use the format Rp 15.000.000.";
  }

  const invalid = Object.keys(errors).length > 0;

  return (
    <form
      className="flex flex-col gap-24"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      noValidate
    >
      {submitted && invalid ? (
        <Alert type="error" title="Fix the highlighted fields">
          {Object.keys(errors).length} field
          {Object.keys(errors).length === 1 ? "" : "s"}
          {Object.keys(errors).length === 1 ? " needs" : " need"} attention
          before this asset can be saved.
        </Alert>
      ) : null}

      <div className="grid grid-cols-2 gap-16">
        <Input
          label="Asset tag"
          placeholder="AST-0000"
          value={form.tag}
          onChange={(e) => set("tag")(e.target.value)}
          state={errors.tag ? "error" : "default"}
          helper={errors.tag ?? "Unique across all offices"}
        />
        <Input
          label="Name"
          placeholder="MacBook Pro 14&quot;"
          value={form.name}
          onChange={(e) => set("name")(e.target.value)}
          state={errors.name ? "error" : "default"}
          helper={errors.name}
        />
        <Input
          type="select"
          label="Category"
          value={form.category}
          onChange={(e) => set("category")(e.target.value)}
          state={errors.category ? "error" : "default"}
          helper={errors.category}
        >
          <option value="">Choose a category</option>
          {["Laptop", "Camera", "Projector", "Tablet", "Accessory"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Input>
        <Input
          type="select"
          label="Office"
          value={form.office}
          onChange={(e) => set("office")(e.target.value)}
          state={errors.office ? "error" : "default"}
          helper={errors.office}
        >
          <option value="">Choose an office</option>
          {["Jakarta", "Bandung", "Surabaya"].map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Input>
      </div>

      <Input
        label="Replacement value"
        placeholder="Rp 15.000.000"
        value={form.value}
        onChange={(e) => set("value")(e.target.value)}
        state={errors.value ? "error" : "default"}
        helper={errors.value ?? "Thousands separated by dots"}
      />

      <div className="flex items-center justify-end gap-8">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" type="submit">
          {mode === "edit" ? "Save changes" : "Add equipment"}
        </Button>
      </div>
    </form>
  );
}