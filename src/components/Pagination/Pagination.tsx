import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps } from "react";

import PaginationButton from "../PaginationButton";
import PaginationItem from "../PaginationItem";

const scrollTop = () => window.scrollTo(0, 0);

const generatePaginationItems = (
  pageNumbers: number[],
  currentPage: number,
  truncateThreshold: number,
  changePage: (page: number) => void
) => {
  const lastPage = pageNumbers.length;
  const truncated = lastPage > truncateThreshold;

  let visiblePages;
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

type Props = {
  currentPage: number;
  itemsPerPage: number;
  paginate: (page: number) => void;
  totalItems: number;
  scrollToTop?: boolean;
  truncateThreshold?: number;
} & HTMLProps<HTMLElement>;

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  scrollToTop,
  truncateThreshold = 10,
  ...navProps
}: Props): JSX.Element => {
  // return early if no pagination is required
  if (totalItems <= itemsPerPage) {
    return null;
  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = (page) => {
    paginate(page);
    scrollToTop && scrollTop();
  };

  return (
    <nav {...navProps}>
      <ul className="p-pagination">
        <PaginationButton
          key="back"
          direction="back"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        />

        {generatePaginationItems(
          pageNumbers,
          currentPage,
          truncateThreshold,
          changePage
        )}

        <PaginationButton
          key="forward"
          direction="forward"
          disabled={currentPage === pageNumbers.length}
          onClick={() => changePage(currentPage + 1)}
        />
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  scrollToTop: PropTypes.bool,
  truncateThreshold: PropTypes.number,
};

export default Pagination;
