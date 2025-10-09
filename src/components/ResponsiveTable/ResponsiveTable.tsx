import ModularTable, { ModularTableProps } from "components/ModularTable";
import type { JSX } from "react";
import React from "react";

export interface ResponsiveTableProps<
  Row extends Record<string, unknown> = Record<string, unknown>,
> extends ModularTableProps<Row> {
  /**
   * The minimum width of the table in pixels.
   */
  readonly minWidth?: number;
}

/**
 * This table includes a minimum width, and enables horizontal scrolling for smaller screens.
 */
export default function ResponsiveTable<
  Row extends Record<string, unknown> = Record<string, unknown>,
>({
  ref,
  style,
  minWidth = 1024,
  ...tableProps
}: ResponsiveTableProps<Row>): JSX.Element {
  return (
    <div className="responsive-table" style={style}>
      <ModularTable ref={ref} style={{ minWidth }} {...tableProps} />
    </div>
  );
}
