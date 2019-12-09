import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Table = ({
  children,
  className,
  expanding,
  responsive,
  sortable,
  ...props
}) => (
  <table
    role="grid"
    className={classNames(className, {
      "p-table--mobile-card": responsive,
      "p-table--sortable": sortable,
      "p-table-expanding": expanding
    })}
    {...props}
  >
    {children}
  </table>
);

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  expanding: PropTypes.bool,
  responsive: PropTypes.bool,
  sortable: PropTypes.bool
};

export default Table;
