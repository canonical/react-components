import classNames from "classnames";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { HTMLProps, ReactNode } from "react";

import { useWindowFitment } from "hooks";
import Button from "../../Button";
import type { ButtonProps } from "../../Button";
import type { WindowFitment } from "hooks";

export enum Label {
  Dropdown = "submenu",
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
  handleClose?: (evt?: MouseEvent) => void;
  constrainPanelWidth?: boolean;
  dropdownClassName?: string;
  dropdownContent?: ReactNode | ((close: () => void) => ReactElement);
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
      onClick={
        onClick
          ? (evt) => {
              handleClose(evt.nativeEvent);
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

const getClosestScrollableParent = (
  node: HTMLElement | null,
): HTMLElement | null => {
  let currentNode = node;
  while (currentNode && currentNode !== document.body) {
    const { overflowY, overflowX } = window.getComputedStyle(currentNode);
    if (
      ["auto", "scroll", "overlay"].includes(overflowY) &&
      ["auto", "scroll", "overlay"].includes(overflowX)
    ) {
      return currentNode;
    }
    currentNode = currentNode.parentElement;
  }
  return document.body;
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
}: Props<L>): JSX.Element => {
  const dropdown = useRef<HTMLDivElement>(null);
  const [verticalPosition, setVerticalPosition] =
    useState<VerticalPosition>("bottom");
  const [positionStyle, setPositionStyle] = useState(
    getPositionStyle(
      adjustedPosition,
      verticalPosition,
      positionCoords,
      constrainPanelWidth,
    ),
  );
  const [maxHeight, setMaxHeight] = useState<number>();
  // Update the styles to position the menu.
  const updatePositionStyle = useCallback(() => {
    setPositionStyle(
      getPositionStyle(
        adjustedPosition,
        verticalPosition,
        positionCoords,
        constrainPanelWidth,
      ),
    );
  }, [adjustedPosition, positionCoords, verticalPosition, constrainPanelWidth]);

  const updateVerticalPosition = useCallback(() => {
    if (!positionNode) {
      return null;
    }
    const scrollableParent = getClosestScrollableParent(positionNode);
    if (!scrollableParent) {
      return null;
    }

    const scrollableParentRect = scrollableParent.getBoundingClientRect();
    const toggleRect = positionNode.getBoundingClientRect();

    // Calculate the rect in relation to the scrollableParent
    const relativeToScrollParentRect = {
      top: toggleRect.top - scrollableParentRect.top,
      bottom: toggleRect.bottom - scrollableParentRect.top,
    };

    const scrollParentSpaceBelow =
      scrollableParentRect.height - relativeToScrollParentRect.bottom;
    const scrollParentSpaceAbove = relativeToScrollParentRect.top;

    const dropdownHeight = dropdown.current.getBoundingClientRect().height ?? 0;

    const windowSpaceBelow = window.innerHeight - toggleRect.bottom;

    setVerticalPosition(
      (scrollParentSpaceBelow >= dropdownHeight &&
        windowSpaceBelow >= dropdownHeight) ||
        windowSpaceBelow > scrollParentSpaceAbove
        ? "bottom"
        : "top",
    );
  }, [positionNode]);

  // Update the position when the window fitment info changes.
  const onUpdateWindowFitment = useCallback(
    (fitsWindow: WindowFitment) => {
      if (autoAdjust) {
        setAdjustedPosition(adjustForWindow(position, fitsWindow));
        updateVerticalPosition();
      }
      if (scrollOverflow) {
        setMaxHeight(fitsWindow.fromBottom.spaceBelow - 16);
      }
    },
    [
      autoAdjust,
      position,
      scrollOverflow,
      setAdjustedPosition,
      updateVerticalPosition,
    ],
  );

  // Handle adjusting the horizontal position and scrolling of the dropdown so that it remains on screen.
  useWindowFitment(
    dropdown.current,
    positionNode,
    onUpdateWindowFitment,
    0,
    isOpen && (autoAdjust || scrollOverflow),
  );

  // Update the styles when the position changes.
  useEffect(() => {
    updatePositionStyle();
  }, [adjustedPosition, updatePositionStyle]);

  useEffect(() => {
    updateVerticalPosition();
  }, [updateVerticalPosition]);

  return (
    // Vanilla Framework uses .p-contextual-menu parent modifier classnames to determine the correct position of the .p-contextual-menu__dropdown dropdown (left, center, right).
    // Extra span wrapper is required as the dropdown is rendered in a portal.
    <span className={contextualMenuClassName} style={positionStyle}>
      <span
        className={classNames("p-contextual-menu__dropdown", dropdownClassName)}
        id={id}
        aria-hidden={isOpen ? "false" : "true"}
        aria-label={Label.Dropdown}
        ref={dropdown}
        style={{
          ...(constrainPanelWidth && positionStyle?.width
            ? { width: positionStyle.width, minWidth: 0, maxWidth: "none" }
            : {}),
          ...(scrollOverflow
            ? { maxHeight, minHeight: "2rem", overflowX: "auto" }
            : {}),
          ...(verticalPosition === "top" ? { bottom: "0" } : {}),
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
