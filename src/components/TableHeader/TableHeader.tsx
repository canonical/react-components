import PropTypes from "prop-types";
import React, { HTMLProps, ReactNode } from "react";

import { SortDirection } from "types";

export type Props = {
  children?: ReactNode;
  /**
   * @defaultValue none
   */
  sort?: SortDirection;
} & HTMLProps<HTMLTableHeaderCellElement>;

/**
 * TableHeader
 *
 * @remarks
 * Implementation of TableHeader for Table
 * https://vanillaframework.io/docs/base/tables
 *
 * @param children
 * @param sort - sort direction
 * @returns TableHeader
 */
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
