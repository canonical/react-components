import classNames from "classnames";
import React from "react";
import type { ElementType, HTMLProps, ReactNode } from "react";

import type { ClassName, PropsWithSpread } from "types";

export type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const colSizes: ColSize[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export type Props = PropsWithSpread<
  {
    /**
     * The content of the column.
     */
    children?: ReactNode;
    /**
     * Optional class(es) to pass to the wrapping element.
     */
    className?: ClassName;
    /**
     * Optional element type to give the wrapper if not "div".
     */
    element?: ElementType;
    /**
     * The number of columns to skip before starting on large screens.
     */
    emptyLarge?: ColSize;
    /**
     * The number of columns to skip before starting on medium screens.
     */
    emptyMedium?: ColSize;
    /**
     * The number of columns to skip before starting on small screens.
     */
    emptySmall?: ColSize;
    /**
     * Override for the number of columns the content occupies on large screens.
     */
    large?: ColSize;
    /**
     * Override for the number of columns the content occupies on medium screens.
     */
    medium?: ColSize;
    /**
     * The number of columns the content occupies.
     */
    size: ColSize;
    /**
     * Override for the number of columns the content occupies on small screens.
     */
    small?: ColSize;
  },
  HTMLProps<HTMLElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for use within the Vanilla [Grid](https://docs.vanillaframework.io/patterns/grid/).
 *
 * Vanilla has a responsive grid using a combination of rows and columns.
 */
const Col = ({
  children,
  className,
  element: Component = "div",
  emptyLarge,
  emptyMedium,
  emptySmall,
  large,
  medium,
  size,
  small,
  ...props
}: Props): JSX.Element => (
  <Component
    className={classNames(className, `col-${size}`, {
      [`col-small-${small}`]: !!small,
      [`col-medium-${medium}`]: !!medium,
      [`col-large-${large}`]: !!large,
      [`col-start-small-${emptySmall}`]: !!emptySmall,
      [`col-start-medium-${emptyMedium}`]: !!emptyMedium,
      [`col-start-large-${emptyLarge}`]: !!emptyLarge,
    })}
    {...props}
  >
    {children}
  </Component>
);

export default Col;
