import { NavLink, NavLinkAnchor, NavLinkButton } from "components/Navigation";

export const IS_DEV = process.env.NODE_ENV === "development";

/**
 * Find substring and wrap in <strong /> tag
 * @param {string} str - The string to search
 * @param {string} subString - The substring to find
 * @return {Obj} newStr - Object with text and match bool
 */
export const highlightSubString = (
  str?: string,
  subString?: string
): { text: string; match: boolean } => {
  if (typeof str !== "string" || typeof subString !== "string") {
    return {
      text: str || "",
      match: false,
    };
  }
  const caseInsensitiveRegex = new RegExp(subString, "gi");
  const newStr = str.replace(
    caseInsensitiveRegex,
    (match) => `<strong>${match}</strong>`
  );

  return {
    text: subString === "" ? str : newStr,
    match: newStr !== str,
  };
};

/**
 * Whether a navigation item is an anchor.
 * @param link - The navigation item.
 */
export const isNavigationAnchor = (link: NavLink): link is NavLinkAnchor =>
  !!link.url;

/**
 * Whether a navigation item is a button.
 * @param link - The navigation item.
 */
export const isNavigationButton = (link: NavLink): link is NavLinkButton =>
  !link.url;
