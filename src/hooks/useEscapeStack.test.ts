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
});
