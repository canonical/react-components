import PropTypes from "prop-types";
import type { HTMLProps, ReactNode } from "react";
import React from "react";

type Props = {
  children: ReactNode;
} & HTMLProps<HTMLTableRowElement>;

/**
 * TableRow
 *
 * @remarks
 * Implementation of TableRow for Table
 * https://vanillaframework.io/docs/base/tables
 *
 * @param children
 * @returns TableRow
 */
const TableRow = ({ children, ...trProps }: Props): JSX.Element => (
  <tr role="row" {...trProps}>
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
};

export default TableRow;
