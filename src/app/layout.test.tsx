import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// next/font needs the Next build pipeline; stub the style hook it returns.
vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
}));

import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders the document shell around the app tree", () => {
    render(
      <RootLayout params={Promise.resolve({})}>
        <p>App tree</p>
      </RootLayout>,
    );
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByText("App tree")).toBeInTheDocument();
  });
});
