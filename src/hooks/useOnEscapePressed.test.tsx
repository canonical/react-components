import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useOnEscapePressed } from "./useOnEscapePressed";

it("calls the callback when the escape key is pressed", async () => {
  const onEscape = jest.fn();
  renderHook(() => useOnEscapePressed(onEscape));
  await userEvent.keyboard("{Escape}");
  expect(onEscape).toHaveBeenCalled();
});
