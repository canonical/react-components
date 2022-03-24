import { renderHook } from "@testing-library/react-hooks";

import { usePagination } from "./usePagination";

it("returns correct data", () => {
  const { result } = renderHook(() =>
    usePagination([1, 2, 3], { itemsPerPage: 2 })
  );
  const { pageData, currentPage, paginate, itemsPerPage, totalItems } =
    result.current;
  expect(currentPage).toBe(1);
  expect(pageData).toEqual([1, 2]);
  expect(paginate).toBeInstanceOf(Function);
  expect(itemsPerPage).toBe(2);
  expect(totalItems).toBe(3);
});

it("correctly sets the initial page", () => {
  const { result } = renderHook(() =>
    usePagination([1, 2], { itemsPerPage: 1, initialPage: 2 })
  );
  const { pageData, currentPage } = result.current;
  expect(currentPage).toBe(2);
  expect(pageData).toEqual([2]);
});
