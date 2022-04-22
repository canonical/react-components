import type { HTMLProps } from "react";
import React from "react";
import { PropsWithSpread } from "types";

import type { GenerateLink, NavLink } from "../types";

type Props = PropsWithSpread<
  NavLink & {
    generateLink?: GenerateLink;
  },
  HTMLProps<HTMLAnchorElement>
>;

/**
 * This component is used internally to display links inside the Navigation component.
 */
const NavigationLink = ({
  generateLink,
  isSelected,
  label,
  url,
  ...props
}: Props): JSX.Element => {
  const ariaCurrent = isSelected ? "page" : undefined;
  if (generateLink) {
    // If a function has been provided then use it to generate the link element.
    return (
      <>
        {generateLink({
          isSelected,
          label,
          url,
          "aria-current": ariaCurrent,
          ...props,
        })}
      </>
    );
  } else {
    // If a function has not been provided then use a standard anchor element.
    return (
      <a href={url} {...props} aria-current={ariaCurrent}>
        {label}
      </a>
    );
  }
};

export default NavigationLink;
