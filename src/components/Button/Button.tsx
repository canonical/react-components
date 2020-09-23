import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLAttributes, ElementType, ReactNode } from "react";

export type Props = {
  appearance?: string;
  children?: ReactNode;
  className?: string;
  dense?: boolean;
  disabled?: boolean;
  element?: ElementType;
  hasIcon?: boolean;
  inline?: boolean;
  onClick?: (evt: React.MouseEvent) => void;
} & HTMLAttributes<HTMLElement>;

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
  ...buttonProps
}: Props): JSX.Element => {
  const classes = classNames(
    `p-button--${appearance}`,
    {
      "has-icon": hasIcon,
      "is-dense": dense,
      "is-disabled": Component !== "button" && disabled,
      "is-inline": inline,
    },
    className
  );
  const onClickDisabled = (e: MouseEvent) => e.preventDefault();
  const disabledProp =
    Component === "button" ? { disabled } : { "aria-disabled": disabled };

  return (
    <Component
      className={classes}
      onClick={disabled ? onClickDisabled : onClick}
      {...disabledProp}
      {...buttonProps}
    >
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
  element: PropTypes.elementType,
  hasIcon: PropTypes.bool,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
