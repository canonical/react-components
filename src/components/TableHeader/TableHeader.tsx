import React, { HTMLProps, ReactNode } from "react";

import { PropsWithSpread, SortDirection } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * The content of the table header.
     */
    children?: ReactNode;
    /**
     * Auxiliary content of the table header. This content will not be part of the sortable button applied to the table header if the header is sortable. This is useful for adding additional information to the header that should not be part of the sorting button, such as a tooltip or an icon.
     */
    auxiliaryContent?: ReactNode;
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
  auxiliaryContent,
  ...props
}: Props): React.JSX.Element => {
  const headerContents = () =>
    sort && onSort ? (
      <>
        <button className="p-table__sort-button" onClick={onSort}>
          {children}
        </button>
        {auxiliaryContent}
      </>
    ) : (
      <>
        {children}
        {auxiliaryContent}
      </>
    );

  return (
    <th role="columnheader" aria-sort={sort} {...props}>
      {headerContents()}
    </th>
  );
};

export default TableHeader;
