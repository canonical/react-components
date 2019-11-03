import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Row = ({ children, className, ...props }) => (
  <div className={classNames(className, "row")} {...props}>
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Row;
