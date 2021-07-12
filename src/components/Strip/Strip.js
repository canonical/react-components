import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Col, { colSizes } from "../Col";
import Row from "../Row";

const Strip = ({
  background,
  bordered,
  children,
  className,
  colSize = 12,
  dark,
  deep,
  includeCol = true,
  element: Component = "div",
  light,
  rowClassName,
  shallow,
  type,
  ...props
}) => (
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
  children: PropTypes.node,
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
