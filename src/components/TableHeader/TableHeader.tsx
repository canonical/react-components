import PropTypes from "prop-types";
import React, { HTMLProps, ReactNode } from "react";

import { SortDirection } from "types";

export type Props = {
  /**
   * The content of the table header.
   */
  children?: ReactNode;
  /**
   * The direction of sorting, if applicable.
   */
  sort?: SortDirection;
} & HTMLProps<HTMLTableHeaderCellElement>;

const TableHeader = ({ children, sort, ...props }: Props): JSX.Element => {
  return (
    <th role="columnheader" aria-sort={sort} {...props}>
      {children}
    </th>
  );
};

TableHeader.propTypes = {
  sort: PropTypes.oneOf(["none", "ascending", "descending"]),
};

export default TableHeader;
