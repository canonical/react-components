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

export const EmptyState = ({
  children,
  className,
  image,
  title,
  ...props
}: Props): ReactElement => {
  return (
    <div className={className} {...props}>
      {image}
      <h2 className="p-heading--4">{title}</h2>
      {children}
    </div>
  );
};

export default EmptyState;
