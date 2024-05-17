import React from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import type { HTMLProps, PropsWithChildren } from "react";

export type Props = PropsWithSpread<
  {
    /**
     * The application content.
     */
    children?: PropsWithChildren["children"];
  },
  HTMLProps<HTMLDivElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the application wrapper in the Vanilla
 * [Application Layout](https://vanillaframework.io/docs/layouts/application).
 */
const Application = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={classNames("l-application", className)}
      role="presentation"
      {...props}
    >
      {children}
    </div>
  );
};

export default Application;
