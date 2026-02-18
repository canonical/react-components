import React, { HTMLProps, ReactNode } from "react";

import { PropsWithSpread, SortDirection } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * The content of the table header.
     */
    children?: ReactNode;
    /**
     * The direction of sorting, if applicable.
     */
    sort?: SortDirection;
    /** Function to call when the sort button is clicked. */
    onSort?: () => void;
  },
  HTMLProps<HTMLTableHeaderCellElement>
>;

const TableHeader = ({
  children,
  sort,
  onSort,
  ...props
}: Props): React.JSX.Element => {
  const headerContents = () =>
    sort && onSort ? (
      <button className="p-table__sort-button" onClick={onSort}>
        {children}
      </button>
    ) : (
      children
    );

  return (
    <th role="columnheader" aria-sort={sort} {...props}>
      {headerContents()}
    </th>
  );
};

export default TableHeader;
