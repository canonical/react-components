import React, { FC, PropsWithChildren } from "react";

import classNames from "classnames";
import "./FadeInDown.scss";

export interface FadeInDownProps extends PropsWithChildren {
  isVisible: boolean;
  className?: string;
}

/**
 * EXPERIMENTAL: This component is experimental and should be used internally only.
 */
export const FadeInDown: FC<FadeInDownProps> = ({
  children,
  className,
  isVisible,
}) => {
  return (
    <div
      className={classNames("fade-in--down", className)}
      aria-hidden={isVisible ? "false" : "true"}
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
};
