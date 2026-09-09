/**
 * A module-level LIFO stack of Escape-key handlers.
 *
 * Any overlay component (Modal, ContextualMenu, Drawer, …) can register a
 * handler here. Only the most recently registered handler fires when Escape
 * is pressed, so nested overlays always dismiss in the correct order
 * regardless of their DOM position or portal placement.
 *
 * Each entry can be `exclusive` (the default) or not:
 *  - Exclusive entries (e.g. Modal) claim Escape entirely while they are on
 *    top of the stack — `stopImmediatePropagation()` is called, so no other
 *    `document` keydown listener (including non-stack ones, such as
 *    `useOnEscapePressed`) sees the event. This preserves Modal's long
 *    standing behaviour of owning Escape while it is open.
 *  - Non-exclusive entries (e.g. portal-based overlays such as
 *    ContextualMenu) handle Escape themselves but let the event continue to
 *    propagate, so they don't silence unrelated listeners elsewhere on the
 *    page when used on their own.
 *
 * When a non-exclusive entry sits on top of an exclusive one (e.g. a
 * ContextualMenu opened inside a Modal), the first Escape press is handled
 * by the non-exclusive entry without claiming the event, and the exclusive
 * entry below it is skipped for that press — giving correct two-step
 * dismissal (innermost overlay first).
 */

import { useEffect, useRef } from "react";

type EscapeStackEntry = {
  onEscape: () => void;
  exclusive: boolean;
};

const stack: EscapeStackEntry[] = [];

// Use capture phase so the stack fires before any bubble-phase listeners
// and cannot be silenced by stopPropagation() on a focused child element.
function onKeyDown(e: KeyboardEvent): void {
  if (e.key !== "Escape" || stack.length === 0) return;
  const top = stack[stack.length - 1];
  if (top.exclusive) {
    e.stopImmediatePropagation();
  }
  top.onEscape();
}

/**
 * Push a callback onto the global escape-key stack.
 * Returns a cleanup function that removes the handler (suitable for
 * use as a `useEffect` cleanup return).
 * Handlers are invoked in LIFO order — the last one pushed runs first,
 * mirroring the visual stacking of overlays.
 *
 * @param onEscape - Callback invoked when Escape is pressed and this entry
 *   is at the top of the stack.
 * @param options.exclusive - When `true` (the default), this entry claims
 *   the Escape press entirely while on top of the stack, preventing any
 *   other `document` keydown listener from seeing it. Set to `false` for
 *   overlays that should not silence unrelated Escape handlers when used on
 *   their own (e.g. portal-based overlays).
 *
 * Safe to call in SSR environments — it no-ops when `document` is unavailable.
 *
 * This is the imperative primitive behind `useEscapeStack` and is not part
 * of the public package API. React consumers should use `useEscapeStack`.
 */
export function pushEscapeHandler(
  onEscape: () => void,
  { exclusive = true }: { exclusive?: boolean } = {},
): () => void {
  if (typeof document === "undefined") return () => undefined;
  // Wrap in a fresh object so each registration has a unique identity, even
  // if the same callback reference is pushed more than once.
  const entry: EscapeStackEntry = { onEscape, exclusive };
  if (stack.length === 0) {
    // capture: true — fires before bubble-phase listeners on any descendant
    document.addEventListener("keydown", onKeyDown, true);
  }
  stack.push(entry);
  return () => {
    const idx = stack.indexOf(entry);
    if (idx !== -1) stack.splice(idx, 1);
    if (stack.length === 0) {
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
 * @param options.exclusive - See `pushEscapeHandler`. Defaults to `true`.
 */
export type UseEscapeStackOptions = {
  isEnabled?: boolean;
  exclusive?: boolean;
};

export const useEscapeStack = (
  handler: () => void,
  { isEnabled = true, exclusive = true }: UseEscapeStackOptions = {},
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
    return pushEscapeHandler(() => handlerRef.current(), { exclusive });
  }, [isEnabled, exclusive]);
};
