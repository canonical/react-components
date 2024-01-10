import React, {
  ChangeEvent,
  Children,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  RefObject,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { usePagination } from "hooks";
import Select from "components/Select";
import TablePaginationControls from "./TablePaginationControls";
import "./TablePagination.scss";

/**
 * Determine if we are working with a small screen.
 * 'small screen' in this case is relative to the width of the description div
 */
const figureSmallScreen = (descriptionRef: RefObject<HTMLDivElement>) => {
  const descriptionElement = descriptionRef.current;
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
 */
const renderChildren = (
  children: ReactNode,
  dataForwardProp: string,
  data: unknown[]
) => {
  return Children.map(children, (child) => {
    return cloneElement(child as ReactElement, {
      [dataForwardProp]: data,
    });
  });
};

const DEFAULT_PAGE_LIMITS = [50, 100, 200];
const generatePagingOptions = (pageLimits: number[]) => {
  return pageLimits.map((limit) => ({ value: limit, label: `${limit}/page` }));
};

export type Props = PropsWithChildren<{
  /**
   * list of data elements to be paginated. This component is un-opinionated about
   * the structure of the data but it should be identical to the data structure
   * reuiqred by the child table component
   */
  data: unknown[];
  /**
   * prop name of the child table component that receives paginated data.
   * default value is set to @constant rows, which is the data prop for the @func MainTable component
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
}> &
  HTMLAttributes<HTMLDivElement>;

const TablePagination = ({
  data,
  className,
  itemName = "item",
  description,
  position = "above",
  dataForwardProp = "rows",
  pageLimits = DEFAULT_PAGE_LIMITS,
  children,
  ...divProps
}: Props) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setSmallScreen] = useState(false);
  const [pageSize, setPageSize] = useState(() => {
    return generatePagingOptions(pageLimits)[0].value;
  });
  const { paginate, currentPage, pageData, totalItems } = usePagination(data, {
    itemsPerPage: pageSize,
    autoResetPage: true,
  });

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(figureSmallScreen(descriptionRef));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmallScreen]);

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    paginate(1);
    setPageSize(parseInt(e.target.value));
  };

  const getDescription = () => {
    if (description) {
      return description;
    }

    const visibleCount = pageData.length;

    if (isSmallScreen) {
      return `${visibleCount} out of ${totalItems}`;
    }

    if (visibleCount === totalItems && visibleCount > 1) {
      return `Showing all ${totalItems} ${itemName}s`;
    }

    return `Showing ${visibleCount} out of ${totalItems} ${itemName}${
      totalItems !== 1 ? "s" : ""
    }`;
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const clonedChildren = renderChildren(children, dataForwardProp, pageData);
  return (
    <>
      {position === "below" && clonedChildren}
      <div
        className={classnames("pagination", className)}
        {...divProps}
        role="navigation"
      >
        <div className="description" ref={descriptionRef}>
          {getDescription()}
        </div>
        <TablePaginationControls
          onPageChange={paginate}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <Select
          className="items-per-page"
          label="Items per page"
          labelClassName="u-off-screen"
          id="itemsPerPage"
          options={generatePagingOptions(pageLimits)}
          onChange={handlePageSizeChange}
          value={pageSize}
        />
      </div>
      {position === "above" && clonedChildren}
    </>
  );
};

export default TablePagination;
