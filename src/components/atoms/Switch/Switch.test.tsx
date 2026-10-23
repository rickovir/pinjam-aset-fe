import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Switch } from "./Switch";

describe("Switch", () => {
  it("exposes itself as a labelled switch", () => {
    render(<Switch label="Email alerts" />);
    const control = screen.getByRole("switch", { name: "Email alerts" });
    expect(control).not.toBeChecked();
  });

  it("starts on with defaultOn", () => {
    render(<Switch label="Email alerts" defaultOn />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Switch label="Email alerts" />);
    const control = screen.getByRole("switch");
    await user.click(control);
    expect(control).toBeChecked();
    await user.click(control);
    expect(control).not.toBeChecked();
  });

  it("greys the track when disabled and off", () => {
    render(<Switch label="Email alerts" disabled />);
    const control = screen.getByRole("switch", { name: "Email alerts" });
    expect(control).not.toBeChecked();
    expect(control).toBeDisabled();
  });

  it("stays put when disabled", async () => {
    const user = userEvent.setup();
    render(<Switch label="Email alerts" disabled defaultOn />);
    const control = screen.getByRole("switch");
    await user.click(control);
    expect(control).toBeChecked();
    expect(control).toBeDisabled();
  });
});
