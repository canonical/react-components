import { renderHook } from "@testing-library/react-hooks";
import { fireEvent } from "@testing-library/dom";

import { useOnEscape } from "./useOnEscape";

it("calls the callback when the escape key is pressed", () => {
  const onEscape = jest.fn();
  renderHook(() => useOnEscape(onEscape));
  fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
  expect(onEscape).toHaveBeenCalled();
});
