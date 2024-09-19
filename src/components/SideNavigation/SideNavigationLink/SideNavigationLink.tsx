import React from "react";
import classNames from "classnames";
import type { HTMLProps } from "react";

import type { SideNavigationBaseProps } from "../SideNavigationBase";
import SideNavigationBase from "../SideNavigationBase";
import { PropsWithSpread } from "types";

export type LinkDefaultElement = HTMLProps<HTMLAnchorElement>;

export type Props<
  L = LinkDefaultElement,
  E = HTMLAnchorElement,
> = PropsWithSpread<
  {
    /**
     * The component or element to use for the link element e.g. `a` or `NavLink`.
     * @default a
     */
    component?: SideNavigationBaseProps<L>["component"];
    /**
     * A ref to pass to the link element.
     */
    forwardRef?: React.Ref<E> | null;
  },
  Omit<SideNavigationBaseProps<L>, "component">
>;

const SideNavigationLink = <L = LinkDefaultElement, E = HTMLAnchorElement>({
  component,
  forwardRef,
  ...props
}: Props<L, E>) => {
  let className: string | null = null;
  if ("className" in props && typeof props.className === "string") {
    className = props.className;
    delete props.className;
  }
  return (
    <SideNavigationBase
      className={classNames("p-side-navigation__link", className)}
      component={component ?? "a"}
      forwardRef={forwardRef}
      {...props}
    />
  );
};

export default SideNavigationLink;
