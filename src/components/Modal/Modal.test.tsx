import { shallow, mount } from "enzyme";
import userEvent from "@testing-library/user-event";
import React from "react";

import Modal from "./Modal";

describe("Modal ", () => {
  it("displays buttons that have been supplied", () => {
    const wrapper = mount(
      <Modal
        buttonRow={[
          <button key={1}>Button 1</button>,
          <button key={2}>Button 2</button>,
        ]}
      >
        Button tester
      </Modal>
    );
    expect(wrapper.find(".p-modal__footer button").length).toEqual(2);
  });

  it("displays any content in the button row", () => {
    const wrapper = shallow(
      <Modal buttonRow={<div>I am not a button</div>}>Button tester</Modal>
    );
    expect(wrapper.text()).toContain("I am not a button");
    expect(wrapper.text()).toContain("Button tester");
  });

  it("if no buttons are provided it does not render the button wrapper", () => {
    const wrapper = shallow(
      <Modal close={jest.fn()} title="Confirm delete">
        Are you sure?
      </Modal>
    );
    expect(wrapper.find(".p-modal__button-row")).toEqual({});
  });

  it("does not display a header if a title is not provided", () => {
    const wrapper = shallow(<Modal>Bare bones.</Modal>);
    expect(wrapper.find(".p-modal__header")).toEqual({});
  });

  it("does not display a close button if no close handler is provided", () => {
    const wrapper = shallow(<Modal title="some title">Bare bones.</Modal>);
    expect(wrapper.find(".p-modal__close")).toEqual({});
  });

  it("can pass extra classes to the wrapper", () => {
    const wrapper = shallow(<Modal className="extra-class">Bare bones.</Modal>);
    expect(wrapper.prop("className").includes("extra-class")).toBe(true);
  });

  it("automatically focuses on the first focussable element", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const wrapper = mount(
      <Modal title="Test" close={jest.fn()}>
        My modal
      </Modal>,
      { attachTo: container }
    );
    expect(wrapper.find("button.p-modal__close").getDOMNode()).toBe(
      document.activeElement
    );
  });

  it("traps focus within the modal", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const wrapper = mount(
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
      </Modal>,
      { attachTo: container }
    );

    const closeButton = wrapper.find("button.p-modal__close").getDOMNode();
    const cancelButton = wrapper.find("button#test-cancel").getDOMNode();

    expect(closeButton).toBe(document.activeElement);

    userEvent.tab();

    expect(cancelButton).toBe(document.activeElement);

    userEvent.tab();

    expect(closeButton).toBe(document.activeElement);
  });
});
