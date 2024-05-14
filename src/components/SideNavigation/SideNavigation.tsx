import React, { ReactNode } from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import { type HTMLProps } from "react";

import type { SideNavigationItemProps } from "./SideNavigationItem";
import SideNavigationItem from "./SideNavigationItem";
import type {
  SideNavigationLinkDefaultElement,
  SideNavigationLinkProps,
} from "./SideNavigationLink";
import { isReactNode } from "utils";

export type NavItem<L = SideNavigationLinkDefaultElement> =
  | SideNavigationItemProps<L>
  | ReactNode
  | null;

export type NavGroup<L = SideNavigationLinkDefaultElement> = PropsWithSpread<
  {
    items: NavItem<L>[];
  },
  HTMLProps<HTMLUListElement>
>;

export type Props<L = SideNavigationLinkDefaultElement> = PropsWithSpread<
  {
    dark?: boolean;
    hasIcons?: boolean;
    items: NavItem<L>[] | NavItem<L>[][] | NavGroup<L>[];
    linkComponent?: SideNavigationLinkProps["component"];
    listClassName?: string;
    navClassName?: string;
  },
  HTMLProps<HTMLDivElement>
>;

const generateItem = <L = SideNavigationLinkDefaultElement,>(
  item: NavItem<L>,
  index: number,
  linkComponent?: Props<L>["linkComponent"]
) => {
  if (isReactNode(item)) {
    return <SideNavigationItem key={index}>{item}</SideNavigationItem>;
  }
  if ("nonInteractive" in item) {
    return <SideNavigationItem {...item} key={index} />;
  }
  if ("children" in item) {
    return <SideNavigationItem key={index} {...item} />;
  }
  if ("label" in item) {
    return (
      <SideNavigationItem<L>
        component={item.component ?? linkComponent}
        {...item}
        key={index}
      />
    );
  }
  return null;
};

const isGrouped = <L = SideNavigationLinkDefaultElement,>(
  items: Props<L>["items"]
): items is NavItem<L>[][] | NavGroup<L>[] =>
  items.some((item) => Array.isArray(item) || "items" in item);

const SideNavigation = <L = SideNavigationLinkDefaultElement,>({
  children,
  className,
  dark,
  hasIcons,
  items,
  linkComponent,
  listClassName,
  navClassName,
  ...props
}: Props<L>) => {
  const groups = isGrouped(items) ? items : [items];
  return (
    <div
      className={classNames(className, {
        "p-side-navigation--icons":
          hasIcons ||
          groups.some((group) =>
            ("items" in group ? group.items : items).some((item) =>
              isReactNode(item) ? false : "icon" in item && !!item.icon
            )
          ),
        "is-dark": dark,
      })}
      {...props}
    >
      <nav className={navClassName}>
        {groups.map((group: NavItem<L>[] | NavGroup<L>, g) => {
          let items: NavItem<L>[];
          let props: HTMLProps<HTMLUListElement> = {};
          if (typeof group === "object" && "items" in group) {
            ({ items, ...props } = group);
          } else {
            items = group;
          }
          return (
            <ul
              {...props}
              className={classNames(
                "p-side-navigation__list",
                listClassName,
                "className" in group ? group.className : null
              )}
              key={g}
            >
              {items
                .filter(Boolean)
                .map((item, i) => generateItem<L>(item, i, linkComponent))}
            </ul>
          );
        })}
      </nav>
    </div>
  );
};

export default SideNavigation;
