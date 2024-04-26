import classNames from "classnames";
import React, { ReactNode, HTMLProps, ReactElement } from "react";
import { PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * The content of the empty state.
     */
    children?: ReactNode;
    /**
     * Optional class(es) to add to the wrapping element.
     */
    className?: string;
    /**
     * An image representing the empty state.
     */
    image: ReactNode;
    /**
     * The title of the empty state.
     */
    title: string;
  },
  HTMLProps<HTMLDivElement>
>;

// test percy
export const EmptyState = ({
  children,
  className,
  image,
  title,
  ...props
}: Props): ReactElement => {
  return (
    <div className={classNames(["row", className])} {...props}>
      <div className="u-align--right col-4 col-medium-2 col-small-1">
        {image}
      </div>
      <div className="u-align--left col-8 col-medium-4 col-small-3">
        <p className="p-heading--4 u-no-margin--bottom">{title}</p>
        {children}
      </div>
    </div>
  );
};

export default EmptyState;
