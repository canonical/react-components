import type { HTMLProps } from "react";
import React, { useCallback, useState } from "react";

import classNames from "classnames";

import NavigationLink from "../NavigationLink";
import type { GenerateLink, NavMenu } from "../types";
import { PropsWithSpread } from "types";
import { useClickOutside } from "hooks";

type Props = PropsWithSpread<
  NavMenu & {
    generateLink?: GenerateLink;
  },
  HTMLProps<HTMLLIElement>
>;

/**
 * This component is used internally to display menus inside the Navigation component.
 */
const NavigationMenu = ({
  alignRight,
  generateLink,
  items,
  label,
  ...props
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = useCallback(() => setIsOpen(false), [setIsOpen]);
  const [menuRef, menuId] = useClickOutside<HTMLButtonElement>(closeMenu);
  return (
    <li
      {...props}
      className={classNames(
        props.className,
        "p-navigation__item--dropdown-toggle",
        {
          "is-active": isOpen,
        }
      )}
    >
      <button
        aria-controls={menuId}
        className="p-navigation__link u-no-margin--right"
        onClick={(evt) => {
          evt.preventDefault();
          setIsOpen(!isOpen);
        }}
        ref={menuRef}
      >
        {label}
      </button>
      <ul
        aria-hidden={!isOpen}
        className={classNames("p-navigation__dropdown", {
          "p-navigation__dropdown--right": alignRight,
        })}
        id={menuId}
      >
        {items.map((item, i) => (
          <li key={i}>
            <NavigationLink
              generateLink={generateLink}
              link={{
                ...item,
                className: classNames(
                  "p-navigation__dropdown-item",
                  item.className
                ),
              }}
            />
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavigationMenu;
