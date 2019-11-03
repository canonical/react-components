import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Card = ({
  children,
  className,
  highlighted,
  overlay,
  title,
  thumbnail,
  ...props
}) => (
  <div
    className={classNames(className, {
      "p-card": !highlighted && !overlay,
      "p-card--highlighted": highlighted,
      "p-card--overlay": overlay
    })}
    {...props}
  >
    {thumbnail && (
      <>
        <img className="p-card__thumbnail" src={thumbnail} alt="" />
        <hr className="u-sv1" />
      </>
    )}
    {title && <h3 className="p-card__title">{title}</h3>}
    <div className="p-card__content">{children}</div>
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  highlighted: PropTypes.bool,
  overlay: PropTypes.bool,
  title: PropTypes.node,
  thumbnail: PropTypes.string
};

export default Card;
