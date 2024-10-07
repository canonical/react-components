import classNames from "classnames";
import React from "react";
import type { HTMLProps, ReactNode } from "react";
import type { ClassName, PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * The content of the row.
     */
    children: ReactNode;
    /**
     * Optional class(es) to pass to the wrapping div element.
     */
    className?: ClassName;
    /**
     * Whether the row should have 4 columns on medium screens.
     */
    fourColumnMedium?: boolean;
  },
  HTMLProps<HTMLDivElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for use within the Vanilla [Grid](https://docs.vanillaframework.io/patterns/grid/).
 *
 * Vanilla has a responsive grid using a combination of rows and columns.
 */
const Row = ({
  children,
  className,
  fourColumnMedium = false,
  ...props
}: Props): JSX.Element => (
  <div
    className={classNames(
      className,
      fourColumnMedium ? "row--4-cols-medium" : "row",
    )}
    {...props}
  >
    {children}
  </div>
);

export default Row;
