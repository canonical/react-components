import classNames from "classnames";
import PropTypes from "prop-types";
import React, { HTMLProps, ReactNode } from "react";

export type Props = {
  children?: ReactNode;
  className?: string;
  /**
   * @defaultValue false
   */
  hasOverflow?: boolean;
  /**
   * @defaultValue false
   */
  expanding?: boolean;
  /**
   * @defaultValue false
   */
  hidden?: boolean;
  /**
   * @defaultValue gridcell
   */
  role?: string;
} & HTMLProps<HTMLTableCellElement>;

/**
 * TableCell
 *
 * @remarks
 * Implementation of TableCell for Table
 * https://vanillaframework.io/docs/base/tables
 *
 * @param children
 * @param className
 * @param expanding - enable expanding and hidden table cells
 * @param hidden - whether cell displays
 * @param role - aria role
 * @returns TableCell
 */
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
