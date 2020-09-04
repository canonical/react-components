import { renderHook } from "@testing-library/react-hooks";

import { usePrevious } from "./usePrevious";

describe("usePrevious", () => {
  it("initialises with the value", () => {
    const { result } = renderHook(() => usePrevious(1));
    expect(result.current).toBe(1);
  });

  it("returns the previous value when it updates", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });
    expect(result.current).toBe(1);
    rerender({ value: 2 });
    expect(result.current).toBe(1);
    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });
});
