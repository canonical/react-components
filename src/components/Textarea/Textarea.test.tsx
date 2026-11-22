import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import Textarea from "./Textarea";

describe("Textarea ", () => {
  it("can be edited when it has a defaultValue and an onChange", async () => {
    const onChange = jest.fn();
    render(<Textarea defaultValue="abc" onChange={onChange} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("abc");
    await userEvent.type(textarea, "d");
    expect(onChange).toHaveBeenCalled();
    expect(textarea).toHaveValue("abcd");
  });

  it("calls onChange for a controlled textarea", async () => {
    const onChange = jest.fn();
    render(<Textarea value="abc" onChange={onChange} />);
    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, "d");
    expect(onChange).toHaveBeenCalled();
    expect(textarea).toHaveValue("abc");
  });

  it("renders", () => {
    const { container } = render(
      <Textarea id="test-id" wrapperClassName="textarea" />,
    );
    // Get the wrapping element.
    expect(container.firstChild).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    render(<Textarea className="extra-class" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("p-form-validation__input");
    expect(textarea).toHaveClass("extra-class");
  });

  it("can take focus on first render", () => {
    render(<Textarea takeFocus />);
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("can accept input attributes", () => {
    render(<Textarea autoComplete="on" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "on");
  });

  it("can display an error for a text input", async () => {
    render(<Textarea error="Uh oh!" />);
    expect(screen.getByRole("textbox")).toHaveAccessibleErrorMessage("Uh oh!");
  });

  it("can display help for a text input", async () => {
    const help = "Save me!";
    render(<Textarea help={help} />);
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(help);
  });

  it("can change value to an empty string", () => {
    let testValue = "test";
    const { rerender } = render(<Textarea value={testValue} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("test");

    testValue = ""; // simulate an external change of the value
    rerender(<Textarea value={testValue} />);
    expect(textarea).toHaveValue("");
  });

  it("adds Ctrl + Enter keydown event listener on mount and removes on unmount", async () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <Textarea
        onControlEnter={() => {
          console.log("OnControlEnter was here.");
        }}
      />,
    );

    // Capture the event handler
    const [event, handler] = addEventListenerSpy.mock.calls[0];

    // Assert that addEventListener was called with the correct event type and handler
    expect(event).toBe("keydown");
    expect(typeof handler).toBe("function");

    const keyboardCombo = new KeyboardEvent("keydown", {
      key: "Enter",
      ctrlKey: true,
    });
    document.dispatchEvent(keyboardCombo);

    // Unmount the component to trigger cleanup
    unmount();

    // Assert that removeEventListener was called with the same event type and handler
    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", handler);

    // Clean up: restore the original implementations
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
