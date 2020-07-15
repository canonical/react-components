import classNames from "classnames";
import PropTypes from "prop-types";
import React, { HTMLAttributes } from "react";
import type { ReactNode } from "react";

export type Props = {
  children?: ReactNode;
  className?: string;
  expanding?: boolean;
  responsive?: boolean;
  sortable?: boolean;
} & HTMLAttributes<HTMLTableElement>;

const Table = ({
  children,
  className,
  expanding = false,
  responsive = false,
  sortable = false,
  ...tableProps
}: Props): JSX.Element => (
  <table
    role="grid"
    className={classNames(className, {
      "p-table--mobile-card": responsive,
      "p-table--sortable": sortable,
      "p-table-expanding": expanding,
    })}
    {...tableProps}
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
