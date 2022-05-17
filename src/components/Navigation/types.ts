import type { HTMLProps, ReactNode } from "react";
import { PropsWithSpread } from "types";

export type NavLink = PropsWithSpread<
  {
    /**
     * Whether this nav item is currently selected.
     */
    isSelected?: boolean;
    /**
     * The label of the link.
     */
    label: ReactNode;
    /**
     * The URL of the link.
     */
    url?: string;
  },
  HTMLProps<HTMLAnchorElement>
>;

export type NavMenu = {
  /**
   * Whether to align the dropdown to the right edge of the navigation item.
   */
  alignRight?: boolean;
  /**
   * The links to appear in the dropdown.
   */
  items: NavLink[];
  /**
   * The label of the navigation item that opens the menu.
   */
  label: string;
};

/**
 * Navigation items which can be either a link or a menu containing links.
 */
export type NavItem = NavLink | NavMenu;

/**
 * A function that can be used to generate link elements when you don't want to
 * use a standard HTML anchor.
 */
export type GenerateLink = (item: NavLink) => ReactNode;

export type LogoProps = PropsWithSpread<
  {
    /**
     * An icon to display in the tag.
     */
    icon?: ReactNode;
    /**
     * The logo image source URL.
     */
    src?: string;
    /**
     * The site's title.
     */
    title: string;
    /**
     * The URL to navigate to when the logo is clicked.
     */
    url: string;
  },
  HTMLProps<HTMLDivElement>
>;
