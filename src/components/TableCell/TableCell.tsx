import classNames from "classnames";
import React, { HTMLProps, ReactNode } from "react";

import type { ClassName, PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * The content of the table cell.
     */
    children?: ReactNode;
    /**
     * Optional class(es) to pass to the wrapping td element.
     */
    className?: ClassName;
    /**
     * Whether the cell is an expanded cell.
     */
    expanding?: boolean;
    /**
     * Whether content of the cell should be able to overflow, e.g. a dropdown.
     */
    hasOverflow?: boolean;
    /**
     * Whether the cell is currently hidden.
     */
    hidden?: boolean;
  },
  HTMLProps<HTMLTableCellElement>
>;

const TableCell = ({
  children,
  className,
  hasOverflow = false,
  expanding = false,
  hidden = false,
  role = "gridcell",
  ...props
}: Props): JSX.Element => (
  <td
    role={role}
    aria-hidden={hidden}
    className={classNames(className, {
      "p-table__expanding-panel": expanding,
      "has-overflow": hasOverflow,
    })}
    {...props}
  >
    {children}
  </td>
);

export default TableCell;
