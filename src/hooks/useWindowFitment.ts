import { useCallback, useEffect, useRef } from "react";

import { useListener } from "./useListener";

export type WindowFitment = {
  fromTop: {
    // Whether the target element fits between the top edge of the reference
    // element and the top edge of the window.
    fitsAbove: boolean;
    // Whether the target element fits between the top edge of the reference
    // element and the bottom edge of the window.
    fitsBelow: boolean;
    // The available space between the top edge of the reference
    // element and the top edge of the window.
    spaceAbove: number;
    // The available space between the top edge of the reference
    // element and the bottom edge of the window.
    spaceBelow: number;
  };
  fromBottom: {
    // Whether the target element fits between the bottom edge of the reference
    // element and the top edge of the window.
    fitsAbove: boolean;
    // Whether the target element fits between the bottom edge of the reference
    // element and the bottom edge of the window.
    fitsBelow: boolean;
    // The available space between the bottom edge of the reference
    // element and the top edge of the window.
    spaceAbove: number;
    // The available space between the bottom edge of the reference
    // element and the bottom edge of the window.
    spaceBelow: number;
  };
  fromLeft: {
    // Whether the target element fits between the left edge of the reference
    // element and the left edge of the window.
    fitsLeft: boolean;
    // Whether the target element fits between the left edge of the reference
    // element and the right edge of the window.
    fitsRight: boolean;
    // The available space between the left edge of the reference
    // element and the left edge of the window.
    spaceLeft: number;
    // The available space between the left edge of the reference
    // element and the right edge of the window.
    spaceRight: number;
  };
  fromRight: {
    // Whether the target element fits between the right edge of the reference
    // element and the left edge of the window.
    fitsLeft: boolean;
    // Whether the target element fits between the right edge of the reference
    // element and the right edge of the window.
    fitsRight: boolean;
    // The available space between the right edge of the reference
    // element and the left edge of the window.
    spaceLeft: number;
    // The available space between the right edge of the reference
    // element and the right edge of the window.
    spaceRight: number;
  };
  fromCenter: {
    // Whether the target element fits between the horizontal center of the
    // reference element and the left edge of the window.
    fitsLeft: boolean;
    // Whether the target element fits between the horizontal center of the
    // reference element and the right edge of the window.
    fitsRight: boolean;
    // Whether the target element fits between the vertical center of the
    // reference element and the top edge of the window.
    fitsAbove: boolean;
    // Whether the target element fits between the vertical center of the
    // reference element and the bottom edge of the window.
    fitsBelow: boolean;
    // The available space between the horizontal center of the
    // reference element and the left edge of the window.
    spaceLeft: number;
    // The available space between the horizontal center of the
    // reference element and the right edge of the window.
    spaceRight: number;
    // The available space between the vertical center of the
    // reference element and the top edge of the window.
    spaceAbove: number;
    // The available space between the vertical center of the
    // reference element and the bottom edge of the window.
    spaceBelow: number;
    fitsCentered: {
      // Whether the top half of the target element fits between the vertical
      // center of the reference element and the top edge of the window.
      fitsAbove: boolean;
      // Whether the bottom half of the target element fits between the vertical
      // center of the reference element and the bottom edge of the window.
      fitsBelow: boolean;
      // Whether the left half of the target element fits between the horizontal
      // center of the reference element and the left edge of the window.
      fitsLeft: boolean;
      // Whether the right half of the target element fits between the
      // horizontal center of the reference element and the right edge of
      // the window.
      fitsRight: boolean;
    };
  };
};

/**
 * A hook to determine if an element fits on the window.
 * @param targetNode The element to try and fit on the window.
 * @param referenceNode The element to use to position the target.
 * @param callback The function to call when updating fitment info.
 * @param spacer An additional space to leave between the target and reference.
 * @param shouldCheck Whether the fitment info should be being checked.
 * @param fromMouse Whether the target should be being positioned in relation
 *                  to the mouse. In this case refernceNode will be used to
 *                  listen for mouseover events.
 */
export const useWindowFitment = (
  targetNode: HTMLElement,
  referenceNode: HTMLElement,
  callback: (fitsWindow: WindowFitment) => void,
  spacer = 0,
  shouldCheck = true,
  fromMouse = false,
): void => {
  const htmlRef = useRef<HTMLElement>(document.querySelector("html"));

  const update = useCallback(
    (evt?: Event) => {
      let referenceCoordinates: {
        height: number;
        left: number;
        top: number;
        width: number;
      };
      if (fromMouse) {
        if (evt) {
          referenceCoordinates = {
            // The mouse is a single point so use 0 for the height and width.
            height: 0,
            left: ("x" in evt && typeof evt.x === "number" ? evt.x : null) || 0,
            top: ("y" in evt && typeof evt.y === "number" ? evt.y : null) || 0,
            width: 0,
          };
        }
      } else if (referenceNode) {
        referenceCoordinates = referenceNode.getBoundingClientRect();
      }
      if (shouldCheck && targetNode && referenceCoordinates) {
        const { height: targetHeight, width: targetWidth } =
          targetNode.getBoundingClientRect();
        const {
          height: referenceHeight,
          left: referenceLeft,
          top: referenceTop,
          width: referenceWidth,
        } = referenceCoordinates;
        const referenceBottom = referenceTop + referenceHeight;
        const referenceRight = referenceLeft + referenceWidth;
        const referenceCenterX = referenceLeft + referenceWidth / 2;
        const referenceCenterY = referenceTop + referenceHeight / 2;
        const windowLeft = htmlRef.current.scrollLeft;
        const windowRight = window.innerWidth - htmlRef.current.scrollLeft;
        const windowTop = 0;
        const windowBottom = window.innerHeight;
        const heightIncludingSpace = targetHeight + spacer;
        const widthIncludingSpace = targetWidth + spacer;
        const widthFromCenter = targetWidth / 2;
        const heightFromCenter = targetHeight / 2;

        callback({
          fromTop: {
            fitsAbove: referenceTop - heightIncludingSpace > windowTop,
            fitsBelow: referenceTop + heightIncludingSpace < windowBottom,
            spaceAbove: Math.abs(windowTop - referenceTop),
            spaceBelow: windowBottom - referenceTop,
          },
          fromBottom: {
            fitsAbove: referenceBottom - heightIncludingSpace > windowTop,
            fitsBelow: referenceBottom + heightIncludingSpace < windowBottom,
            spaceAbove: Math.abs(windowTop - referenceBottom),
            spaceBelow: windowBottom - referenceBottom,
          },
          fromLeft: {
            fitsLeft: referenceLeft - widthIncludingSpace > windowLeft,
            fitsRight: referenceLeft + widthIncludingSpace < windowRight,
            spaceLeft: Math.abs(windowLeft - referenceLeft),
            spaceRight: windowRight - referenceLeft,
          },
          fromRight: {
            fitsLeft: referenceRight - widthIncludingSpace > windowLeft,
            fitsRight: referenceRight + widthIncludingSpace < windowRight,
            spaceLeft: Math.abs(windowLeft - referenceRight),
            spaceRight: windowRight - referenceRight,
          },
          fromCenter: {
            fitsLeft: referenceCenterX - widthIncludingSpace > windowLeft,
            fitsRight: referenceCenterX + widthIncludingSpace < windowRight,
            fitsAbove: referenceCenterY - heightIncludingSpace > windowTop,
            fitsBelow: referenceCenterY + heightIncludingSpace < windowBottom,
            spaceAbove: Math.abs(windowTop - referenceCenterY),
            spaceBelow: windowBottom - referenceCenterY,
            spaceLeft: Math.abs(windowLeft - referenceCenterX),
            spaceRight: windowRight - referenceCenterX,
            fitsCentered: {
              fitsLeft: referenceCenterX - widthFromCenter > windowLeft,
              fitsRight: referenceCenterX + widthFromCenter < windowRight,
              fitsAbove: referenceCenterY - heightFromCenter > windowTop,
              fitsBelow: referenceCenterY + heightFromCenter < windowBottom,
            },
          },
        });
      }
    },
    [shouldCheck, targetNode, callback, spacer, fromMouse, referenceNode],
  );

  useListener(window, update, "resize", true, shouldCheck && !fromMouse);

  useListener(window, update, "scroll", true, shouldCheck && !fromMouse);

  useListener(
    referenceNode,
    update,
    "mousemove",
    true,
    fromMouse && shouldCheck,
  );

  useEffect(() => {
    if (!fromMouse) {
      update();
    }
  }, [fromMouse, update]);
};
