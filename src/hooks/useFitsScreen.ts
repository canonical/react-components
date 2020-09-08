import { useCallback, useEffect, useRef } from "react";

import { useListener } from "./useListener";

export type FitsScreen = {
  fromTop: {
    // Whether the target element fits between the top edge of the reference
    // element and the top edge of the screen.
    fitsAbove: boolean;
    // Whether the target element fits between the top edge of the reference
    // element and the bottom edge of the screen.
    fitsBelow: boolean;
  };
  fromBottom: {
    // Whether the target element fits between the bottom edge of the reference
    // element and the top edge of the screen.
    fitsAbove: boolean;
    // Whether the target element fits between the bottom edge of the reference
    // element and the bottom edge of the screen.
    fitsBelow: boolean;
  };
  fromLeft: {
    // Whether the target element fits between the left edge of the reference
    // element and the left edge of the screen.
    fitsLeft: boolean;
    // Whether the target element fits between the left edge of the reference
    // element and the right edge of the screen.
    fitsRight: boolean;
  };
  fromRight: {
    // Whether the target element fits between the right edge of the reference
    // element and the left edge of the screen.
    fitsLeft: boolean;
    // Whether the target element fits between the right edge of the reference
    // element and the right edge of the screen.
    fitsRight: boolean;
  };
  fromCenter: {
    // Whether the target element fits between the horizontal center of the
    // reference element and the left edge of the screen.
    fitsLeft: boolean;
    // Whether the target element fits between the horizontal center of the
    // reference element and the right edge of the screen.
    fitsRight: boolean;
    // Whether the target element fits between the vertical center of the
    // reference element and the top edge of the screen.
    fitsAbove: boolean;
    // Whether the target element fits between the vertical center of the
    // reference element and the bottom edge of the screen.
    fitsBelow: boolean;
    fitsCentered: {
      // Whether the top half of the target element fits between the vertical
      // center of the reference element and the top edge of the screen.
      fitsAbove: boolean;
      // Whether the bottom half of the target element fits between the vertical
      // center of the reference element and the bottom edge of the screen.
      fitsBelow: boolean;
      // Whether the left half of the target element fits between the horizontal
      // center of the reference element and the left edge of the screen.
      fitsLeft: boolean;
      // Whether the right half of the target element fits between the
      // horizontal center of the reference element and the right edge of
      // the screen.
      fitsRight: boolean;
    };
  };
};

/**
 * A hook to determine if an element fits on the screen.
 * @param targetNode The element to try and fit on the screen.
 * @param referenceNode The element to use to position the target.
 * @param callback The function to call when updating fitment info.
 * @param spacer An additional space to leave between the target and reference.
 * @param shouldCheck Whether the fitment info should be being checked.
 * @param fromMouse Whether the target should be being positioned in relation
 *                  to the mouse. In this case refernceNode will be used to
 *                  listen for mouseover events.
 */
export const useFitsScreen = (
  targetNode: HTMLElement,
  referenceNode: HTMLElement,
  callback: (fitsScreen: FitsScreen) => void,
  spacer = 0,
  shouldCheck = true,
  fromMouse = false
): void => {
  const htmlRef = useRef<HTMLElement>(document.querySelector("html"));

  const update = useCallback(
    (evt?) => {
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
            left: evt.x || 0,
            top: evt.y || 0,
            width: 0,
          };
        }
      } else if (referenceNode) {
        referenceCoordinates = referenceNode.getBoundingClientRect();
      }
      if (shouldCheck && targetNode && referenceCoordinates) {
        const {
          height: targetHeight,
          width: targetWidth,
        } = targetNode.getBoundingClientRect();
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
        const screenLeft = htmlRef.current.scrollLeft;
        const screenRight = window.innerWidth - htmlRef.current.scrollLeft;
        const screenTop = 0;
        const screenBottom = window.innerHeight;
        const heightIncludingSpace = targetHeight + spacer;
        const widthIncludingSpace = targetHeight + spacer;
        const widthFromCenter = targetWidth / 2;
        const heightFromCenter = targetHeight / 2;

        callback({
          fromTop: {
            fitsAbove: referenceTop - heightIncludingSpace > screenTop,
            fitsBelow: referenceTop + heightIncludingSpace < screenBottom,
          },
          fromBottom: {
            fitsAbove: referenceBottom - heightIncludingSpace > screenTop,
            fitsBelow: referenceBottom + heightIncludingSpace < screenBottom,
          },
          fromLeft: {
            fitsLeft: referenceLeft - widthIncludingSpace > screenLeft,
            fitsRight: referenceLeft + widthIncludingSpace < screenRight,
          },
          fromRight: {
            fitsLeft: referenceRight - widthIncludingSpace > screenLeft,
            fitsRight: referenceRight + widthIncludingSpace < screenRight,
          },
          fromCenter: {
            fitsLeft: referenceCenterX - widthIncludingSpace > screenLeft,
            fitsRight: referenceCenterX + widthIncludingSpace < screenRight,
            fitsAbove: referenceCenterY - heightIncludingSpace > screenTop,
            fitsBelow: referenceCenterY + heightIncludingSpace < screenBottom,
            fitsCentered: {
              fitsLeft: referenceCenterX - widthFromCenter > screenLeft,
              fitsRight: referenceCenterX + widthFromCenter < screenRight,
              fitsAbove: referenceCenterY - heightFromCenter > screenTop,
              fitsBelow: referenceCenterY + heightFromCenter < screenBottom,
            },
          },
        });
      }
    },
    [shouldCheck, targetNode, callback, spacer, fromMouse, referenceNode]
  );

  useListener(window, update, "resize", true, shouldCheck && !fromMouse);

  useListener(window, update, "scroll", true, shouldCheck && !fromMouse);

  useListener(
    referenceNode,
    update,
    "mousemove",
    true,
    fromMouse && shouldCheck
  );

  useEffect(() => {
    if (!fromMouse) {
      update();
    }
  }, [fromMouse, update]);
};
