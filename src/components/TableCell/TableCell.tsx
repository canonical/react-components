import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps, ReactNode } from "react";

export type Props = {
  children?: ReactNode;
  className?: string;
  expanding?: boolean;
  hidden?: boolean;
  role?: string;
} & HTMLProps<HTMLTableCellElement>;

const TableCell = ({
  children,
  className,
  expanding,
  hidden,
  role = "gridcell",
  ...tdProps
}: Props): JSX.Element => (
  <td
    role={role}
    aria-hidden={hidden}
    className={classNames(className, {
      "p-table-expanding__panel": expanding,
    })}
    {...tdProps}
  >
    {children}
  </td>
);

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  expanding: PropTypes.bool,
  hidden: PropTypes.bool,
  role: PropTypes.string,
};

export default TableCell;
