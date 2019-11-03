import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Link = ({
  children,
  className,
  external,
  href = "#",
  inverted,
  soft,
  top,
  ...props
}) => {
  const link = (
    <a
      className={classNames(className, {
        "p-link--external": external,
        "p-link--inverted": inverted,
        "p-link--soft": soft,
        "p-top__link": top
      })}
      href={href}
      {...props}
    >
      {children}
    </a>
  );
  if (top) {
    return <div className="p-top">{link}</div>;
  }
  return link;
};

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  inverted: PropTypes.bool,
  soft: PropTypes.bool,
  top: PropTypes.bool
};

export default Link;
