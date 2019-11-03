import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import Pagination from "../Pagination";
import Table from "../Table";
import TableRow from "../TableRow";
import TableHeader from "../TableHeader";
import TableCell from "../TableCell";

const updateSort = (setSortKey, setSortDirection, sortKey, sortDirection) => {
  let newDirection = null;
  if (sortDirection === "none") {
    newDirection = "ascending";
  } else if (sortDirection === "ascending") {
    newDirection = "descending";
  } else {
    sortKey = null;
  }
  setSortKey(sortKey);
  setSortDirection(newDirection);
};

const generateHeaders = (
  currentSortKey,
  currentSortDirection,
  expanding,
  headers,
  sortable,
  setSortKey,
  setSortDirection
) => {
  const headerItems = headers.map(({ content, sortKey, ...props }, index) => {
    let sortDirection;
    if (sortable && sortKey) {
      if (currentSortKey === sortKey) {
        sortDirection = currentSortDirection;
      } else {
        sortDirection = "none";
      }
    }
    return (
      <TableHeader
        key={index}
        sort={sortDirection}
        onClick={
          sortable &&
          updateSort.bind(
            this,
            setSortKey,
            setSortDirection,
            sortKey,
            sortDirection
          )
        }
        {...props}
      >
        {content}
      </TableHeader>
    );
  });
  // When there is expanding content then provide an extra hidden header to
  // account for the extra cell in the body rows.
  return (
    <thead>
      <TableRow>
        {headerItems}
        {expanding && <TableHeader className="u-hide"></TableHeader>}
      </TableRow>
    </thead>
  );
};

const generateRows = (
  currentSortDirection,
  currentSortKey,
  expanding,
  paginate,
  rows,
  currentPage,
  setCurrentPage,
  sortable,
  sortFunction
) => {
  // Clone the rows so we can restore the original order.
  const sortedRows = [...rows];
  if (sortable && currentSortKey) {
    if (!sortFunction) {
      sortFunction = (a, b) => {
        if (!a.sortData || !b.sortData) {
          return 0;
        }
        if (a.sortData[currentSortKey] > b.sortData[currentSortKey]) {
          return currentSortDirection === "ascending" ? 1 : -1;
        } else if (a.sortData[currentSortKey] < b.sortData[currentSortKey]) {
          return currentSortDirection === "ascending" ? -1 : 1;
        }
        return 0;
      };
    }
    sortedRows.sort((a, b) =>
      sortFunction(a, b, currentSortDirection, currentSortKey)
    );
  }
  let slicedRows = sortedRows;
  if (paginate) {
    let startIndex = (currentPage - 1) * paginate;
    if (startIndex > rows.length) {
      // If the rows have changed e.g. when filtering and the user is on a page
      // that no longer exists then send them to the start.
      setCurrentPage(1);
    }
    slicedRows = sortedRows.slice(startIndex, startIndex + paginate);
  }
  const rowItems = slicedRows.map(
    (
      { columns, expanded, expandedContent, key, sortData, ...rowProps },
      index
    ) => {
      const cellItems = columns.map(({ content, ...cellProps }, index) => (
        <TableCell key={index} {...cellProps}>
          {content}
        </TableCell>
      ));
      // The expanding cell is alway created to match the correct number of
      // table cells in rows that do have expanding content.
      return (
        <TableRow key={key || index} {...rowProps}>
          {cellItems}
          {expanding && (
            <TableCell expanding={true} hidden={!expanded}>
              {expandedContent}
            </TableCell>
          )}
        </TableRow>
      );
    }
  );
  return <tbody>{rowItems}</tbody>;
};

const MainTable = ({
  defaultSort,
  defaultSortDirection,
  expanding,
  headers,
  onUpdateSort,
  paginate,
  rows,
  responsive,
  sortable,
  sortFunction,
  ...props
}) => {
  const [currentSortKey, setSortKey] = useState(defaultSort);
  const [currentSortDirection, setSortDirection] = useState(
    defaultSortDirection
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Update the current sort state if the prop changes.
  useEffect(() => {
    setSortKey(defaultSort);
  }, [defaultSort]);

  // Update the current sort direction state if the prop changes.
  useEffect(() => {
    setSortDirection(defaultSortDirection);
  }, [defaultSortDirection]);

  const updateSort = newSort => {
    setSortKey(newSort);
    onUpdateSort && onUpdateSort(newSort);
  };

  return (
    <>
      <Table
        expanding={expanding}
        sortable={sortable}
        responsive={responsive}
        {...props}
      >
        {headers &&
          generateHeaders(
            currentSortKey,
            currentSortDirection,
            expanding,
            headers,
            sortable,
            updateSort,
            setSortDirection
          )}
        {rows &&
          generateRows(
            currentSortDirection,
            currentSortKey,
            expanding,
            paginate,
            rows,
            currentPage,
            setCurrentPage,
            sortable,
            sortFunction
          )}
      </Table>
      {paginate && rows && rows.length > 0 && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={paginate}
          paginate={setCurrentPage}
          style={{ marginTop: "1rem" }}
          totalItems={rows.length}
        />
      )}
    </>
  );
};

MainTable.propTypes = {
  defaultSort: PropTypes.string,
  defaultSortDirection: PropTypes.oneOf(["ascending", "descending"]),
  expanding: PropTypes.bool,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.node,
      className: PropTypes.string,
      // The key to sort on for this header.
      sortKey: PropTypes.string
    })
  ),
  onUpdateSort: PropTypes.func,
  paginate: PropTypes.number,
  responsive: PropTypes.bool,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          children: PropTypes.node,
          className: PropTypes.string,
          expanding: PropTypes.bool,
          hidden: PropTypes.bool
        })
      ),
      expanded: PropTypes.bool,
      expandedContent: PropTypes.node,
      // A map of sort keys to values for this row. The keys should map the
      // sortKey values in the headers.
      sortData: PropTypes.object
    })
  ),
  sortable: PropTypes.bool,
  sortFunction: PropTypes.func
};

export default MainTable;
