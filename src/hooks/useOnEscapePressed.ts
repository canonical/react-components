import { useCallback, useEffect } from "react";

/**
 * Handle the escape key pressed.
 */
export const useOnEscapePressed = (
  onEscape: () => void,
  { isEnabled } = { isEnabled: true }
) => {
  const keyDown = useCallback(
    (evt) => {
      if (evt.code === "Escape") {
        onEscape();
      }
    },
    [onEscape]
  );
  useEffect(() => {
    if (isEnabled) {
      document.addEventListener("keydown", keyDown);
    }
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [keyDown, isEnabled]);
};
