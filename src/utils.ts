import { NavLink, NavLinkAnchor, NavLinkButton } from "components/Navigation";
import { isValidElement, ReactNode } from "react";

export const IS_DEV = process.env.NODE_ENV === "development";

/**
 * Find substring and wrap in <strong /> tag
 * @param {string} str - The string to search
 * @param {string} subString - The substring to find
 * @return {Obj} newStr - Object with text and match bool
 */
export const highlightSubString = (
  str?: string,
  subString?: string,
): { text: string; match: boolean } => {
  if (typeof str !== "string" || typeof subString !== "string") {
    return {
      text: str || "",
      match: false,
    };
  }

  const escapedSubstring = subString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const caseInsensitiveRegex = new RegExp(escapedSubstring, "gi");
  const newStr = str.replace(
    caseInsensitiveRegex,
    (match) => `<strong>${match}</strong>`,
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

/**
 * A typeguard for whether an element is a ReactNode.
 */
export const isReactNode = (element: unknown): element is ReactNode =>
  isValidElement(element);

export const getElementAbsoluteHeight = (element: HTMLElement) => {
  if (!element) {
    return 0;
  }
  const style = window.getComputedStyle(element);
  const margin = toFloat(style.marginTop) + toFloat(style.marginBottom);
  const padding = toFloat(style.paddingTop) + toFloat(style.paddingBottom);
  return element.offsetHeight + margin + padding + 1;
};

export const getAbsoluteHeightBelowById = (belowId: string): number => {
  const element = belowId ? document.getElementById(belowId) : undefined;
  if (!element) {
    return 0;
  }
  return getElementAbsoluteHeight(element);
};

export const getParentsBottomSpacing = (element: Element): number => {
  let sum = 0;
  while (element.parentElement) {
    element = element.parentElement;
    const style = window.getComputedStyle(element);
    const margin = toFloat(style.marginBottom);
    const padding = toFloat(style.paddingBottom);
    sum += margin + padding;
  }
  return sum;
};

export const toFloat = (value: string): number => {
  const result = parseFloat(value);
  return Number.isNaN(result) ? 0 : result;
};
