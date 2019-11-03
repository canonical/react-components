import PropTypes from "prop-types";
import React from "react";

const TableHeader = ({ children, sort, ...props }) => {
  return (
    <th role="columnheader" aria-sort={sort} {...props}>
      {children}
    </th>
  );
};

TableHeader.propTypes = {
  sort: PropTypes.oneOf(["none", "ascending", "descending"])
};

export default TableHeader;
