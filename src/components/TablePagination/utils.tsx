import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react";
import MainTable from "../MainTable";
import type {
  MainTableHeader,
  MainTableRow,
  Props as MainTableProps,
} from "../MainTable/MainTable";
import { useSortTableData } from "hooks";

export type SortProps = Pick<
  MainTableProps,
  "defaultSort" | "defaultSortDirection" | "onUpdateSort"
>;

/** Whether a child is a MainTable element. */
export const isMainTable = (
  child: ReactNode,
): child is ReactElement<MainTableProps> =>
  isValidElement(child) && child.type === MainTable;

/**
 * Determine if we are working with a small screen.
 * 'small screen' in this case is relative to the width of the description div
 */
export const figureSmallScreen = () => {
  const descriptionElement = document.getElementById("pagination-description");
  if (!descriptionElement) {
    return true;
  }
  return descriptionElement.getBoundingClientRect().width < 230;
};

/**
 * Iterate direct react child components and override the value of the prop specified by @param dataForwardProp
 * for those child components.
 * @param children - react node children to iterate
 * @param dataForwardProp - the name of the prop from the children components to override
 * @param data - actual data to be passed to the prop specified by @param dataForwardProp
 * @param sortProps - sort props to override on MainTable children only
 */
export const renderChildren = (
  children: ReactNode,
  dataForwardProp: string,
  data: unknown[],
  sortProps: SortProps = {},
) => {
  return Children.map(children, (child) => {
    return cloneElement(child as React.JSX.Element, {
      ...(isMainTable(child) ? sortProps : {}),
      [dataForwardProp]: data,
    });
  });
};

export const DEFAULT_PAGE_LIMITS = [50, 100, 200];
export const generatePagingOptions = (pageLimits: number[]) => {
  return pageLimits.map((limit) => ({ value: limit, label: `${limit}/page` }));
};

export const getDescription = ({
  description,
  isSmallScreen,
  totalItems,
  itemName,
  visibleCount,
  currentPage,
}: {
  description: ReactNode;
  isSmallScreen: boolean;
  totalItems: number;
  itemName: string;
  visibleCount: number;
  currentPage: number;
}) => {
  if (description) {
    return description;
  }
  let closing = "";
  if (typeof totalItems === "number") {
    closing = ` out of ${totalItems}`;
  } else if (currentPage !== 1) {
    closing = ` of more than ${visibleCount}`;
  }

  if (isSmallScreen) {
    return `${visibleCount}${closing}`;
  }

  if (visibleCount === totalItems && visibleCount > 1) {
    return `Showing all ${totalItems} ${itemName}s`;
  }

  return `Showing ${visibleCount}${closing} ${itemName}${
    totalItems !== 1 ? "s" : ""
  }`;
};

export const useFigureSmallScreen = () => {
  const [isSmallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(figureSmallScreen());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSmallScreen;
};

/**
 * A sortable MainTable only sorts the rows it receives, so sort the whole data
 * set before it is paginated. Returns the rows to paginate and the props that
 * keep the MainTable child's headers in sync with that sort.
 * @param children - The TablePagination children, searched for a MainTable.
 * @param data - The full data set.
 * @param enabled - Whether this component owns the data and may sort it.
 */
export const useSortedTable = (
  children: ReactNode,
  data: unknown[],
  enabled: boolean,
): { rows: unknown[]; sortProps: SortProps } => {
  const table = Children.toArray(children).find(isMainTable);
  const sortable = enabled && !!table?.props.sortable;
  const sorted = useSortTableData({
    rows: data as MainTableRow[],
    defaultSort: table?.props.defaultSort,
    defaultSortDirection: table?.props.defaultSortDirection,
    sortFunction: table?.props.sortFunction,
  });
  if (!sortable) {
    return { rows: data, sortProps: {} };
  }
  return {
    rows: sorted.rows,
    sortProps: {
      defaultSort: sorted.sortKey,
      defaultSortDirection: sorted.sortDirection,
      onUpdateSort: (sortKey: MainTableHeader["sortKey"]) => {
        sorted.updateSort(sortKey);
        table?.props.onUpdateSort?.(sortKey);
      },
    },
  };
};
