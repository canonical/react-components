import { useCallback, useEffect } from "react";

/**
 * Handle the escape key pressed.
 */
export const useOnEscapePressed = (onEscape: () => void) => {
  const keyDown = useCallback(
    (evt) => {
      if (evt.code === "Escape") {
        onEscape();
      }
    },
    [onEscape]
  );
  useEffect(() => {
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [keyDown]);
};
