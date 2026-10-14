import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { HTMLProps, ReactNode } from "react";

import { useWindowFitment } from "hooks";
import Button from "../../Button";
import type { ButtonProps } from "../../Button";
import type { WindowFitment } from "hooks";

export enum Label {
  Dropdown = "sub",
}

/**
 * The type of the menu links.
 * @template L - The type of the link props.
 */
export type MenuLink<L = null> = string | ButtonProps<L> | ButtonProps<L>[];

export type Position = "left" | "center" | "right";
type VerticalPosition = "top" | "bottom";

/**
 * The props for the ContextualMenuDropdown component.
 * @template L - The type of the link props.
 */
export type Props<L = null> = {
  adjustedPosition?: Position;
  autoAdjust?: boolean;
  handleClose?: (evt?: React.MouseEvent<HTMLButtonElement>) => void;
  constrainPanelWidth?: boolean;
  dropdownClassName?: string;
  dropdownContent?: ReactNode | ((close: () => void) => React.JSX.Element);
  id?: string;
  isOpen?: boolean;
  links?: MenuLink<L>[];
  position?: Position;
  positionCoords?: DOMRect;
  positionNode?: HTMLElement;
  scrollOverflow?: boolean;
  setAdjustedPosition?: (position: Position) => void;
  contextualMenuClassName?: string;
} & HTMLProps<HTMLSpanElement>;

/**
 * Calculate the styles for the menu.
 * @param position - The menu position.
 * @param positionCoords - The coordinates of the position node.
 * @param constrainPanelWidth - Whether the menu width should be constrained to the position width.
 */
const getPositionStyle = (
  position: Position,
  verticalPosition: VerticalPosition,
  positionCoords: Props["positionCoords"],
  constrainPanelWidth: Props["constrainPanelWidth"],
): React.CSSProperties => {
  if (!positionCoords) {
    return null;
  }
  const { height, left, top, width } = positionCoords;
  const topPos =
    verticalPosition === "bottom"
      ? top + height + (window.scrollY || 0)
      : top + (window.scrollY || 0);
  let leftPos = left;

  switch (position) {
    case "left":
      leftPos = left;
      break;
    case "center":
      leftPos = left + width / 2;
      break;
    case "right":
      leftPos = left + width;
      break;
    default:
      break;
  }

  return {
    position: "absolute",
    left: leftPos,
    top: topPos,
    // The width only needs to be set if the width is to be constrained.
    ...(constrainPanelWidth ? { width } : null),
  };
};

/**
 * Calculate the adjusted position in relation to the window.
 * @param position - The requested position.
 * @param fitsWindow - The window fitment info.
 * @return The new position.
 */
export const adjustForWindow = (
  position: Position,
  fitsWindow: WindowFitment,
): Position => {
  let newPosition: string = position;
  if (!fitsWindow.fromRight.fitsLeft && newPosition === "right") {
    newPosition = "left";
  }
  if (!fitsWindow.fromLeft.fitsRight && newPosition === "left") {
    newPosition = "right";
  }
  // If the menu doesn't fit to the left or the right then center it.
  if (
    !fitsWindow.fromLeft.fitsRight &&
    !fitsWindow.fromRight.fitsLeft &&
    (newPosition === "left" || newPosition === "right")
  ) {
    newPosition = "center";
  }
  // If the menu doesn't fit when centered then find a new position.
  if (
    newPosition === "center" &&
    (!fitsWindow.fromCenter.fitsCentered.fitsRight ||
      !fitsWindow.fromCenter.fitsCentered.fitsLeft)
  ) {
    if (fitsWindow.fromLeft.fitsRight) {
      newPosition = "left";
    }
    if (fitsWindow.fromRight.fitsLeft) {
      newPosition = "right";
    }
  }
  return newPosition as Position;
};

/**
 * Generate a menu link
 * @template L - The type of the link props.
 * @param link - A button
 * @param key - A key for the DOM.
 * @param handleClose - The function to close the menu.
 */
const generateLink = <L,>(
  link: ButtonProps,
  key: React.Key,
  handleClose: Props["handleClose"],
) => {
  const { children, className, onClick, ...props } = link;
  return (
    <Button<L>
      className={classNames("p-contextual-menu__link", className)}
      key={key}
      role="menuitem"
      onClick={
        onClick
          ? (evt) => {
              handleClose(
                evt.nativeEvent as unknown as React.MouseEvent<HTMLButtonElement>,
              );
              onClick(evt);
            }
          : null
      }
      {...props}
    >
      {children}
    </Button>
  );
};

// nearest parents z-index that is not 0 or auto
export const getNearestParentsZIndex = (
  element: HTMLElement | null,
): string => {
  if (!window || !element) {
    return "0";
  }
  const zIndex = window
    .getComputedStyle(element, null)
    .getPropertyValue("z-index");
  if (!element.parentElement) {
    return zIndex;
  }
  if (zIndex === "auto" || zIndex === "0" || zIndex === "") {
    return getNearestParentsZIndex(element.parentElement);
  }
  return zIndex;
};

const ContextualMenuDropdown = <L,>({
  adjustedPosition,
  autoAdjust,
  handleClose,
  constrainPanelWidth,
  dropdownClassName,
  dropdownContent,
  id,
  isOpen,
  links,
  position,
  positionCoords,
  positionNode,
  scrollOverflow,
  setAdjustedPosition,
  contextualMenuClassName,
  ...props
}: Props<L>): React.JSX.Element => {
  const dropdown = useRef<HTMLDivElement>(null);
  const [verticalLayout, setVerticalLayout] = useState<{
    position: VerticalPosition;
    maxHeight?: number;
  }>({ position: "bottom" });
  const [positionStyle, setPositionStyle] = useState(
    getPositionStyle(
      adjustedPosition,
      verticalLayout.position,
      positionCoords,
      constrainPanelWidth,
    ),
  );
  // Update the styles to position the menu.
  const updatePositionStyle = useCallback(() => {
    setPositionStyle(
      getPositionStyle(
        adjustedPosition,
        verticalLayout.position,
        positionCoords,
        constrainPanelWidth,
      ),
    );
  }, [
    adjustedPosition,
    positionCoords,
    verticalLayout.position,
    constrainPanelWidth,
  ]);

  const updateVerticalPosition = useCallback(() => {
    if (!positionNode || !dropdown.current) {
      return;
    }
    const toggleRect = positionNode.getBoundingClientRect();
    const spaceAbove = Math.max(0, toggleRect.top);
    const spaceBelow = Math.max(0, window.innerHeight - toggleRect.bottom);
    const safetyMargin = scrollOverflow ? 16 : 0;
    const availableAbove = Math.max(0, spaceAbove - safetyMargin);
    const availableBelow = Math.max(0, spaceBelow - safetyMargin);
    const desiredHeight =
      dropdown.current.scrollHeight ||
      dropdown.current.getBoundingClientRect().height ||
      0;

    let nextPosition = verticalLayout.position;
    if (autoAdjust) {
      if (desiredHeight <= availableBelow) {
        nextPosition = "bottom";
      } else if (desiredHeight <= availableAbove) {
        nextPosition = "top";
      } else {
        nextPosition = availableBelow >= availableAbove ? "bottom" : "top";
      }
    }

    const availableHeight =
      nextPosition === "bottom" ? availableBelow : availableAbove;
    const nextLayout = {
      position: nextPosition,
      maxHeight: scrollOverflow ? availableHeight : undefined,
    };
    setVerticalLayout((currentLayout) => {
      if (
        currentLayout.position === nextLayout.position &&
        currentLayout.maxHeight === nextLayout.maxHeight
      ) {
        return currentLayout;
      }
      return nextLayout;
    });
  }, [autoAdjust, positionNode, scrollOverflow, verticalLayout.position]);

  // Update the position when the window fitment info changes.
  const onUpdateWindowFitment = useCallback(
    (fitsWindow: WindowFitment) => {
      if (autoAdjust) {
        setAdjustedPosition(adjustForWindow(position, fitsWindow));
      }
    },
    [autoAdjust, position, setAdjustedPosition],
  );

  // Handle adjusting the horizontal position and scrolling of the dropdown so that it remains on screen.
  useWindowFitment(
    dropdown.current,
    positionNode,
    onUpdateWindowFitment,
    0,
    isOpen && autoAdjust,
  );

  // Update the styles when the position changes.
  useEffect(() => {
    updatePositionStyle();
  }, [adjustedPosition, updatePositionStyle]);

  useEffect(() => {
    updateVerticalPosition();
  }, [updateVerticalPosition, isOpen]);

  useEffect(() => {
    if (!isOpen || (!autoAdjust && !scrollOverflow)) return undefined;

    window.addEventListener("resize", updateVerticalPosition);
    window.addEventListener("scroll", updateVerticalPosition, true);
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updateVerticalPosition);
    const dropdownNode = dropdown.current;
    if (positionNode) resizeObserver?.observe(positionNode);
    if (dropdownNode) {
      resizeObserver?.observe(dropdownNode);
      Array.from(dropdownNode.children).forEach((child) =>
        resizeObserver?.observe(child),
      );
    }
    const mutationObserver =
      dropdownNode && typeof MutationObserver !== "undefined"
        ? new MutationObserver(() => {
            if (dropdownNode) {
              Array.from(dropdownNode.children).forEach((child) =>
                resizeObserver?.observe(child),
              );
            }
            updateVerticalPosition();
          })
        : null;
    mutationObserver?.observe(dropdownNode, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("resize", updateVerticalPosition);
      window.removeEventListener("scroll", updateVerticalPosition, true);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [
    autoAdjust,
    isOpen,
    positionNode,
    scrollOverflow,
    updateVerticalPosition,
  ]);

  useEffect(() => {
    if (!dropdown.current) return;

    // align z-index: when we are in a modal context, we want the dropdown to be above the modal
    // apply the nearest parents z-index + 1
    const zIndex = getNearestParentsZIndex(positionNode);
    if (parseInt(zIndex) > 0) {
      dropdown.current.parentElement?.style.setProperty("z-index", zIndex + 1);
    }
  }, [positionNode]);

  return (
    // Vanilla Framework uses .p-contextual-menu parent modifier classnames to determine the correct position of the .p-contextual-menu__dropdown dropdown (left, center, right).
    // Extra span wrapper is required as the dropdown is rendered in a portal.
    <span className={contextualMenuClassName} style={positionStyle}>
      <span
        className={classNames("p-contextual-menu__dropdown", dropdownClassName)}
        role="menu"
        id={id}
        aria-hidden={isOpen ? "false" : "true"}
        aria-label={Label.Dropdown}
        ref={dropdown}
        style={{
          ...(constrainPanelWidth && positionStyle?.width
            ? { width: positionStyle.width, minWidth: 0, maxWidth: "none" }
            : {}),
          ...(scrollOverflow && verticalLayout.maxHeight !== undefined
            ? {
                maxHeight: verticalLayout.maxHeight,
                minHeight: Math.min(32, verticalLayout.maxHeight),
                overflowX: "auto",
                overflowY: "auto",
              }
            : {}),
          ...(verticalLayout.position === "top" ? { bottom: "0" } : {}),
        }}
        {...props}
      >
        {dropdownContent
          ? typeof dropdownContent === "function"
            ? dropdownContent(handleClose)
            : dropdownContent
          : links.map((item, i) => {
              if (Array.isArray(item)) {
                return (
                  <span className="p-contextual-menu__group" key={i}>
                    {item.map((link, j) =>
                      generateLink<L>(link, j, handleClose),
                    )}
                  </span>
                );
              } else if (typeof item === "string") {
                return (
                  <div className="p-contextual-menu__non-interactive" key={i}>
                    {item}
                  </div>
                );
              }
              return generateLink<L>(item, i, handleClose);
            })}
      </span>
    </span>
  );
};

export default ContextualMenuDropdown;
