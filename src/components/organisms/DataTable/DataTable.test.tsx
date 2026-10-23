import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { loans } from "@/lib/fixtures";
import { DataTable, type Column } from "./DataTable";

type Loan = (typeof loans)[number];

const columns: Column<Loan>[] = [
  { key: "id", header: "Request", render: (row) => row.id },
  { key: "asset", header: "Asset", width: 2, render: (row) => row.asset },
  { key: "status", header: "Status", render: (row) => row.status },
];

describe("DataTable", () => {
  it("lays out headers and every row", () => {
    render(<DataTable columns={columns} rows={loans} rowKey={(row) => row.id} />);
    const table = screen.getByRole("table");
    for (const header of ["Request", "Asset", "Status"]) {
      expect(within(table).getByRole("columnheader", { name: header })).toBeInTheDocument();
    }
    for (const loan of loans) {
      expect(within(table).getByText(loan.id)).toBeInTheDocument();
    }
  });

  it("shows the empty message when there are no rows", () => {
    render(
      <DataTable
        columns={columns}
        rows={[]}
        rowKey={(row) => row.id}
        emptyMessage="No requests yet"
      />,
    );
    expect(screen.getByText("No requests yet")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("calls onRowClick with the clicked row", async () => {
    const onRowClick = vi.fn();
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        rows={loans}
        rowKey={(row) => row.id}
        onRowClick={onRowClick}
      />,
    );
    await user.click(screen.getByText("REQ-0231"));
    expect(onRowClick).toHaveBeenCalledWith(expect.objectContaining({ id: "REQ-0231" }));
  });

  it("does not make rows clickable without onRowClick", () => {
    render(<DataTable columns={columns} rows={loans} rowKey={(row) => row.id} />);
    expect(screen.getByText("REQ-0231").closest("tr")).not.toHaveClass("cursor-pointer");
  });
});
