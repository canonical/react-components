import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Button = ({
  appearance = "neutral",
  children,
  className,
  dense,
  disabled,
  element: Component = "button",
  hasIcon,
  inline,
  onClick,
  ...props
}) => {
  const classes = classNames(
    `p-button--${appearance}`,
    {
      "has-icon": hasIcon,
      "is-dense": dense,
      "is-disabled": (Component !== "button") & disabled,
      "is-inline": inline,
    },
    className
  );
  const onClickDisabled = (e) => e.preventDefault();
  const commonProps = {
    ...props,
    className: classes,
    onClick: disabled ? onClickDisabled : onClick,
  };

  if (Component === "button") {
    return (
      <button {...commonProps} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <Component {...commonProps} aria-disabled={disabled}>
      {children}
    </Component>
  );
};

Button.propTypes = {
  appearance: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  element: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.string,
  ]),
  hasIcon: PropTypes.bool,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
