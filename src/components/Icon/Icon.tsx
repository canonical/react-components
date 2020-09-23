import React from "react";
import PropTypes from "prop-types";

type Props = {
  name: string;
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
