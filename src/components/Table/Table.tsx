import classNames from "classnames";
import React, { HTMLProps, ReactNode } from "react";

import type { ClassName, PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * The content of the table.
     */
    children?: ReactNode;
    /**
     * Optional class(es) to pass to the wrapping table element.
     */
    className?: ClassName;
    /**
     * Whether the table can expand hidden cells.
     */
    expanding?: boolean;
    /**
     * Whether the table should show card styling on smaller screens.
     */
    responsive?: boolean;
  },
  HTMLProps<HTMLTableElement>
>;

const Table = ({
  children,
  className,
  expanding = false,
  responsive = false,
  ...props
}: Props): JSX.Element => (
  <table
    role="grid"
    className={classNames(className, {
      "p-table--mobile-card": responsive,
      "p-table--expanding": expanding,
    })}
    {...props}
  >
    {children}
  </table>
);

export default Table;
