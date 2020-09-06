import classNames from "classnames";
import PropTypes from "prop-types";
import React, { HTMLProps, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  /**
   * @defaultValue false
   */
  expanding?: boolean;
  /**
   * @defaultValue false
   */
  responsive?: boolean;
  /**
   * @defaultValue false
   */
  sortable?: boolean;
} & HTMLProps<HTMLTableElement>;

/**
 * Table
 *
 * @remarks
 * Implementation of Table
 * https://vanillaframework.io/docs/base/tables
 *
 * @param children
 * @param className
 * @param expanding - enable expanding and hidden table cells
 * @param responsive - provide responsive card view on smaller screens
 * @param sortable - enable sorting of table columns
 * @returns Table component
 */
const Table = ({
  children,
  className,
  expanding = false,
  responsive = false,
  sortable = false,
  ...props
}: Props): JSX.Element => (
  <table
    role="grid"
    className={classNames(className, {
      "p-table--mobile-card": responsive,
      "p-table--sortable": sortable,
      "p-table-expanding": expanding,
    })}
    {...props}
  >
    {children}
  </table>
);

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  expanding: PropTypes.bool,
  responsive: PropTypes.bool,
  sortable: PropTypes.bool,
};

export default Table;
