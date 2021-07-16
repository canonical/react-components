import classNames from "classnames";
import PropTypes from "prop-types";
import React, { HTMLProps, ReactNode } from "react";

export type Props = {
  /**
   * The content of the table cell.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to pass to the wrapping td element.
   */
  className?: string;
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
} & HTMLProps<HTMLTableCellElement>;

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

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  expanding: PropTypes.bool,
  hidden: PropTypes.bool,
  role: PropTypes.string,
};

export default TableCell;
