import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";
import "./TablePagination.scss";
import TablePaginationControls from "./TablePaginationControls";
import {
  DEFAULT_PAGE_LIMITS,
  generatePagingOptions,
  renderChildren,
} from "./utils";
import { usePagination } from "hooks";

export type BasePaginationProps = {
  /**
   * list of data elements to be paginated. This component is un-opinionated about
   * the structure of the data but it should be identical to the data structure
   * reuiqred by the child table component
   */
  data: unknown[];
  /**
   * prop name of the child table component that receives paginated data.
   * default value is set to `rows`, which is the data prop for the `MainTable` component
   */
  dataForwardProp?: string;
  /**
   * the name of the item associated to each row within the table.
   */
  itemName?: string;
  /**
   * custom styling for the pagination container
   */
  className?: string;
  /**
   * custom description to be displayed by the pagination
   */
  description?: ReactNode;
  /**
   * custom per page limits express as an array of numbers.
   */
  pageLimits?: number[];
  /**
   * place the pagination component above or below the table?
   */
  position?: "above" | "below";
};

export type ExternalControlProps = BasePaginationProps & {
  /**
   * Whether the component will be controlled via external state.
   */
  externallyControlled?: true;
  /**
   * the total number of items available within the data. This prop is only relevant
   * and will be required if `externallyControlled` is set to `true`.
   */
  totalItems: number;
  /**
   * the current page that's showing. This prop is only relevant and will be required
   * if `externallyControlled` is set to `true`.
   */
  currentPage: number;
  /**
   * size per page. This prop is only relevant and will be required if
   * `externallyControlled` is set to `true`.
   */
  pageSize: number;
  /**
   * callback indicating a page change event to the parent component.
   * This prop is only relevant and will be required if `externallyControlled` is set
   * to `true`.
   */
  onPageChange: (page: number) => void;
  /**
   * callback indicating a page size change event to the parent component.
   * This prop is only relevant and will be required if `externallyControlled` is set
   * to `true`.
   */
  onPageSizeChange: (pageSize: number) => void;
};

export type InternalControlProps = BasePaginationProps & {
  /**
   * Whether the component will be controlled via external state.
   */
  externallyControlled?: false;
};

export type Props = PropsWithChildren<
  ExternalControlProps | InternalControlProps
> &
  HTMLAttributes<HTMLDivElement>;

const TablePagination = (props: Props) => {
  const {
    data,
    dataForwardProp = "rows",
    itemName = "item",
    className,
    description,
    pageLimits = DEFAULT_PAGE_LIMITS,
    position = "above",
    externallyControlled,
    children,
    ...divProps
  } = props;

  // Safety check to ensure pageSize is a valid option in
  // pageLimits if the component is externally controlled
  if (externallyControlled) {
    let pageSizeFound = false;
    for (const limit of pageLimits) {
      if (limit === Number(props.pageSize)) {
        pageSizeFound = true;
        break;
      }
    }

    if (!pageSizeFound) {
      throw new Error(
        `pageSize must be a valid option in pageLimits, pageLimits is set to [${pageLimits}]`
      );
    }
  }

  const [internalPageSize, setInternalPageSize] = useState(() => {
    return generatePagingOptions(pageLimits)[0].value;
  });
  const {
    paginate,
    currentPage: internalCurrentPage,
    pageData: internalData,
  } = usePagination(externallyControlled ? [] : data, {
    itemsPerPage: internalPageSize,
    autoResetPage: true,
  });

  const controlData = externallyControlled ? data : internalData;
  const controlPageSize = externallyControlled
    ? props.pageSize
    : internalPageSize;
  const controlTotalItems = externallyControlled
    ? props.totalItems
    : data.length;
  const controlCurrentPage = externallyControlled
    ? props.currentPage
    : internalCurrentPage;

  const handlePageChange = (page: number) => {
    if (externallyControlled) {
      props.onPageChange(page);
      return;
    }

    paginate(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    if (externallyControlled) {
      props.onPageSizeChange(pageSize);
      return;
    }

    paginate(1);
    setInternalPageSize(pageSize);
  };

  const clonedChildren = renderChildren(children, dataForwardProp, controlData);
  const controls = (
    <TablePaginationControls
      {...divProps}
      data={controlData}
      className={className}
      itemName={itemName}
      description={description}
      pageLimits={pageLimits}
      totalItems={controlTotalItems}
      currentPage={controlCurrentPage}
      pageSize={controlPageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  );

  return (
    <>
      {position === "above" && controls}
      {clonedChildren}
      {position === "below" && controls}
    </>
  );
};

export default TablePagination;
