import PropTypes from "prop-types";
import React from "react";

const TableRow = ({ children, ...props }) => (
  <tr role="row" {...props}>
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node
};

export default TableRow;
