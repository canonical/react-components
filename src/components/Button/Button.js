import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Button = ({
  appearance = "neutral",
  children,
  className,
  disabled,
  element: Component = "button",
  hasIcon,
  inline,
  ...props
}) => {
  const classes = classNames(className, `p-button--${appearance}`, {
    "has-icon": hasIcon,
    "is-disabled": (Component === "a") & disabled,
    "is-inline": inline
  });
  if (Component === "button") {
    return (
      <button className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
  return (
    <Component className={classes} aria-disabled={disabled} {...props}>
      {children}
    </Component>
  );
};

Button.propTypes = {
  appearance: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  element: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.string
  ]),
  hasIcon: PropTypes.bool,
  inline: PropTypes.bool
};

export default Button;
