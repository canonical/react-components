import React from "react";
import type { HTMLProps, PropsWithChildren, ReactNode } from "react";

import SideNavigationLink from "../SideNavigationLink";
import type { SideNavigationLinkProps } from "../SideNavigationLink";
import type { SideNavigationLinkDefaultElement } from "../SideNavigationLink";
import SideNavigationText, {
  SideNavigationTextProps,
} from "../SideNavigationText";

type ItemProps = {
  /**
   * The item content.
   */
  children: NonNullable<PropsWithChildren["children"]>;
} & HTMLProps<HTMLLIElement>;

type ContentProps<L = SideNavigationLinkDefaultElement> =
  | SideNavigationLinkProps<L>
  | (SideNavigationTextProps & { nonInteractive: true });

export type Props<L = SideNavigationLinkDefaultElement> =
  | ItemProps
  | ContentProps<L>;

const SideNavigationItem = <L = SideNavigationLinkDefaultElement,>(
  props: Props<L>
) => {
  let content: ReactNode;
  let liProps: HTMLProps<HTMLLIElement> = {};
  if ("nonInteractive" in props) {
    const { nonInteractive: _, ...textProps } = props;
    content = <SideNavigationText {...textProps} />;
  } else if (!("children" in props)) {
    content = <SideNavigationLink<L> {...props} />;
  } else {
    ({ children: content, ...liProps } = props);
  }
  return (
    <li className="p-side-navigation__item" {...liProps}>
      {content}
    </li>
  );
};

export default SideNavigationItem;
