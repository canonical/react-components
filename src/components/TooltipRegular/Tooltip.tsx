import classNames from "classnames";
import React, { useRef } from "react";
import type { ReactNode, ReactElement } from "react";

import { useId } from "hooks";
import type { ClassName } from "types";

export type CSSPosition =
  | "static"
  | "absolute"
  | "fixed"
  | "relative"
  | "sticky"
  | "initial"
  | "inherit";

export type Position =
  | "btm-center"
  | "btm-left"
  | "btm-right"
  | "left"
  | "right"
  | "top-center"
  | "top-left"
  | "top-right";

export type Props = {
  /**
   * Element to attach the tooltip to.
   */
  children: ReactElement;
  /**
   * An optional class to apply to the wrapping element.
   */
  className?: ClassName;
  /**
   * Message to display when the element is hovered.
   */
  message?: ReactNode;
  /**
   * Position of the tooltip relative to the element.
   */
  position?: Position;
};

const Tooltip = ({
  children,
  className,
  message,
  position = "top-left",
}: Props): JSX.Element => {
  const id = useId();
  const tooltipRef = useRef<HTMLElement>(null);

  return (
    <>
      {message ? (
        <>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              "aria-describedby": id,
              className: classNames("p-tooltip", child?.props?.className, {
                [`p-tooltip--${position}`]: !!position,
              }),
              children: (
                <>
                  {child?.props?.children}
                  <span
                    ref={tooltipRef}
                    id={id}
                    role="tooltip"
                    className={classNames("p-tooltip__message", className)}
                  >
                    {message}
                  </span>
                </>
              ),
            })
          )}
        </>
      ) : (
        children
      )}
    </>
  );
};

export default Tooltip;
