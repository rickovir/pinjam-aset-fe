import type { ReactNode } from "react";

/**
 * Figma: `Table Row` (99:444) — Header 44px / rows 56px, 16px cell padding.
 *
 * The design's reference column widths (130 / 263 / 263 / 150 / 190 / 140) sum
 * to 1136, the content width. Columns stretch to fill rather than holding fixed
 * widths, so this uses a table layout with fractional column sizing.
 */

export interface Column<T> {
  key: string;
  header: string;
  /** Fractional share of the table width. */
  width?: number;
  render: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  emptyMessage = "No records",
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <p className="py-24 text-center text-sm text-text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-hidden rounded-card border border-border-default">
      <table className="w-full border-collapse text-sm">
        <colgroup>
          {columns.map((c) => (
            <col key={c.key} style={{ width: `${(c.width ?? 1) * 100}%` }} />
          ))}
        </colgroup>

        <thead>
          <tr className="bg-table-header-bg">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className="px-16 py-12 text-left text-xs font-semibold text-table-header-text"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-t border-table-border bg-table-row-bg transition-colors ${
                onRowClick ? "cursor-pointer" : ""
              } hover:bg-table-row-hover`}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className="px-16 py-12 align-middle text-text-primary"
                >
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}