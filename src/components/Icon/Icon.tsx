import React from "react";
import PropTypes from "prop-types";

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
  contextualMenu = "contextual-menu",
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

type Props = {
  name: ICONS | string;
};

/**
 * Icon
 *
 * @param name One of built-in Vanilla icons or a name of a custom icon that follows `p-icon--{name}` convention.
 * @returns Icon
 */
const Icon = ({ name }: Props): JSX.Element => (
  <i className={`p-icon--${name}`} />
);

Icon.propTypes = {
  name: PropTypes.string,
};

export default Icon;
