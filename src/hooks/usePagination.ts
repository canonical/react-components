import { useMemo, useEffect, useState } from "react";

/**
 * A hook that handles pagination.
 * @param data The data array to paginate.
 * @param itemsPerPage Number of items per page. Returns all items if no value has been provided.
 * @param initialPage?: Initial page number. Defaults to 1.
 * @param autoResetPage Whether to reset the page number to 1 when the data changes.
 */

export function usePagination<D, I = number | null>(
  data: Array<D>,
  options?: {
    itemsPerPage: I;
    initialPage?: number;
    autoResetPage?: boolean;
  }
): {
  pageData: Array<D>;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  itemsPerPage: I;
  totalItems: number;
} {
  const defaultOptions = {
    initialPage: 1,
    autoResetPage: false,
  };
  const { itemsPerPage, initialPage, autoResetPage } = Object.assign(
    defaultOptions,
    options
  );
  const totalItems = data?.length ?? 0;
  const initialPageIndex = initialPage > 0 ? initialPage - 1 : 0;
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const startIndex =
    typeof itemsPerPage === "number" ? pageIndex * itemsPerPage : 0;
  const paginate = (pageNumber: number) => setPageIndex(pageNumber - 1);

  useEffect(() => {
    if (typeof itemsPerPage === "number" && startIndex >= totalItems) {
      !autoResetPage && Math.floor(totalItems / itemsPerPage) > 0
        ? // go to the last available page if the current page is out of bounds
          setPageIndex(Math.floor(totalItems / itemsPerPage) - 1)
        : // go to the initial page if autoResetPage is true
          setPageIndex(0);
    }
  }, [
    pageIndex,
    startIndex,
    setPageIndex,
    totalItems,
    itemsPerPage,
    autoResetPage,
  ]);

  const pageData = useMemo(
    () =>
      typeof itemsPerPage === "number"
        ? data?.slice(startIndex, startIndex + itemsPerPage)
        : data,
    [startIndex, data, itemsPerPage]
  );

  return {
    pageData,
    currentPage: pageIndex + 1,
    paginate,
    itemsPerPage,
    totalItems,
  };
}
