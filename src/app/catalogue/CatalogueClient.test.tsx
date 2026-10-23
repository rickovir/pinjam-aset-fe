import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CatalogueClient } from "./CatalogueClient";

describe("CatalogueClient", () => {
  it("lists every fixture and counts it", () => {
    render(<CatalogueClient />);
    expect(screen.getByRole("heading", { name: "Browse equipment" })).toBeInTheDocument();
    expect(screen.getByText("6 items · sorted by availability")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("narrows by search across name and asset id", async () => {
    const user = userEvent.setup();
    render(<CatalogueClient />);
    await user.type(screen.getByLabelText("Search"), "AST-0207");
    expect(screen.getByText("1 item · sorted by availability")).toBeInTheDocument();
    expect(screen.getByText("Sony A7 IV Camera")).toBeInTheDocument();
  });

  it("filters by category through the selects", async () => {
    const user = userEvent.setup();
    render(<CatalogueClient />);
    await user.selectOptions(screen.getByLabelText("Category"), "Laptop");
    expect(screen.getByText("2 items · sorted by availability")).toBeInTheDocument();
    // Active filter chip appears once the select is set.
    expect(screen.getByRole("button", { name: "Laptop" })).toHaveAttribute("aria-pressed", "true");
  });

  it("drops any filter when its chip is removed", async () => {
    const user = userEvent.setup();
    render(<CatalogueClient />);
    await user.selectOptions(screen.getByLabelText("Category"), "Laptop");
    await user.selectOptions(screen.getByLabelText("Office"), "Jakarta");
    await user.selectOptions(screen.getByLabelText("Availability"), "Available");
    await user.click(screen.getByRole("button", { name: "Laptop" }).querySelector("span")!);
    await user.click(screen.getByRole("button", { name: "Jakarta" }).querySelector("span")!);
    await user.click(screen.getByRole("button", { name: "Available" }).querySelector("span")!);
    expect(screen.getByText("6 items · sorted by availability")).toBeInTheDocument();
  });

  it("confirms a request with the success alert", async () => {
    const user = userEvent.setup();
    render(<CatalogueClient />);
    await user.click(screen.getAllByRole("button", { name: "Request loan" })[0]);
    expect(screen.getByText("Request submitted")).toBeInTheDocument();
    expect(screen.getByText(/AST-\d+ is now waiting for manager approval/)).toBeInTheDocument();
  });

  it("does not double-count a repeated request", async () => {
    const user = userEvent.setup();
    render(<CatalogueClient />);
    const first = screen.getAllByRole("button", { name: "Request loan" })[0];
    await user.click(first);
    await user.click(first);
    expect(screen.getByText(/AST-\d+ is now waiting/)).toBeInTheDocument();
    expect(screen.queryByText(/2 requests are now waiting/)).not.toBeInTheDocument();
  });

  it("pluralises the alert for multiple requests", async () => {
    const user = userEvent.setup();
    render(<CatalogueClient />);
    const ctas = screen.getAllByRole("button", { name: "Request loan" });
    await user.click(ctas[0]);
    await user.click(ctas[1]);
    expect(
      screen.getByText("2 requests are now waiting for manager approval."),
    ).toBeInTheDocument();
  });

  it("clears every filter with Clear all", async () => {
    const user = userEvent.setup();
    render(<CatalogueClient />);
    await user.selectOptions(screen.getByLabelText("Office"), "Jakarta");
    await user.selectOptions(screen.getByLabelText("Availability"), "Available");
    await user.click(screen.getByRole("button", { name: "Clear all" }));
    expect(screen.getByText("6 items · sorted by availability")).toBeInTheDocument();
  });

  it("explains itself when nothing matches", async () => {
    const user = userEvent.setup();
    render(<CatalogueClient />);
    await user.type(screen.getByLabelText("Search"), "hologram");
    expect(
      screen.getByText("No equipment matches these filters"),
    ).toBeInTheDocument();
  });
});
