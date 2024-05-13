import React from "react";
import type { PropsWithChildren } from "react";

import SideNavigationLink from "../SideNavigationLink";
import type { SideNavigationLinkProps } from "../SideNavigationLink";
import type { SideNavigationLinkDefaultElement } from "../SideNavigationLink";
import SideNavigationText, {
  SideNavigationTextProps,
} from "../SideNavigationText";

export type Props<L = SideNavigationLinkDefaultElement> =
  | PropsWithChildren
  | SideNavigationLinkProps<L>
  | (SideNavigationTextProps & { nonInteractive: true });

const generateContent = <L,>(props: Props<L>) => {
  if ("nonInteractive" in props && props.nonInteractive) {
    const { nonInteractive: _, ...textProps } = props;
    return <SideNavigationText {...textProps} />;
  }
  if ("label" in props) {
    return <SideNavigationLink<L> {...props} />;
  }
  return props.children;
};

const SideNavigationItem = <L = SideNavigationLinkDefaultElement,>(
  props: Props<L>
) => {
  return (
    <li className="p-side-navigation__item">{generateContent<L>(props)}</li>
  );
};

export default SideNavigationItem;
