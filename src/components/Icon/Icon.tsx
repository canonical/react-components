import classNames from "classnames";
import PropTypes from "prop-types";
import type { HTMLProps } from "react";
import React from "react";

export enum ICONS {
  plus = "plus",
  minus = "minus",
  expand = "expand",
  collapse = "collapse",
  spinner = "spinner",
  drag = "drag",
  close = "close",
  help = "help",
  information = "information",
  delete = "delete",
  externalLink = "external-link",
  chevronDown = "chevron-down",
  chevronUp = "chevron-up",
  menu = "menu",
  code = "code",
  copy = "copy",
  search = "search",
  share = "share",
  user = "user",
  anchor = "anchor",
  success = "success",
  warning = "warning",
  error = "error",
}

export type Props = {
  /**
   * Optional classes to add to the icon element.
   */
  className?: string;
  /**
   * Whether to show the light variant of the icon.
   */
  light?: boolean;
  /**
   * The name of the icon.
   */
  name: ICONS | string;
} & HTMLProps<HTMLElement>;

/**
 * Icon
 *
 * @param name One of built-in Vanilla icons or a name of a custom icon that follows `p-icon--{name}` convention.
 * @returns Icon
 */
const Icon = ({ className, light, name, ...props }: Props): JSX.Element => (
  <i
    className={classNames(className, `p-icon--${name}`, {
      "is-light": light,
    })}
    {...props}
  />
);

Icon.propTypes = {
  className: PropTypes.string,
  light: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default Icon;
