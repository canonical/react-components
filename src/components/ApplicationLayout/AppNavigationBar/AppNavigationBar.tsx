import React from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import type { HTMLProps, PropsWithChildren } from "react";

type Props = PropsWithSpread<PropsWithChildren, HTMLProps<HTMLElement>>;

const AppNavigationBar = ({ children, className, ...props }: Props) => {
  return (
    <header className={classNames("l-navigation-bar", className)} {...props}>
      {children}
    </header>
  );
};

export default AppNavigationBar;
