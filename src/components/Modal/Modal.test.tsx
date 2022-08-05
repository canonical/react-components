import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import React from "react";

import Modal from "./Modal";

describe("Modal ", () => {
  it("displays buttons that have been supplied", () => {
    render(
      <Modal
        buttonRow={[
          <button key={1}>Button 1</button>,
          <button key={2}>Button 2</button>,
        ]}
      >
        Button tester
      </Modal>
    );
    expect(screen.getAllByRole("button").length).toEqual(2);
  });

  it("displays any content in the button row", () => {
    const { container } = render(
      <Modal buttonRow={<div>I am not a button</div>}>Button tester</Modal>
    );
    expect(container.innerHTML).toContain("I am not a button");
    expect(container.innerHTML).toContain("Button tester");
  });

  it("if no buttons are provided it does not render the button wrapper", () => {
    const { container } = render(
      <Modal close={jest.fn()} title="Confirm delete">
        Are you sure?
      </Modal>
    );
    expect(container.querySelector(".p-modal__button-row")).toBeNull();
  });

  it("does not display a header if a title is not provided", () => {
    const { container } = render(<Modal>Bare bones.</Modal>);
    expect(container.querySelector(".p-modal__header")).toBeNull();
  });

  it("does not display a close button if no close handler is provided", () => {
    const { container } = render(<Modal title="some title">Bare bones.</Modal>);
    expect(container.querySelector(".p-modal__close")).toBeNull();
  });

  it("can pass extra classes to the wrapper", () => {
    const { container } = render(
      <Modal className="extra-class">Bare bones.</Modal>
    );
    expect(container.querySelector(".extra-class")).toBeInTheDocument();
  });

  it("automatically focuses on the first focussable element", () => {
    const { container } = render(
      <Modal title="Test" close={jest.fn()}>
        My modal
      </Modal>
    );
    expect(container.querySelector("button.p-modal__close")).toBe(
      document.activeElement
    );
  });

  it("traps focus within the modal", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Modal
        title="Test"
        close={jest.fn()}
        buttonRow={
          <button id="test-cancel" onClick={jest.fn()}>
            Cancel
          </button>
        }
      >
        Bare bones
      </Modal>
    );

    const closeButton = container.querySelector("button.p-modal__close");
    const cancelButton = container.querySelector("button#test-cancel");

    expect(closeButton).toHaveFocus();

    await user.tab();

    expect(cancelButton).toHaveFocus();

    await user.tab();

    expect(closeButton).toHaveFocus();
  });
});
