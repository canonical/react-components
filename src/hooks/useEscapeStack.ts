/**
 * A module-level LIFO stack of Escape-key handlers.
 *
 * Any overlay component (Modal, ContextualMenu, Drawer, …) can register a
 * handler here. Only the most recently registered handler fires when Escape
 * is pressed, so nested overlays always dismiss in the correct order
 * regardless of their DOM position or portal placement.
 */

import { useEffect } from "react";

const handlers: Array<() => void> = [];

function onKeyDown(e: KeyboardEvent): void {
  if (e.key !== "Escape" || handlers.length === 0) return;
  e.stopImmediatePropagation();
  handlers[handlers.length - 1]();
}

/**
 * Push a callback onto the global escape-key stack.
 * Returns a cleanup function that removes the handler (suitable for
 * use as a `useEffect` cleanup return).
 * Handlers are invoked in LIFO order — the last one pushed runs first,
 * mirroring the visual stacking of overlays.
 */
export function pushEscapeHandler(handler: () => void): () => void {
  if (handlers.length === 0) {
    document.addEventListener("keydown", onKeyDown);
  }
  handlers.push(handler);
  return () => {
    const idx = handlers.lastIndexOf(handler);
    if (idx !== -1) handlers.splice(idx, 1);
    if (handlers.length === 0) {
      document.removeEventListener("keydown", onKeyDown);
    }
  };
}

/**
 * React hook that registers an Escape-key handler on the global LIFO stack
 * for the lifetime of the component (or while `isActive` is true).
 *
 * The most recently registered handler always fires first, so nested overlays
 * naturally dismiss in the correct order regardless of DOM structure.
 *
 * @param handler - Callback invoked when Escape is pressed and this handler
 *   is at the top of the stack.
 * @param options.isActive - When `false` the handler is not registered
 *   (defaults to `true`).
 */
export const useEscapeStack = (
  handler: () => void,
  { isActive } = { isActive: true },
): void => {
  useEffect(() => {
    if (!isActive) return undefined;
    return pushEscapeHandler(handler);
  }, [handler, isActive]);
};
