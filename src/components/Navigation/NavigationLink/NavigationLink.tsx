import React from "react";
import { isNavigationAnchor, isNavigationButton } from "utils";

import type { GenerateLink, NavLink } from "../types";

type Props = {
  generateLink?: GenerateLink;
  link: NavLink;
};

/**
 * This component is used internally to display links inside the Navigation component.
 */
const NavigationLink = ({ generateLink, link }: Props): JSX.Element | null => {
  // const ariaCurrent = isSelected ? "page" : undefined;
  if (generateLink) {
    const { isSelected, ...linkProps } = link;
    // If a function has been provided then use it to generate the link element.
    return (
      <>
        {generateLink({
          isSelected,
          "aria-current": isSelected ? "page" : undefined,
          ...linkProps,
        })}
      </>
    );
  } else if (isNavigationAnchor(link)) {
    const { isSelected, label, url, ...linkProps } = link;
    return (
      <a
        {...linkProps}
        href={url}
        aria-current={isSelected ? "page" : undefined}
      >
        {label}
      </a>
    );
  } else if (isNavigationButton(link)) {
    const { isSelected, label, url, ...linkProps } = link;
    return (
      <button {...linkProps} aria-current={isSelected ? "page" : undefined}>
        {label}
      </button>
    );
  }
  return null;
};

export default NavigationLink;
