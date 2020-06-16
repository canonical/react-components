import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Tabs = ({ className, links, listClassName }) => {
  return (
    <nav className={classNames("p-tabs", className)}>
      <ul className={classNames("p-tabs__list", listClassName)}>
        {links.map((link) => {
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
              key={label}
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
      component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.object,
      ]),
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
