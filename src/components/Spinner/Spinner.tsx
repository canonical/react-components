import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

type Props = {
  className?: string;
  text?: string;
  isLight?: boolean;
};

const Spinner = ({ className, text, isLight = false }: Props): JSX.Element => (
  <span className={classNames(className, "p-text--default")}>
    <i
      className={classNames("p-icon--spinner", "u-animation--spin", {
        "is-light": isLight,
      })}
    />
    {text && (
      <>
        &ensp;
        <span>{text}</span>
      </>
    )}
  </span>
);

Spinner.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  isLight: PropTypes.bool,
};

export default Spinner;
