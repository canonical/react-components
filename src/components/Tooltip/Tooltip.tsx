import classNames from "classnames";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import type {
  FocusEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
} from "react";

import { useWindowFitment, useListener } from "hooks";
import type { WindowFitment } from "hooks";

import type { ClassName, ValueOf } from "types";

import { usePortal } from "external";

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

export type Props = {
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
  /**
   * The z-index value of the tooltip message element.
   */
  zIndex?: number;
  /**
   * Delay in ms after which Tooltip will appear (defaults to 350ms).
   */
  delay?: number;
};

const getPositionStyle = (
  pos: Position,
  wrapperNode: HTMLElement,
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
  fitsWindow: WindowFitment,
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
 * This is the [React](https://reactjs.org/) component for Vanilla [Tooltips](https://vanillaframework.io/docs/patterns/tooltips).
 *
 * Tooltips are text labels that appear when the user hovers over, focuses on, or touches an element on the screen.
 *
 * They can be used to provide information about concepts/terms/actions that are not self-explanatory or well known.
 *
 * An alternative use of tooltips is to provide information on a disabled actionable element, e.g. for disabled buttons, providing information about why they are disabled.
 */
const Tooltip = ({
  autoAdjust = true,
  children,
  className,
  followMouse = false,
  message,
  position = "top-left",
  positionElementClassName,
  tooltipClassName,
  zIndex,
  delay = 350,
}: Props): React.JSX.Element => {
  const wrapperRef = useRef<HTMLElement>(null);
  const messageRef = useRef<HTMLElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const [positionStyle, setPositionStyle] = useState<PositionStyle>({
    position: "absolute",
    // Initially position the tooltip of the screen in case it gets shown
    // before setting the position.
    left: -9999999,
    top: -9999999,
  });
  const { openPortal, closePortal, isOpen, Portal } = usePortal({
    programmaticallyOpen: true,
  });
  const tooltipId = useId();
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const cancelableClosePortal = useCallback(() => {
    clearTimeout(timer);
    closePortal();
  }, [timer, closePortal]);

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
    (fitsWindow: WindowFitment) => {
      setAdjustedPosition(adjustForWindow(position, fitsWindow));
    },
    [setAdjustedPosition, position],
  );

  // Handle mouse events.
  useListener(
    wrapperRef.current,
    mouseHandler,
    "mousemove",
    true,
    followMouse && isOpen,
  );

  // Handle adjusting the position of the tooltip so that it remains on screen.
  useWindowFitment(
    messageRef.current,
    wrapperRef.current,
    onUpdateWindowFitment,
    20,
    isOpen,
    autoAdjust && followMouse,
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cancelableClosePortal();
      }
    },
    [cancelableClosePortal],
  );

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleBlur = (e: FocusEvent | MouseEvent) => {
    // do not close if the focus is within the tooltip wrapper
    if (wrapperRef?.current?.contains(document.activeElement)) {
      return;
    }

    if (
      e.relatedTarget
        ? !messageRef.current?.contains(e.relatedTarget as HTMLElement) &&
          !wrapperRef.current?.contains(e.relatedTarget as HTMLElement)
        : e.target !== messageRef.current
    ) {
      cancelableClosePortal();
    }
  };

  const handleClick = (e: MouseEvent) => {
    // ignore clicks within the tooltip message
    if (messageRef.current?.contains(e.target as HTMLElement)) {
      return;
    }
    (e.target as HTMLElement).focus();
    openPortal();
  };

  const handleFocus = () => {
  if (followMouse) {
    if (wrapperRef.current) {
      // set initial position for the tooltip
      setPositionStyle(
        getPositionStyle(adjustedPosition, wrapperRef.current)
      );
    }
  }
  openPortal();
}

  const delayedOpenPortal: MouseEventHandler = useCallback(() => {
    if (isOpen) {
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    const timeout = setTimeout(() => openPortal(), delay);
    setTimer(timeout);
  }, [delay, openPortal, timer, isOpen]);

  return (
    <>
      {message ? (
        <span
          className={className}
          onBlur={handleBlur}
          onClick={handleClick}
          onFocus={handleFocus}
          onMouseOut={handleBlur}
          onMouseOver={delayedOpenPortal}
        >
          <span
            className={positionElementClassName}
            ref={wrapperRef}
            style={{ display: "inline-block" }}
          >
            {React.Children.map(children, (child) =>
              child && React.isValidElement(child)
                ? React.cloneElement(child, {
                    "aria-describedby": isOpen ? tooltipId : undefined,
                  } as React.HTMLAttributes<HTMLElement>)
                : child,
            )}
          </span>
          {isOpen ? (
            <Portal>
              <span
                className={classNames(
                  `p-tooltip--${adjustedPosition}`,
                  "is-detached",
                  tooltipClassName,
                )}
                data-testid="tooltip-portal"
                style={positionStyle as React.CSSProperties}
              >
                <span
                  role="tooltip"
                  className="p-tooltip__message"
                  onClick={(event) => {
                    // Prevent clicks inside the message from bubbling to parent
                    // click handlers.
                    event.stopPropagation();
                  }}
                  ref={messageRef}
                  id={tooltipId}
                  style={{ zIndex: zIndex }}
                >
                  {message}
                </span>
              </span>
            </Portal>
          ) : null}
        </span>
      ) : (
        <span className={className}>{children}</span>
      )}
    </>
  );
};

export default Tooltip;
