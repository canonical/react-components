import PropTypes from "prop-types";
import React, { HTMLAttributes } from "react";
import type { ReactNode, MouseEvent } from "react";
import type { SortDirection } from "types";

export type Props = {
  children?: ReactNode;
  className?: string;
  sort?: SortDirection;
  onClick?: (evt: MouseEvent) => void;
} & HTMLAttributes<HTMLTableHeaderCellElement>;

const TableHeader = ({
  children,
  className,
  sort,
  onClick,
  ...thProps
}: Props): JSX.Element => {
  return (
    <th role="columnheader" aria-sort={sort} {...thProps}>
      {children}
    </th>
  );
};

TableHeader.propTypes = {
  sort: PropTypes.oneOf(["none", "ascending", "descending"]),
};

export default TableHeader;
