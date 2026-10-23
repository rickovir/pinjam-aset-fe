import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AssetCard } from "./AssetCard";

const card = {
  name: 'MacBook Pro 14"',
  category: "Laptop",
  location: "Jakarta",
  meta: "AST-0142 · Good condition",
  value: "Rp 15.000.000",
  availability: "Available 22 Oct – 5 Nov",
};

describe("AssetCard", () => {
  it("lists the asset's key details", () => {
    render(<AssetCard {...card} status="Available" />);
    expect(screen.getByText('MacBook Pro 14"')).toBeInTheDocument();
    expect(screen.getByText("Laptop · Jakarta")).toBeInTheDocument();
    expect(screen.getByText("AST-0142 · Good condition")).toBeInTheDocument();
    expect(screen.getByText("Rp 15.000.000")).toBeInTheDocument();
    expect(screen.getByText("Available 22 Oct – 5 Nov")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("renders without a location or replacement value", () => {
    render(
      <AssetCard {...card} location={undefined} value={undefined} status="Available" />,
    );
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.queryByText(/· Jakarta/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Rp /)).not.toBeInTheDocument();
  });

  it("offers a working request CTA while the asset is available", async () => {
    const onRequest = vi.fn();
    const user = userEvent.setup();
    render(<AssetCard {...card} status="Available" onRequest={onRequest} />);
    await user.click(screen.getByRole("button", { name: "Request loan" }));
    expect(onRequest).toHaveBeenCalledOnce();
  });

  it("locks the CTA when the asset is not available", async () => {
    const onRequest = vi.fn();
    const user = userEvent.setup();
    render(
      <AssetCard
        {...card}
        status="On Loan"
        availability="Back on 28 Oct"
        onRequest={onRequest}
      />,
    );
    const cta = screen.getByRole("button", { name: "Unavailable" });
    expect(cta).toBeDisabled();
    await user.click(cta);
    expect(onRequest).not.toHaveBeenCalled();
  });
});
