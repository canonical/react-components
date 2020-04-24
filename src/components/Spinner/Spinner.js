import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

import "./Spinner.scss";

const Spinner = ({ className, text, isLight, inline }) => (
  <span
    className={classNames(className, "p-spinner", "p-text--default", {
      "p-spinner--inline": inline
    })}
  >
    <i
      className={classNames("p-icon--spinner", "u-animation--spin", {
        "is-light": isLight
      })}
    />
    {text && <span className="p-icon__text">{text}</span>}
  </span>
);

Spinner.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  isLight: PropTypes.bool,
  inline: PropTypes.bool
};

export default Spinner;
