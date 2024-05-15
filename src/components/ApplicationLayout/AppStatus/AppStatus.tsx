import React from "react";
import classNames from "classnames";
import type { HTMLProps, PropsWithChildren } from "react";

export type Props = {
  /**
   * The status content.
   */
  children?: PropsWithChildren["children"];
} & HTMLProps<HTMLDivElement>;

/**
 * This is a [React](https://reactjs.org/) component for status area in the Vanilla
 * [Application Layout](https://vanillaframework.io/docs/layouts/application).
 */
const AppStatus = ({ children, className, ...props }: Props) => {
  return (
    <aside className={classNames("l-status", className)} {...props}>
      {children}
    </aside>
  );
};

export default AppStatus;
