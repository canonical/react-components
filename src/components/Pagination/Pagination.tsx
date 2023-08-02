import classNames from "classnames";
import React from "react";
import type { HTMLProps } from "react";

import PaginationButton from "./PaginationButton";
import PaginationItem from "./PaginationItem";

import type { PropsWithSpread } from "types";
import type { PaginationDirection } from "./PaginationButton/PaginationButton";

const scrollTop = () => window.scrollTo(0, 0);

const generatePaginationItems = (
  pageNumbers: number[],
  currentPage: number,
  truncateThreshold: number,
  changePage: (page: number) => void
) => {
  const lastPage = pageNumbers.length;
  const truncated = lastPage > truncateThreshold;

  let visiblePages: number[];
  if (truncated) {
    // the default range for pages outside the start and end threshold
    let start = currentPage - 2;
    let end = currentPage + 1;
    // on page 1, also show pages 2, 3 and 4
    if (currentPage === 1) {
      start = 1;
      end = currentPage + 3;
    }
    // on page 2, show page 1, and also pages 3, and 4
    if (currentPage === 2) {
      start = 1;
      end = currentPage + 2;
    }
    // on the last page and page before last, also show the 3 previous pages
    if (currentPage === lastPage || currentPage === lastPage - 1) {
      start = lastPage - 4;
      end = lastPage - 1;
    }
    visiblePages = pageNumbers.slice(start, end);
  } else {
    visiblePages = pageNumbers;
  }

  const items = [];
  if (truncated) {
    // render first in sequence
    items.push(
      <PaginationItem
        key={1}
        number={1}
        isActive={currentPage === 1}
        onClick={() => changePage(1)}
      />
    );
    if (![1, 2, 3].includes(currentPage)) {
      items.push(<PaginationItemSeparator key="sep1" />);
    }
  }

  items.push(
    visiblePages.map((number) => (
      <PaginationItem
        key={number}
        number={number}
        isActive={number === currentPage}
        onClick={() => changePage(number)}
      />
    ))
  );

  if (truncated) {
    // render last in sequence
    if (![lastPage, lastPage - 1, lastPage - 2].includes(currentPage)) {
      items.push(<PaginationItemSeparator key="sep2" />);
    }
    items.push(
      <PaginationItem
        key={lastPage}
        number={lastPage}
        isActive={currentPage === lastPage}
        onClick={() => changePage(lastPage)}
      />
    );
  }
  return items;
};

const PaginationItemSeparator = (): JSX.Element => (
  <li className="p-pagination__item p-pagination__item--truncation">
    &hellip;
  </li>
);

// Props that are used in both types of paginations.
type BaseProps = {
  /**
   * Whether to scroll to the top of the list on page change.
   */
  scrollToTop?: boolean;
  /**
   * The number of pages at which to truncate the pagination items.
   */
  truncateThreshold?: number;
  /**
   * Whether the pagination is ceneterd on the page.
   */
  centered?: boolean;
  /**
   * Whether to show the labels for forward and back buttons.
   */
  showLabels?: boolean;
  /**
   * Whether forward button is disabled.
   */
  forwardDisabled?: boolean;
  /**
   * Whether back button is disabled.
   */
  backDisabled?: boolean;
  /**
   * Custom label for forward button.
   */
  forwardLabel?: string;
  /**
   * Custom label for back button.
   */
  backLabel?: string;
};

// Used when number of items per page, number of total items,
// current page and paginate function is defined. Pagination
// is handled by paginate function and optional onForward and
// onBack functions.
type NumberedPagination = BaseProps & {
  /**
   * The current page being viewed.<br>
   * **Required for Numbered Pagination.**
   */
  currentPage: number;
  /**
   * The number of items to show per page.<br>
   * **Required for numbered pagination.**
   */
  itemsPerPage: number;
  /**
   * Function to handle paginating the items.<br>
   * **Required for numbered pagination.**
   */
  paginate: (page: number) => void;
  /**
   * The total number of items.<br>
   * **Required for numbered pagination.**
   */
  totalItems: number;
  /**
   * Whether to hide the pagination items.
   */
  hideNumbers?: boolean;
  /**
   * Function to handle page transition to a higher-numbered page for
   * numbered pagination and to next page for buttons-only pagination.<br>
   * _Called with page parameter for numbered pagination and_
   * _with no parameter for buttons-only pagination._<br>
   * **Required for buttons-only pagination.**
   */
  onForward?: (page: number) => void;
  /**
   * Function to handle page transition to a lower-numbered page for
   * numbered pagination and to next page for buttons-only pagination.<br>
   * _Called with page parameter for numbered pagination and_
   * _with no parameter for buttons-only pagination._<br>
   * **Required for buttons-only pagination.**
   */
  onBack?: (page: number) => void;
};

// Used when number of items per page, number of total items,
// current page or paginate function are undefined.
// Pagination is handled by onForward and onBack function.
type ButtonsOnlyPagination = BaseProps & {
  itemsPerPage?: never;
  totalItems?: never;
  currentPage?: never;
  paginate?: never;
  hideNumbers?: never;
  onForward: () => void;
  onBack: () => void;
};

export type Props = PropsWithSpread<
  NumberedPagination | ButtonsOnlyPagination,
  HTMLProps<HTMLElement>
>;

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  scrollToTop,
  truncateThreshold = 10,
  centered,
  showLabels,
  hideNumbers,
  onForward,
  onBack,
  forwardDisabled,
  backDisabled,
  forwardLabel,
  backLabel,
  ...navProps
}: Props): JSX.Element => {
  const isNumberedPagination =
    !!itemsPerPage && !!totalItems && !!currentPage && !!paginate;

  const pageNumbers = [];

  if (isNumberedPagination) {
    // return early if no pagination is required
    if (totalItems <= itemsPerPage) {
      return null;
    }

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const changeNumberedPage = (page: number) => {
    paginate(page);
    if (page > currentPage) {
      onForward?.(page);
    }
    if (page < currentPage) {
      onBack?.(page);
    }
    scrollToTop && scrollTop();
  };

  const changeButtonsOnlyPage = (direction: PaginationDirection) => {
    if (direction === "forward") {
      onForward?.(undefined);
    }
    if (direction === "back") {
      onBack?.(undefined);
    }
    scrollToTop && scrollTop();
  };

  return (
    <nav className="p-pagination" aria-label="Pagination" {...navProps}>
      <ol
        className={classNames("p-pagination__items", {
          "u-align--center": centered,
        })}
      >
        <PaginationButton
          key="back"
          direction="back"
          disabled={backDisabled || currentPage === 1}
          onClick={() =>
            isNumberedPagination
              ? changeNumberedPage(currentPage - 1)
              : changeButtonsOnlyPage("back")
          }
          showLabel={showLabels}
          label={backLabel}
        />
        {isNumberedPagination && !hideNumbers
          ? generatePaginationItems(
              pageNumbers,
              currentPage,
              truncateThreshold,
              changeNumberedPage
            )
          : null}
        <PaginationButton
          key="forward"
          direction="forward"
          disabled={forwardDisabled || currentPage === pageNumbers.length}
          onClick={() =>
            isNumberedPagination
              ? changeNumberedPage(currentPage + 1)
              : changeButtonsOnlyPage("forward")
          }
          showLabel={showLabels}
          label={forwardLabel}
        />
      </ol>
    </nav>
  );
};

export default Pagination;
