/**
 * A module-level LIFO stack of Escape-key handlers.
 *
 * Any overlay component (Modal, ContextualMenu, Drawer, …) can register a
 * handler here. Only the most recently registered handler fires when Escape
 * is pressed, so nested overlays always dismiss in the correct order
 * regardless of their DOM position or portal placement.
 */

import { useEffect, useRef } from "react";

const handlers: Array<() => void> = [];

// Use capture phase so the stack fires before any bubble-phase listeners
// and cannot be silenced by stopPropagation() on a focused child element.
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
 *
 * Safe to call in SSR environments — it no-ops when `document` is unavailable.
 *
 * This is the imperative primitive behind `useEscapeStack` and is not part
 * of the public package API. React consumers should use `useEscapeStack`.
 */
export function pushEscapeHandler(handler: () => void): () => void {
  if (typeof document === "undefined") return () => undefined;
  if (handlers.length === 0) {
    // capture: true — fires before bubble-phase listeners on any descendant
    document.addEventListener("keydown", onKeyDown, true);
  }
  handlers.push(handler);
  return () => {
    const idx = handlers.lastIndexOf(handler);
    if (idx !== -1) handlers.splice(idx, 1);
    if (handlers.length === 0) {
      document.removeEventListener("keydown", onKeyDown, true);
    }
  };
}

/**
 * React hook that registers an Escape-key handler on the global LIFO stack
 * for the lifetime of the component (or while `isEnabled` is true).
 *
 * The most recently registered handler always fires first, so nested overlays
 * naturally dismiss in the correct order regardless of DOM structure.
 *
 * A stable wrapper is kept in a ref so that inline callbacks passed by callers
 * do not cause the handler to be popped/pushed on every re-render, which would
 * incorrectly move the overlay to the top of the stack.
 *
 * @param handler - Callback invoked when Escape is pressed and this handler
 *   is at the top of the stack.
 * @param options.isEnabled - When `false` the handler is not registered
 *   (defaults to `true`).
 */
export const useEscapeStack = (
  handler: () => void,
  { isEnabled } = { isEnabled: true },
): void => {
  // Always keep the ref pointing at the latest handler without changing
  // the registered stable wrapper.
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isEnabled) return undefined;
    // Register a stable wrapper; the ref always calls the latest handler.
    return pushEscapeHandler(() => handlerRef.current());
  }, [isEnabled]);
};
