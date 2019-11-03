import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const TableCell = ({
  children,
  className,
  expanding,
  hidden,
  role = "gridcell",
  ...props
}) => (
  <td
    role={role}
    aria-hidden={hidden}
    className={classNames(className, {
      "p-table-expanding__panel": expanding
    })}
    {...props}
  >
    {children}
  </td>
);

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  expanding: PropTypes.bool,
  hidden: PropTypes.bool,
  role: PropTypes.string
};

export default TableCell;
