import { renderHook } from "@testing-library/react-hooks";

import { THROTTLE_DELAY, useThrottle } from "./useThrottle";

jest.useFakeTimers();

describe("useThrottle", () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  it("initially calls the callback without delay", () => {
    const { result } = renderHook(() => useThrottle(callback));
    expect(callback.mock.calls.length).toBe(0);
    result.current();
    expect(callback.mock.calls.length).toBe(1);
  });

  it("does not call the callback again if the delay hasn't been reached", () => {
    const { result } = renderHook(() => useThrottle(callback));
    result.current();
    expect(callback.mock.calls.length).toBe(1);
    jest.advanceTimersByTime(THROTTLE_DELAY - 1);
    result.current();
    expect(callback.mock.calls.length).toBe(1);
  });

  it("calls the callback if the delay has been reached", () => {
    const { result } = renderHook(() => useThrottle(callback));
    result.current();
    expect(callback.mock.calls.length).toBe(1);
    jest.advanceTimersByTime(THROTTLE_DELAY);
    result.current();
    expect(callback.mock.calls.length).toBe(2);
  });

  it("cleans up when unmounting", () => {
    const clear = jest.spyOn(global, "clearTimeout");
    const { unmount } = renderHook(() => useThrottle(callback));
    unmount();
    expect(clear).toHaveBeenCalled();
  });
});
