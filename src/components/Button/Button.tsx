import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps, ElementType, ReactNode, ComponentType } from "react";

/**
 * The type of the Button props.
 * @template P - The type of the props if providing a component to `element`
 */
export type Props<P = null> = {
  appearance?: string;
  children?: ReactNode;
  className?: string;
  dense?: boolean;
  disabled?: boolean;
  element?: ElementType | ComponentType<P>;
  hasIcon?: boolean;
  inline?: boolean;
  onClick?: (evt: React.MouseEvent) => void;
  small?: boolean;
} & (HTMLProps<HTMLElement> | P);

/**
 * A component for the Vanilla button.
 * @template P - The type of the props if providing a component to `element`
 */
const Button = <P,>({
  appearance = "neutral",
  children,
  className,
  dense,
  disabled,
  element: Component = "button",
  hasIcon,
  inline,
  onClick,
  small,
  ...buttonProps
}: Props<P>): JSX.Element => {
  const classes = classNames(
    `p-button--${appearance}`,
    {
      "has-icon": hasIcon,
      "is-dense": dense,
      "is-disabled": Component !== "button" && disabled,
      "is-inline": inline,
      "is-small": small,
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
  small: PropTypes.bool,
};

export default Button;
