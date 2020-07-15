import PropTypes from "prop-types";
import React, { HTMLAttributes } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLTableRowElement>;

const TableRow = ({ children, ...trProps }: Props): JSX.Element => (
  <tr role="row" {...trProps}>
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
};

export default TableRow;
