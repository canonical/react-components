import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;

const Row = ({ children, className, ...divProps }: Props): JSX.Element => (
  <div className={classNames(className, "row")} {...divProps}>
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Row;
