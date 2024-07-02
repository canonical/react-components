import React from "react";
import classNames from "classnames";
import type { HTMLProps, PropsWithChildren } from "react";

export type Props = {
  /**
   * The main content.
   */
  children?: PropsWithChildren["children"];
} & HTMLProps<HTMLDivElement>;

/**
 * This is a [React](https://reactjs.org/) component for main content area in the Vanilla
 * [Application Layout](https://vanillaframework.io/docs/layouts/application).
 */
const AppMain = ({ children, className, ...props }: Props) => {
  return (
    <main className={classNames("l-main", className)} {...props}>
      {children}
    </main>
  );
};

export default AppMain;
