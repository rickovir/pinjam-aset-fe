import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders title and message", () => {
    render(
      <Alert type="success" title="Saved">
        The request was updated.
      </Alert>,
    );
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("The request was updated.")).toBeInTheDocument();
  });

  it("announces non-error alerts politely", () => {
    const { rerender } = render(<Alert type="info">Note</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    rerender(<Alert type="success">Note</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    rerender(<Alert type="warning">Note</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders with a title alone", () => {
    render(<Alert type="info" title="Heads up" />);
    expect(screen.getByRole("status")).toHaveTextContent("Heads up");
  });

  it("uses the assertive role for errors", () => {
    render(<Alert type="error">Broken</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
