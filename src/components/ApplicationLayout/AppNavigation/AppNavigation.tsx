import React from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import type { HTMLProps, PropsWithChildren } from "react";

export type Props = PropsWithSpread<
  {
    /**
     * Whether the navigation panel should be collapsed.
     */
    collapsed?: boolean;
    /**
     * The navigation drawer content.
     */
    children?: PropsWithChildren["children"];
    /**
     * Whether the navigation panel should be pinned.
     */
    pinned?: boolean;
  },
  HTMLProps<HTMLDivElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the navigation panel in the Vanilla
 * [Application Layout](https://vanillaframework.io/docs/layouts/application).
 *
 * This component is used to display the left navigation panel. It should be
 * used alongside [`AppNavigationBar`](/docs/components-applicationlayout-appnavigationbar--docs).
 */
const AppNavigation = ({
  children,
  className,
  collapsed,
  pinned,
  ...props
}: Props) => {
  return (
    <header
      className={classNames("l-navigation", className, {
        "is-collapsed": collapsed,
        "is-pinned": pinned,
      })}
      {...props}
    >
      <div className="l-navigation__drawer">{children}</div>
    </header>
  );
};

export default AppNavigation;
