import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

import { useOnEscapePressed } from "./useOnEscapePressed";

it("calls the callback when the escape key is pressed", () => {
  const onEscape = jest.fn();
  renderHook(() => useOnEscapePressed(onEscape));
  userEvent.keyboard("{esc}");
  expect(onEscape).toHaveBeenCalled();
});
