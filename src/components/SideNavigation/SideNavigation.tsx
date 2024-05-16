import React, { PropsWithChildren, ReactNode } from "react";
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
    /**
     * The navigation items.
     */
    items: NavItem<L>[];
  },
  HTMLProps<HTMLUListElement>
>;

export type Props<L = SideNavigationLinkDefaultElement> = PropsWithSpread<
  {
    /**
     * The navigation content. This can be used instead of supplying `items`.
     */
    children?: PropsWithChildren["children"];
    /**
     * Whether to use the dark theme.
     */
    dark?: boolean;
    /**
     * Whether the navigation items contain icons.
     */
    hasIcons?: boolean;
    /**
     * The navigation items. This can be a single array of items, nested arrays
     * for multiple navigation lists or an object containing items and props
     * that are passed to the list element.
     */
    items?: NavItem<L>[] | (NavItem<L>[] | null)[] | (NavGroup<L> | null)[];
    /**
     * The component or element to use for the link elements e.g. `a` or `NavLink`.
     * @default a
     */
    linkComponent?: SideNavigationLinkProps["component"];
    /**
     * Classes to apply to the navigation list(s).
     */
    listClassName?: string;
    /**
     * Classes to apply to the nav element.
     */
    navClassName?: string;
  },
  HTMLProps<HTMLDivElement>
>;

const generateItem = <L = SideNavigationLinkDefaultElement,>(
  item: NavItem<L>,
  index: number,
  linkComponent?: Props<L>["linkComponent"],
  dark?: boolean
) => {
  if (isReactNode(item)) {
    return <SideNavigationItem key={index}>{item}</SideNavigationItem>;
  }
  if ("nonInteractive" in item) {
    return (
      <SideNavigationItem {...item} dark={item.dark ?? dark} key={index} />
    );
  }
  if ("children" in item) {
    return <SideNavigationItem key={index} {...item} />;
  }
  if ("label" in item) {
    return (
      <SideNavigationItem<L>
        component={item.component ?? linkComponent}
        dark={item.dark ?? dark}
        {...item}
        key={index}
      />
    );
  }
  return null;
};

const generateItems = <L = SideNavigationLinkDefaultElement,>(
  groups: NavItem<L>[][] | NavGroup<L>[] | null,
  listClassName?: string,
  linkComponent?: SideNavigationLinkProps["component"],
  dark?: boolean
) => {
  return groups?.filter(Boolean).map((group: NavItem<L>[] | NavGroup<L>, g) => {
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
          .map((item, i) => generateItem<L>(item, i, linkComponent, dark))}
      </ul>
    );
  });
};

const isGrouped = <L = SideNavigationLinkDefaultElement,>(
  items: Props<L>["items"]
): items is NavItem<L>[][] | NavGroup<L>[] =>
  items.some((item) => Array.isArray(item) || (item && "items" in item));

/**
 * This is a [React](https://reactjs.org/) component for side navigation, used
 * in the [Vanilla](https://vanillaframework.io/docs/) layouts.
 */
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
  let groups: NavItem<L>[][] | NavGroup<L>[] | null = null;
  if (items) {
    groups = isGrouped(items) ? items : [items];
  }
  return (
    <div
      className={classNames(className, {
        "p-side-navigation--icons":
          hasIcons ||
          groups?.some((group) =>
            (group && "items" in group ? group.items : items).some((item) =>
              isReactNode(item) ? false : item && "icon" in item && !!item.icon
            )
          ),
        "is-dark": dark,
      })}
      {...props}
    >
      <nav className={navClassName}>
        {children ?? generateItems(groups, listClassName, linkComponent, dark)}
      </nav>
    </div>
  );
};

export default SideNavigation;
