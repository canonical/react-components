import { pushEscapeHandler } from "./useEscapeStack";

const fireEscape = () =>
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

afterEach(() => {
  // Each test unregisters its own handlers via the returned cleanup functions,
  // so nothing to do here — this guard is just for safety.
});

describe("pushEscapeHandler", () => {
  it("calls the registered handler when Escape is pressed", () => {
    const handler = jest.fn();
    const unregister = pushEscapeHandler(handler);
    fireEscape();
    expect(handler).toHaveBeenCalledTimes(1);
    unregister();
  });

  it("does not call the handler after it is unregistered", () => {
    const handler = jest.fn();
    const unregister = pushEscapeHandler(handler);
    unregister();
    fireEscape();
    expect(handler).not.toHaveBeenCalled();
  });

  it("calls only the most recently pushed handler (LIFO order)", () => {
    const first = jest.fn();
    const second = jest.fn();
    const unregisterFirst = pushEscapeHandler(first);
    const unregisterSecond = pushEscapeHandler(second);

    fireEscape();
    expect(second).toHaveBeenCalledTimes(1);
    expect(first).not.toHaveBeenCalled();

    unregisterSecond();
    unregisterFirst();
  });

  it("falls back to the previous handler once the top handler is removed", () => {
    const first = jest.fn();
    const second = jest.fn();
    const unregisterFirst = pushEscapeHandler(first);
    const unregisterSecond = pushEscapeHandler(second);

    unregisterSecond();
    fireEscape();
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();

    unregisterFirst();
  });

  it("stops propagation so other document keydown listeners do not fire", () => {
    const outsideListener = jest.fn();
    // Register an external listener AFTER the stack listener would be added.
    const unregister = pushEscapeHandler(jest.fn());
    document.addEventListener("keydown", outsideListener);

    fireEscape();
    expect(outsideListener).not.toHaveBeenCalled();

    document.removeEventListener("keydown", outsideListener);
    unregister();
  });

  it("removes the correct entry when the same handler reference is pushed twice", () => {
    // Regression test: unregistering must not rely on the handler's
    // identity, since the same function reference could be passed to
    // multiple registrations.
    const shared = jest.fn();
    const unregisterFirst = pushEscapeHandler(shared);
    const unregisterSecond = pushEscapeHandler(shared);

    // Unregister the first (bottom) entry — the second (top) entry should
    // remain on the stack and still fire.
    unregisterFirst();
    fireEscape();
    expect(shared).toHaveBeenCalledTimes(1);

    unregisterSecond();
    shared.mockClear();
    fireEscape();
    expect(shared).not.toHaveBeenCalled();
  });

  describe("non-exclusive entries", () => {
    it("calls the handler but does not stop propagation to other listeners", () => {
      const handler = jest.fn();
      const outsideListener = jest.fn();
      const unregister = pushEscapeHandler(handler, { exclusive: false });
      document.addEventListener("keydown", outsideListener);

      fireEscape();
      expect(handler).toHaveBeenCalledTimes(1);
      expect(outsideListener).toHaveBeenCalledTimes(1);

      document.removeEventListener("keydown", outsideListener);
      unregister();
    });

    it("is skipped in favour of a non-exclusive entry above it, without stopping propagation", () => {
      // Mirrors a ContextualMenu (non-exclusive) opened inside a Modal
      // (exclusive): the first Escape press should be handled by the
      // ContextualMenu only, and should not be silenced for other listeners.
      const exclusiveHandler = jest.fn();
      const nonExclusiveHandler = jest.fn();
      const outsideListener = jest.fn();

      const unregisterExclusive = pushEscapeHandler(exclusiveHandler);
      const unregisterNonExclusive = pushEscapeHandler(nonExclusiveHandler, {
        exclusive: false,
      });
      document.addEventListener("keydown", outsideListener);

      fireEscape();
      expect(nonExclusiveHandler).toHaveBeenCalledTimes(1);
      expect(exclusiveHandler).not.toHaveBeenCalled();
      expect(outsideListener).toHaveBeenCalledTimes(1);

      // Once the non-exclusive entry is gone, the exclusive one underneath
      // takes over and reclaims exclusive ownership of Escape.
      unregisterNonExclusive();
      fireEscape();
      expect(exclusiveHandler).toHaveBeenCalledTimes(1);
      expect(outsideListener).toHaveBeenCalledTimes(1);

      document.removeEventListener("keydown", outsideListener);
      unregisterExclusive();
    });
  });
});
