import classNames from "classnames";
import PropTypes from "prop-types";
import React, { HTMLAttributes } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  external?: boolean;
  href?: string;
  inverted?: boolean;
  soft?: boolean;
  top?: boolean;
} & HTMLAttributes<HTMLAnchorElement>;

const Link = ({
  children,
  className,
  external = false,
  href = "#",
  inverted = false,
  soft = false,
  top = false,
  ...linkProps
}: Props): JSX.Element => {
  const link = (
    <a
      className={classNames(className, {
        "p-link--external": external,
        "p-link--inverted": inverted,
        "p-link--soft": soft,
        "p-top__link": top,
      })}
      href={href}
      {...linkProps}
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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  inverted: PropTypes.bool,
  soft: PropTypes.bool,
  top: PropTypes.bool,
};

export default Link;
