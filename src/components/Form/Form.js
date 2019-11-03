import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Form = ({ children, className, inline, stacked, ...props }) => (
  <form
    className={classNames(className, {
      "p-form": inline || stacked,
      "p-form--inline": inline,
      "p-form--stacked": stacked
    })}
    {...props}
  >
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inline: PropTypes.bool,
  stacked: PropTypes.bool
};

export default Form;
