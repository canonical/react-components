import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps, ElementType, ReactNode, ComponentType } from "react";

export type TabLink<P = null> = {
  active?: boolean;
  className?: string;
  component?: ElementType | ComponentType<P>;
  label: ReactNode;
  listItemClassName?: string;
} & (HTMLProps<HTMLElement> | P);

type Props<P = null> = {
  links: TabLink<P>[];
  className?: string;
  listClassName?: string;
};

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
                data-test={`tab-link-${label}`}
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

Tabs.propTypes = {
  /**
   * Optional classes applied to the parent "nav" element.
   */
  className: PropTypes.string,
  /**
   * An array of tab link objects.
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Whether the tab link should have active styling.
       */
      active: PropTypes.bool,
      /**
       * Optional classes applied to the link element.
       */
      className: PropTypes.string,
      /**
       * Optional component to be used instead of the default "a" element.
       */
      component: PropTypes.elementType,
      /**
       * Label to be displayed inside the tab link.
       */
      label: PropTypes.node.isRequired,
      /**
       * Optional classes applied to the "li" element.
       */
      listItemClassName: PropTypes.string,
    }).isRequired
  ),
  /**
   * Optional classes applied to the "ul" element.
   */
  listClassName: PropTypes.string,
};

export default Tabs;
