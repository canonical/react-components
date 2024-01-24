import type { PropsWithSpread } from "@canonical/react-components/dist/types";
import classNames from "classnames";
import {
  type HTMLProps,
  type ComponentType,
  type ElementType,
  isValidElement,
} from "react";

import type { SideNavigationItemProps } from "./SideNavigationItem";
import SideNavigationItem from "./SideNavigationItem";
import type { SideNavigationLinkDefaultElement } from "./SideNavigationLink";

export type NavItem<L = SideNavigationLinkDefaultElement> =
  | SideNavigationItemProps<L>
  | JSX.Element;

export type Props<L = SideNavigationLinkDefaultElement> = PropsWithSpread<
  {
    dark?: boolean;
    hasIcons?: boolean;
    items: NavItem<L>[] | NavItem<L>[][];
    linkComponent?: ElementType | ComponentType<L>;
  },
  HTMLProps<HTMLDivElement>
>;

const generateItem = <L = SideNavigationLinkDefaultElement,>(
  item: NavItem<L>,
  linkComponent: Props<L>["linkComponent"],
  index: number,
) => {
  return isValidElement(item) ? (
    <SideNavigationItem key={index}>{item}</SideNavigationItem>
  ) : "label" in item ? (
    <SideNavigationItem<L>
      {...item}
      key={index}
      component={item.component ?? linkComponent}
    />
  ) : null;
};

const isGrouped = <L = SideNavigationLinkDefaultElement,>(
  items: Props<L>["items"],
): items is NavItem<L>[][] => {
  return items.some((item) => Array.isArray(item));
};

const SideNavigation = <L = SideNavigationLinkDefaultElement,>({
  children,
  className,
  dark,
  hasIcons,
  items,
  linkComponent,
  ...props
}: Props<L>) => {
  const groups = isGrouped(items) ? items : [items];
  return (
    <div
      className={classNames(className, {
        "p-side-navigation--icons":
          hasIcons ||
          groups.some((items) =>
            items.some((item) => "icon" in item && !!item.icon),
          ),
        "is-dark": dark,
      })}
      {...props}
    >
      <nav>
        {groups.map((items, g) => (
          <ul className="p-side-navigation__list" key={g}>
            {items.map((item, i) => generateItem<L>(item, linkComponent, i))}
          </ul>
        ))}
      </nav>
    </div>
  );
};

export default SideNavigation;
