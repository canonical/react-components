import { useEffect, useRef } from "react";
import { pushEscapeHandler } from "./useEscapeStack";

/**
 * Handle the escape key pressed.
 * Registers the callback on the global escape-key stack so that nested
 * overlays (modals, dropdowns, drawers, …) always dismiss in the correct
 * LIFO order, regardless of DOM position or portal placement.
 *
 * A stable wrapper is kept in a ref so that inline callbacks do not cause
 * the handler to be unregistered/re-registered on every re-render (which
 * would incorrectly move this overlay to the top of the stack).
 */
export const useOnEscapePressed = (
  onEscape: () => void,
  { isEnabled } = { isEnabled: true },
) => {
  const onEscapeRef = useRef(onEscape);
  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!isEnabled) return undefined;
    return pushEscapeHandler(() => onEscapeRef.current());
  }, [isEnabled]);
};
