import classNames from "classnames";
import React from "react";
import type { HTMLProps, ElementType, ReactNode, ComponentType } from "react";

import type { ClassName } from "types";

export type TabLink<P = null> = {
  /**
   * Whether the tab link should have active styling.
   */
  active?: boolean;
  /**
   * Optional classes applied to the link element.
   */
  className?: ClassName;
  /**
   * Optional component to be used instead of the default "a" element.
   */
  component?: ElementType | ComponentType<P>;
  /**
   * Label to be displayed inside the tab link.
   */
  label: ReactNode;
  /**
   * Optional classes applied to the "li" element.
   */
  listItemClassName?: string;
} & (HTMLProps<HTMLElement> | P);

export type Props<P = null> = {
  /**
   * Optional classes applied to the parent "nav" element.
   */
  className?: ClassName;
  /**
   * An array of tab link objects.
   */
  links: TabLink<P>[];
  /**
   * Optional classes applied to the "ul" element.
   */
  listClassName?: string;
};

/**
 * This is the [React](https://reactjs.org/) component for Vanilla [Tabs](https://vanillaframework.io/docs/patterns/tabs).
Tabs organise and allow navigation between groups of content that are related and at the same level
of hierarchy.
 */
const Tabs = <P,>({
  className,
  links,
  listClassName,
}: Props<P>): JSX.Element => {
  return (
    <nav className={classNames("p-tabs", className)}>
      <ul className={classNames("p-tabs__list", listClassName)}>
        {links.map((link, i) => {
          const {
            active,
            className,
            component,
            label,
            listItemClassName,
            ...rest
          } = link;
          const Component = component || "a";
          return (
            <li
              className={classNames("p-tabs__item", listItemClassName)}
              key={i}
            >
              <Component
                aria-selected={active}
                className={classNames("p-tabs__link", className)}
                data-testid={`tab-link-${label}`}
                {...rest}
              >
                {label}
              </Component>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Tabs;
