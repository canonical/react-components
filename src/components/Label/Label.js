import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Label = ({ children, className, forId, required, ...props }) => (
  <label
    className={classNames(className, "p-form__label", {
      "is-required": required
    })}
    htmlFor={forId}
    {...props}
  >
    {children}
  </label>
);

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  forId: PropTypes.string,
  required: PropTypes.bool
};

export default Label;
