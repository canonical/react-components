import classNames from "classnames";
import React from "react";
import type { HTMLProps, ReactNode } from "react";

import type { ClassName } from "types";

type Props = {
  /**
   * The content of the row.
   */
  children: ReactNode;
  /**
   * Optional class(es) to pass to the wrapping div element.
   */
  className?: ClassName;
} & HTMLProps<HTMLDivElement>;

const Row = ({ children, className, ...props }: Props): JSX.Element => (
  <div className={classNames(className, "row")} {...props}>
    {children}
  </div>
);

export default Row;
