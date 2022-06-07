import { ReactNode, HTMLProps, useRef, useEffect } from "react";
import React, { isValidElement, useState } from "react";

import classNames from "classnames";

import NavigationLink from "./NavigationLink";
import NavigationMenu from "./NavigationMenu";
import type { GenerateLink, NavItem, NavMenu, LogoProps } from "./types";
import { PropsWithSpread, SubComponentProps } from "types";
import SearchBox, { SearchBoxProps } from "components/SearchBox";
import { useOnEscapePressed } from "hooks";
import { Theme } from "../../enums";

export type Props = PropsWithSpread<
  {
    /**
     * By default the header is constrained to the width of the grid. Use this
     * option to make the header take the full width of the page.
     */
    fullWidth?: boolean;
    /**
     * This function can be used to generate link elements when you don't want to
     * use a standard HTML anchor.
     */
    generateLink?: GenerateLink | null;
    /**
     * The main navigation items that appear on the left hand side next to the logo.
     */
    items?: NavItem[] | null;
    /**
     * Additional navigation items that appear on the right hand side of the
     * navigation banner.
     */
    itemsRight?: NavItem[] | null;
    /**
     * Additional props to be applied to the nav element that wraps the main
     * navigation items on the left hand side.
     */
    leftNavProps?: HTMLProps<HTMLUListElement> | null;
    /**
     * The logo can be defined either by providing props for the standard logo
     * or the full logo markup when a custom logo is needed.
     */
    logo: LogoProps | ReactNode;
    /**
     * Additional props to be applied to the nav element that wraps the
     * left and right nav items.
     */
    navProps?: HTMLProps<HTMLElement> | null;
    /**
     * Additional props to be applied to the nav element that wraps the
     * navigation items on the right hand side.
     */
    rightNavProps?: HTMLProps<HTMLUListElement> | null;
    /**
     * Props to pass to the SearchBox component. When these props are provided the
     * search box will appear.
     */
    searchProps?: SubComponentProps<SearchBoxProps> | null;
    /**
     * The header theme. When this is not provided the header will use the default
     * theme defined in the Vanilla settings.
     */
    theme?: Theme | null;
  },
  HTMLProps<HTMLElement>
>;

/**
 * Narrow the type of the nav item to a NavMenu.
 */
const isMenu = (item: NavItem): item is NavMenu => "items" in item;

/**
 * Narrow the type of the logo prop to LogoProps.
 */
const isLogoProps = (logo: Props["logo"]): logo is LogoProps =>
  !isValidElement(logo);

/**
 * Display the standard logo if the props were provided otherwise display the
 * full element provided.
 */
const generateLogo = (logo: Props["logo"], generateLink: GenerateLink) => {
  if (isLogoProps(logo)) {
    const {
      url,
      src,
      title,
      icon,
      "aria-current": ariaCurrent,
      "aria-label": ariaLabel,
      ...logoProps
    } = logo;
    const content = (
      <>
        <div className="p-navigation__logo-tag">
          {icon ?? <img className="p-navigation__logo-icon" src={src} alt="" />}
        </div>
        <span className="p-navigation__logo-title">{title}</span>
      </>
    );
    return (
      <div className="p-navigation__tagged-logo" {...logoProps}>
        <NavigationLink
          generateLink={generateLink}
          link={{
            "aria-label": ariaLabel,
            className: "p-navigation__link",
            isSelected: !!ariaCurrent,
            label: content,
            url: url,
          }}
        />
      </div>
    );
  }
  return <div className="p-navigation__logo">{logo}</div>;
};

/**
 * Generate the JSX for a set of nav items. This will map the items to menus,
 * links or generated components.
 * @param items The nav items to map to elements.
 * @param closeMobileMenu A function to close the mobile menu.
 * @param generateLink The optional function used to generate link components.
 * @returns A list of navigation item elements.
 */
const generateItems = (
  items: NavItem[],
  closeMobileMenu: () => void,
  generateLink?: GenerateLink | null
) =>
  items.map((item, i) =>
    isMenu(item) ? (
      <NavigationMenu {...item} generateLink={generateLink} key={i} />
    ) : (
      <li
        className={classNames("p-navigation__item", {
          "is-selected": item.isSelected,
        })}
        key={i}
      >
        <NavigationLink
          generateLink={generateLink}
          link={{
            ...item,
            className: classNames("p-navigation__link", item.className),
            onClick: (evt) => {
              item.onClick?.(evt);
              closeMobileMenu();
            },
          }}
        />
      </li>
    )
  );

const Navigation = ({
  fullWidth,
  generateLink,
  items,
  itemsRight,
  leftNavProps,
  logo,
  navProps,
  rightNavProps,
  searchProps,
  theme,
  ...headerProps
}: Props): JSX.Element => {
  const searchRef = useRef<HTMLInputElement>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // Display the search box if the props have been provided.
  const hasSearch = !!searchProps;
  // Close the mobile menu when the search box is opened.
  const toggleSearch = (open?: boolean) => {
    setSearchOpen(open ?? !searchOpen);
    setMobileMenuOpen(false);
  };
  // Close the search box when the mobile menu is opened.
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setSearchOpen(false);
  };
  const closeMobileMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  // Hide the searchbox when the escape key is pressed.
  useOnEscapePressed(() => toggleSearch(false));

  useEffect(() => {
    if (searchOpen) {
      // Focus on the searchbox when it appears. This done in a useEffect so
      // that the state change to display the searchbox has already occured and
      // the input has been made visible.
      searchRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <header
      {...headerProps}
      className={classNames("p-navigation", headerProps.className, {
        "has-menu-open": mobileMenuOpen,
        "has-search-open": searchOpen,
        "is-dark": theme === Theme.DARK,
        "is-light": theme === Theme.LIGHT,
      })}
    >
      <div
        className={
          fullWidth ? "p-navigation__row--full-width" : "p-navigation__row"
        }
      >
        <div className="p-navigation__banner">
          {generateLogo(logo, generateLink)}
          <ul className="p-navigation__items">
            {
              // When the header has a search box then this button is used to
              // toggle the search box at mobile size.
              hasSearch ? (
                <li className="p-navigation__item">
                  <button
                    aria-label="Search"
                    className="p-navigation__link--search-toggle"
                    onClick={() => toggleSearch()}
                  >
                    <span className="p-navigation__search-label">Search</span>
                  </button>
                </li>
              ) : null
            }
            <li className="p-navigation__item">
              <button
                aria-pressed={mobileMenuOpen}
                className="p-navigation__link"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? "Close menu" : "Menu"}
              </button>
            </li>
          </ul>
        </div>
        <nav className="p-navigation__nav" {...navProps}>
          {/* 
            Always include the left nav list so that it takes up the space 
            before the right nav list.
          */}
          <ul className="p-navigation__items" {...leftNavProps}>
            {items ? generateItems(items, closeMobileMenu, generateLink) : null}
          </ul>
          {itemsRight || hasSearch ? (
            <ul className="p-navigation__items" {...rightNavProps}>
              {itemsRight
                ? generateItems(itemsRight, closeMobileMenu, generateLink)
                : null}
              {
                // When the header has a search box then this button is used to
                // toggle the search box at non-mobile size.
                hasSearch ? (
                  <li className="p-navigation__item">
                    <button
                      aria-label="Search"
                      className="p-navigation__link--search-toggle"
                      onClick={() => toggleSearch()}
                    >
                      <span className="p-navigation__search-label">Search</span>
                    </button>
                  </li>
                ) : null
              }
            </ul>
          ) : null}
          {
            // When the header has a search box and the user has opened the search
            // form then this search box is displayed.
            hasSearch ? (
              <div className="p-navigation__search" aria-hidden={!searchOpen}>
                <SearchBox ref={searchRef} />
              </div>
            ) : null
          }
        </nav>
      </div>
      {
        // When the header has a search box and the user has opened the search
        // form then this element is overlayed over the whole page.
        hasSearch ? (
          <div
            className="p-navigation__search-overlay"
            onClick={() => setSearchOpen(false)}
          ></div>
        ) : null
      }
    </header>
  );
};

export default Navigation;
