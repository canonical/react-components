import React from "react";
import classnames from "classnames";
import type { FC, PropsWithChildren } from "react";

export interface StickyProps {
  className?: string;
  position?: "top" | "bottom";
  key?: string;
}

const Sticky: FC<PropsWithChildren & StickyProps> = ({
  children,
  className,
  position = "top",
}) => {
  return (
    <div
      className={classnames("sticky-wrapper", className, {
        "sticky-wrapper--top": position === "top",
        "sticky-wrapper--bottom": position === "bottom",
      })}
    >
      {children}
    </div>
  );
};

export default Sticky;
