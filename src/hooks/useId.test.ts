import { renderHook } from "@testing-library/react-hooks";
import { useId } from "./useId";

it("generates the id on first render", () => {
  const { result, rerender } = renderHook(() => useId());
  expect(result.current).toBeTruthy();
  const previousResult = result;
  rerender();
  expect(result.current).toEqual(previousResult.current);
});
