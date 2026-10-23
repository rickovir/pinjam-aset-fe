import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Tab, TabList } from "./Tab";

describe("Tab", () => {
  it("flags the active tab via aria-selected", () => {
    const { rerender } = render(<Tab>Pending</Tab>);
    expect(screen.getByRole("tab", { name: /Pending/ }).getAttribute("aria-selected")).toBe("false");
    rerender(<Tab active>Pending</Tab>);
    expect(screen.getByRole("tab", { name: /Pending/ }).getAttribute("aria-selected")).toBe("true");
  });

  it("shows an optional count", () => {
    render(<Tab count={3}>Pending</Tab>);
    expect(screen.getByRole("tab", { name: /Pending/ })).toHaveTextContent("3");
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Tab onClick={onClick}>All</Tab>);
    await user.click(screen.getByRole("tab", { name: /All/ }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("TabList", () => {
  it("wraps tabs in a tablist", () => {
    render(
      <TabList>
        <Tab>All</Tab>
        <Tab active>Pending</Tab>
      </TabList>,
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
  });
});
