import React from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import type { HTMLProps, PropsWithChildren } from "react";

export type Props = PropsWithSpread<
  {
    /**
     * The navigation content.
     */
    children?: PropsWithChildren["children"];
  },
  HTMLProps<HTMLElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for navigation bar in the Vanilla
 * [Application Layout](https://vanillaframework.io/docs/layouts/application).
 *
 * This component is used to display the navigation panel on mobile or small
 * screens. It should be used alongside [`AppNavigation`](/docs/components-applicationlayout-appnavigation--docs).
 */
const AppNavigationBar = ({ children, className, ...props }: Props) => {
  return (
    <header className={classNames("l-navigation-bar", className)} {...props}>
      {children}
    </header>
  );
};

export default AppNavigationBar;
