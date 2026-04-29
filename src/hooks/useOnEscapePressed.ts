import { useEffect } from "react";
import { pushEscapeHandler } from "./useEscapeStack";

/**
 * Handle the escape key pressed.
 * Registers the callback on the global escape-key stack so that nested
 * overlays (modals, dropdowns, drawers, …) always dismiss in the correct
 * LIFO order, regardless of DOM position or portal placement.
 */
export const useOnEscapePressed = (
  onEscape: () => void,
  { isEnabled } = { isEnabled: true },
) => {
  useEffect(() => {
    if (!isEnabled) return undefined;
    return pushEscapeHandler(onEscape);
  }, [onEscape, isEnabled]);
};
