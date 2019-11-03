import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

import "./Loader.scss";

const Loader = ({ className, text, isLight, inline }) => (
  <div
    className={classNames(className, "p-loader", "p-text--default", {
      "p-loader--inline": inline
    })}
  >
    <i
      className={classNames("p-icon--spinner", "u-animation--spin", {
        "is-light": isLight
      })}
    />
    {text && <span className="p-icon__text">{text}</span>}
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  isLight: PropTypes.bool,
  inline: PropTypes.bool
};

export default Loader;
