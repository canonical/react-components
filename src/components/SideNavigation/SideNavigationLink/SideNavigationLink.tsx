import classNames from "classnames";
import type { HTMLProps } from "react";

import type { SideNavigationBaseProps } from "../SideNavigationBase";
import SideNavigationBase from "../SideNavigationBase";

export type LinkDefaultElement = HTMLProps<HTMLAnchorElement>;

export type Props<L = LinkDefaultElement> = Omit<
  SideNavigationBaseProps<L>,
  "component"
> & {
  component?: SideNavigationBaseProps<L>["component"];
};

const SideNavigationLink = <L = LinkDefaultElement,>({
  component,
  ...props
}: Props<L>) => {
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
    />
  );
};

export default SideNavigationLink;
