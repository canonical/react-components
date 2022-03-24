import { useMemo, useEffect, useState } from "react";

/**
 * A hook that handles pagination.
 * @param data The data array to paginate.
 * @param itemsPerPage Number of items per page.
 */
export function usePagination<D>(
  data: Array<D>,
  {
    itemsPerPage,
    initialPage,
  }: { itemsPerPage?: number; initialPage?: number } = {}
): {
  pageData: Array<D>;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  itemsPerPage: number;
  totalItems: number;
} {
  const totalItems = data.length;
  const initialPageIndex = initialPage > 0 ? initialPage - 1 : 0;
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const startIndex = pageIndex * itemsPerPage;
  const paginate = (pageNumber: number) => setPageIndex(pageNumber - 1);

  useEffect(() => {
    // go to the last available page if the current page is out of bounds
    if (startIndex >= totalItems) {
      Math.floor(totalItems / itemsPerPage) > 0
        ? setPageIndex(Math.floor(totalItems / itemsPerPage) - 1)
        : setPageIndex(0);
    }
  }, [pageIndex, startIndex, setPageIndex, totalItems, itemsPerPage]);

  const pageData = useMemo(
    () => data?.slice(startIndex, startIndex + itemsPerPage),
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
