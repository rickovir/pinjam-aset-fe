import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("ties the label to the text field", () => {
    render(<Input label="Asset name" />);
    const field = screen.getByLabelText("Asset name");
    expect(field).toBeInstanceOf(HTMLInputElement);
    expect(field).toHaveAttribute("type", "text");
  });

  it("falls back to the design's placeholder when none is given", () => {
    render(<Input label="Query" />);
    expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
  });

  it("shows the helper line under the field", () => {
    render(<Input label="Query" helper="Try an asset tag, e.g. AST-0142" />);
    expect(screen.getByText("Try an asset tag, e.g. AST-0142")).toBeInTheDocument();
  });

  it("forwards typed input", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input label="Query" onChange={onChange} />);
    const field = screen.getByLabelText("Query");
    await user.type(field, "laptop");
    expect(onChange).toHaveBeenCalled();
    expect(field).toHaveValue("laptop");
  });

  it("renders bare without a label or id", () => {
    render(<Input placeholder="Standalone" />);
    const field = screen.getByPlaceholderText("Standalone");
    expect(field).not.toHaveAttribute("id");
    expect(field).toBeInstanceOf(HTMLInputElement);
  });

  it("uses a caller-provided id over the derived one", () => {
    render(<Input id="custom" label="Query" />);
    expect(screen.getByLabelText("Query")).toHaveAttribute("id", "custom");
  });

  it("disables the field in the disabled state", () => {
    render(<Input label="Query" state="disabled" />);
    expect(screen.getByLabelText("Query")).toBeDisabled();
  });

  it("adds the search affordances for type=search", () => {
    const { container } = render(<Input type="search" label="Search" />);
    expect(screen.getByText("/")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders a combobox with a chevron for type=select", () => {
    const { container } = render(
      <Input type="select" label="Category">
        <option value="laptop">Laptop</option>
      </Input>,
    );
    const select = screen.getByRole("combobox");
    expect(select).toBeInstanceOf(HTMLSelectElement);
    expect(screen.getByRole("option", { name: "Laptop" })).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
