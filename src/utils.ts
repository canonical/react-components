import { NavLink, NavLinkAnchor, NavLinkButton } from "components/Navigation";
import { createElement, isValidElement, ReactNode } from "react";

export const IS_DEV = process.env.NODE_ENV === "development";

/**
 * Find substring and emphasise every match by wrapping it in a <strong /> element.
 * The result is a React node, so the input is never parsed as HTML.
 * @param {string} str - The string to search
 * @param {string} subString - The substring to find
 * @return {Obj} Object with the text (as React nodes) and match bool
 */
export const highlightSubString = (
  str?: string,
  subString?: string,
): { text: ReactNode; match: boolean } => {
  if (
    typeof str !== "string" ||
    typeof subString !== "string" ||
    subString === ""
  ) {
    return {
      text: str || "",
      match: false,
    };
  }

  const escapedSubstring = subString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // The capture group makes split() keep the matched text, at every odd index.
  const caseInsensitiveRegex = new RegExp(`(${escapedSubstring})`, "gi");
  const parts = str.split(caseInsensitiveRegex);

  if (parts.length === 1) {
    return {
      text: str,
      match: false,
    };
  }

  return {
    text: parts.map((part, index) =>
      index % 2 === 1 ? createElement("strong", { key: index }, part) : part,
    ),
    match: true,
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
  return element.offsetHeight + margin + 1;
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
