import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

import Col, { colSizes } from "../Col";
import type { ColSize } from "../Col";
import Row from "../Row";

type Props = {
  children: ReactNode;
  background?: string;
  bordered?: boolean;
  className?: string;
  colSize?: ColSize;
  dark?: boolean;
  deep?: boolean;
  element?: ElementType;
  includeCol?: boolean;
  light?: boolean;
  rowClassName?: string;
  shallow?: boolean;
  type?: "light" | "dark" | "accent" | "image";
} & HTMLAttributes<HTMLElement>;

const Strip = ({
  children,
  background,
  bordered = false,
  className,
  colSize = "12",
  dark = false,
  deep = false,
  includeCol = true,
  element: Component = "div",
  light = false,
  rowClassName,
  shallow = false,
  type,
  ...props
}: Props): JSX.Element => (
  <Component
    className={classNames(className, {
      [`p-strip--${type}`]: !!type,
      "p-strip": !type,
      "is-bordered": bordered,
      "is-dark": dark,
      "is-deep": deep,
      "is-light": light,
      "is-shallow": shallow,
    })}
    style={
      background && {
        backgroundImage: `url('${background}')`,
      }
    }
    {...props}
  >
    <Row className={rowClassName}>
      {includeCol ? <Col size={colSize}>{children}</Col> : children}
    </Row>
  </Component>
);

Strip.propTypes = {
  background: PropTypes.string,
  bordered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  colSize: PropTypes.oneOf(colSizes),
  dark: PropTypes.bool,
  deep: PropTypes.bool,
  element: PropTypes.string,
  includeCol: PropTypes.bool,
  light: PropTypes.bool,
  rowClassName: PropTypes.string,
  shallow: PropTypes.bool,
  type: PropTypes.string,
};

export default Strip;
