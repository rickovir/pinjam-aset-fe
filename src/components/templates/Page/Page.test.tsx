import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/atoms/Button";
import { Page, Panel } from "./Page";

describe("Page", () => {
  it("pairs the heading with an optional supporting line", () => {
    render(
      <Page title="Equipment catalogue" description="Browse and request assets.">
        <p>Body</p>
      </Page>,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Equipment catalogue" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Browse and request assets.")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("holds trailing actions beside the heading", () => {
    render(
      <Page title="Inventory" actions={<Button>New asset</Button>}>
        <p>Body</p>
      </Page>,
    );
    expect(screen.getByRole("button", { name: "New asset" })).toBeInTheDocument();
  });
});

describe("Panel", () => {
  it("titles its section and keeps actions opposite", () => {
    render(
      <Panel title="Borrower" actions={<Button variant="tertiary">Edit</Button>}>
        <p>Ayu Pratama</p>
      </Panel>,
    );
    expect(screen.getByRole("heading", { level: 3, name: "Borrower" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByText("Ayu Pratama")).toBeInTheDocument();
  });

  it("hosts actions without a title", () => {
    render(
      <Panel actions={<Button variant="tertiary">Export</Button>}>
        <p>Content</p>
      </Panel>,
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
  });

  it("renders bare when untitled", () => {
    render(<Panel>Just content</Panel>);
    expect(screen.getByText("Just content")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
