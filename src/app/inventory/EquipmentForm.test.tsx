import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { EquipmentForm } from "./EquipmentForm";

describe("EquipmentForm", () => {
  it("validates the empty add form on submit", async () => {
    const user = userEvent.setup();
    render(<EquipmentForm />);
    await user.click(screen.getByRole("button", { name: "Add equipment" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fix the highlighted fields");
    expect(screen.getByText("Asset tag is required.")).toBeInTheDocument();
    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Choose a category.")).toBeInTheDocument();
  });

  it("starts clean before the first submit", () => {
    render(<EquipmentForm />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    // Name/category errors only gate the visual error state, not the helpers.
    expect(screen.queryByText("Asset tag is required.")).not.toBeInTheDocument();
  });

  it("accepts a fully filled add form", async () => {
    const user = userEvent.setup();
    render(<EquipmentForm />);
    await user.type(screen.getByLabelText("Asset tag"), "AST-0100");
    await user.type(screen.getByLabelText("Name"), "Dell Latitude 5440");
    const [category, office] = screen.getAllByRole("combobox");
    await user.selectOptions(category, "Laptop");
    await user.selectOptions(office, "Jakarta");
    await user.click(screen.getByRole("button", { name: "Add equipment" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("counts a single failing field as singular", async () => {
    const user = userEvent.setup();
    render(<EquipmentForm mode="edit" />);
    await user.clear(screen.getByLabelText("Name"));
    await user.click(screen.getByRole("button", { name: "Save changes" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "1 field needs attention",
    );
  });

  it("prefills and accepts a valid edit", async () => {
    const user = userEvent.setup();
    render(<EquipmentForm mode="edit" />);
    expect(screen.getByLabelText("Asset tag")).toHaveValue("AST-0142");
    await user.click(screen.getByRole("button", { name: "Save changes" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("enforces the replacement-value format", async () => {
    const user = userEvent.setup();
    render(<EquipmentForm mode="edit" />);
    await user.clear(screen.getByLabelText("Replacement value"));
    await user.type(screen.getByLabelText("Replacement value"), "15 million");
    expect(screen.getByText("Use the format Rp 15.000.000.")).toBeInTheDocument();
  });

  it("accepts the design's value format", async () => {
    const user = userEvent.setup();
    render(<EquipmentForm mode="edit" />);
    await user.clear(screen.getByLabelText("Replacement value"));
    expect(screen.queryByText("Use the format Rp 15.000.000.")).not.toBeInTheDocument();
  });
});
