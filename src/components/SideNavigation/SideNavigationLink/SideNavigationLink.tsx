import React from "react";
import classNames from "classnames";
import type { HTMLProps } from "react";

import type { SideNavigationBaseProps } from "../SideNavigationBase";
import SideNavigationBase from "../SideNavigationBase";

export type LinkDefaultElement = HTMLProps<HTMLAnchorElement>;

export type Props<L = LinkDefaultElement, E = HTMLAnchorElement> = Omit<
  SideNavigationBaseProps<L>,
  "component"
> & {
  /**
   * The component or element to use for the link element e.g. `a` or `NavLink`.
   * @default a
   */
  component?: SideNavigationBaseProps<L>["component"];
  /**
   * A ref to pass to the link element.
   */
  forwardRef?: React.Ref<E> | null;
};

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
      {...props}
      ref={forwardRef}
    />
  );
};

export default SideNavigationLink;
