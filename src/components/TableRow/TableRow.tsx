import type { HTMLProps, ReactNode } from "react";
import React from "react";

import type { PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * The content of the table row.
     */
    children: ReactNode;
  },
  HTMLProps<HTMLTableRowElement>
>;

const TableRow = ({ children, ...trProps }: Props): JSX.Element => (
  <tr role="row" {...trProps}>
    {children}
  </tr>
);

export default TableRow;
