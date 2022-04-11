import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import usePortal from "react-useportal";

import { useWindowFitment, useListener } from "hooks";
import type { WindowFitment } from "hooks";

import type { ClassName, ValueOf } from "types";
import TooltipRegular, { TooltipRegularProps } from "components/TooltipRegular";

export type CSSPosition =
  | "static"
  | "absolute"
  | "fixed"
  | "relative"
  | "sticky"
  | "initial"
  | "inherit";

export type PositionStyle = {
  left: number;
  pointerEvents?: string;
  position: CSSPosition;
  top: number;
};

export const position = {
  btmCenter: "btm-center",
  btmLeft: "btm-left",
  btmRight: "btm-right",
  left: "left",
  right: "right",
  topCenter: "top-center",
  topLeft: "top-left",
  topRight: "top-right",
} as const;

export type Position = ValueOf<typeof position>;

export const variant = {
  regular: "regular",
  detached: "detached",
} as const;
type Variant = ValueOf<typeof variant>;

export type Props = {
  /**
   * Variant of the tooltip.
   */
  variant?: Variant;
  /**
   * Whether the tooltip should adjust to fit in the screen.
   */
  autoAdjust?: boolean;
  /**
   * Element on which to apply the tooltip.
   */
  children: ReactNode;
  /**
   * An optional class to apply to the wrapping element.
   */
  className?: ClassName;
  /**
   * Whether the tooltip should follow the mouse.
   */
  followMouse?: boolean;
  /**
   * Message to display when the element is hovered.
   */
  message?: ReactNode;
  /**
   * Position of the tooltip relative to the element.
   */
  position?: Position;
  /**
   * An optional class to apply to the element that wraps the children.
   */
  positionElementClassName?: string;
  /**
   * An optional class to apply to the tooltip message element.
   */
  tooltipClassName?: string;
};

const getPositionStyle = (
  pos: Position,
  wrapperNode: HTMLElement
): PositionStyle => {
  if (!wrapperNode) {
    return null;
  }

  const dimensions = wrapperNode.getBoundingClientRect();
  const { x, y, height, width } = dimensions;
  let left = x + window.scrollX || 0;
  let top = y + window.scrollY || 0;

  switch (pos) {
    case "btm-center":
      left += width / 2;
      top += height;
      break;
    case "btm-left":
      top += height;
      break;
    case "btm-right":
      left += width;
      top += height;
      break;
    case "left":
      top += height / 2;
      break;
    case "right":
      left += width;
      top += height / 2;
      break;
    case "top-center":
      left += width / 2;
      break;
    case "top-left":
      break;
    case "top-right":
      left += width;
      break;
    default:
      break;
  }
  return { position: "absolute", left, top };
};

export const adjustForWindow = (
  position: Position,
  fitsWindow: WindowFitment
): Position => {
  let newPosition: string = position;
  if (!fitsWindow.fromLeft.fitsLeft && newPosition === "left") {
    newPosition = "top-right";
  }
  if (!fitsWindow.fromRight.fitsRight && newPosition === "right") {
    newPosition = "top-left";
  }
  if (!fitsWindow.fromRight.fitsLeft && newPosition.endsWith("-right")) {
    newPosition = newPosition.replace("right", "left");
  }
  if (!fitsWindow.fromLeft.fitsRight && newPosition.endsWith("-left")) {
    newPosition = newPosition.replace("left", "right");
  }
  if (!fitsWindow.fromTop.fitsAbove && newPosition.startsWith("top")) {
    newPosition = newPosition.replace("top", "btm");
  }
  if (!fitsWindow.fromBottom.fitsBelow && newPosition.startsWith("btm")) {
    newPosition = newPosition.replace("btm", "top");
  }
  if (
    !fitsWindow.fromLeft.fitsRight &&
    !fitsWindow.fromRight.fitsLeft &&
    (newPosition.endsWith("-left") || newPosition.endsWith("-right"))
  ) {
    newPosition = newPosition
      .replace("left", "center")
      .replace("right", "center");
  }
  if (
    newPosition.endsWith("center") &&
    (fitsWindow.fromCenter.fitsCentered.fitsRight ||
      fitsWindow.fromCenter.fitsCentered.fitsLeft)
  ) {
    if (!fitsWindow.fromCenter.fitsCentered.fitsRight) {
      newPosition = newPosition.replace("center", "right");
    }
    if (!fitsWindow.fromCenter.fitsCentered.fitsLeft) {
      newPosition = newPosition.replace("center", "left");
    }
  }
  return newPosition as Position;
};

/**
 * A React component for Vanilla tooltips.
 * @param [autoAdjust=true] Whether the tooltip should adjust to fit in the screen.
 * @param children Element on which to apply the tooltip.
 * @param className An optional class to apply to the wrapping element.
 * @param [followMouse=false] Whether the tooltip should follow the mouse.
 * @param message Message to display when the element is hovered.
 * @param [position="top-left"] Position of the tooltip relative to the element.
 * @param positionElementClassName An optional class to apply to the element that wraps the children.
 * @param tooltipClassName An optional class to apply to the tooltip message element.
 */
const TooltipDetached = ({
  autoAdjust = true,
  children,
  className,
  followMouse = false,
  message,
  position = "top-left",
  positionElementClassName,
  tooltipClassName,
}: Props): JSX.Element => {
  const wrapperRef = useRef<HTMLElement>(null);
  const messageRef = useRef<HTMLElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const [positionStyle, setPositionStyle] = useState<PositionStyle>({
    position: "absolute",
    // Initially position the tooltip of the screen in case it gets shown
    // before setting the position.
    left: -99999999999999,
    top: -99999999999999,
  });
  const { openPortal, closePortal, isOpen, Portal } = usePortal();

  useEffect(() => {
    if (isOpen && !followMouse && wrapperRef.current) {
      // Position the tooltip when it becomes visible.
      setPositionStyle(getPositionStyle(adjustedPosition, wrapperRef.current));
    }
  }, [adjustedPosition, isOpen, followMouse]);

  const mouseHandler = useCallback((evt: MouseEvent) => {
    // Set the position of the tooltip next to the mouse.
    setPositionStyle({
      // Don't allow the tooltip to block the mouse events.
      pointerEvents: "none",
      position: "absolute",
      left: evt.pageX,
      top: evt.pageY,
    });
  }, []);

  const onUpdateWindowFitment = useCallback(
    (fitsWindow) => {
      setAdjustedPosition(adjustForWindow(position, fitsWindow));
    },
    [setAdjustedPosition, position]
  );

  // Handle mouse events.
  useListener(
    wrapperRef.current,
    mouseHandler,
    "mousemove",
    true,
    followMouse && isOpen
  );

  // Handle adjusting the position of the tooltip so that it remains on screen.
  useWindowFitment(
    messageRef.current,
    wrapperRef.current,
    onUpdateWindowFitment,
    20,
    isOpen,
    autoAdjust && followMouse
  );

  const handleBlur = (e) => {
    if (
      e.relatedTarget
        ? !messageRef.current?.contains(e.relatedTarget)
        : e.target !== messageRef.current
    ) {
      closePortal();
    }
  };

  return (
    <>
      {message ? (
        <span
          className={className}
          onBlur={handleBlur}
          onFocus={openPortal}
          onMouseOut={handleBlur}
          onMouseOver={openPortal}
        >
          <span
            className={positionElementClassName}
            ref={wrapperRef}
            style={{ display: "inline-block" }}
          >
            {children}
          </span>
          {isOpen && (
            <Portal>
              <span
                role="tooltip"
                className={classNames(
                  `p-tooltip--${adjustedPosition}`,
                  "is-detached",
                  tooltipClassName
                )}
                data-testid="tooltip-portal"
                style={positionStyle as React.CSSProperties}
              >
                <span className="p-tooltip__message" ref={messageRef}>
                  {message}
                </span>
              </span>
            </Portal>
          )}
        </span>
      ) : (
        <span className={className}>{children}</span>
      )}
    </>
  );
};

const Tooltip = ({
  variant,
  ...props
}: { variant?: Variant } & (Props | TooltipRegularProps)) =>
  variant === "regular" ? (
    <TooltipRegular {...(props as TooltipRegularProps)} />
  ) : (
    <TooltipDetached {...(props as Props)} />
  );

export default Tooltip;
