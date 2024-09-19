import { renderHook } from "@testing-library/react";

import { usePagination } from "./usePagination";

it("returns correct data", () => {
  const { result } = renderHook(() =>
    usePagination([1, 2, 3], { itemsPerPage: 2 }),
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
    usePagination([1, 2], { itemsPerPage: 1, initialPage: 2 }),
  );
  const { pageData, currentPage } = result.current;
  expect(currentPage).toBe(2);
  expect(pageData).toEqual([2]);
});

it("goes to the last available page if the current page is out of bounds", () => {
  const options = { itemsPerPage: 1, initialPage: 3 };
  const { result, rerender } = renderHook(
    ({ data, options }) => usePagination(data, options),
    {
      initialProps: {
        data: [1, 2, 3],
        options,
      },
    },
  );
  expect(result.current.currentPage).toBe(3);
  expect(result.current.pageData).toEqual([3]);
  rerender({ data: [1, 2], options });
  expect(result.current.currentPage).toBe(2);
  expect(result.current.pageData).toEqual([2]);
});

it("go to the initial page if autoResetPage is true", () => {
  const options = { itemsPerPage: 1, initialPage: 3, autoResetPage: true };
  const { result, rerender } = renderHook(
    ({ data, options }) => usePagination(data, options),
    {
      initialProps: {
        data: [1, 2, 3],
        options,
      },
    },
  );
  expect(result.current.currentPage).toBe(3);
  expect(result.current.pageData).toEqual([3]);
  rerender({ data: [1, 2], options });
  expect(result.current.currentPage).toBe(1);
  expect(result.current.pageData).toEqual([1]);
});
