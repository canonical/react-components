import { render, screen } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import React from "react";

import PasswordToggle from "./PasswordToggle";

describe("PasswordToggle", () => {
  it("can add additional classes", () => {
    const wrapper = shallow(
      <PasswordToggle id="test-id" className="extra-class" />
    );
    const className = wrapper.find("input").prop("className");
    expect(className.includes("p-form-validation__input")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });

  it("accepts a ref prop we can use to target the input element directly", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const ref = React.createRef<HTMLInputElement>();
    const wrapper = mount(<PasswordToggle id="test-id" ref={ref} />, {
      attachTo: container,
    });
    ref.current.focus();
    expect(wrapper.find("input").getDOMNode()).toBe(document.activeElement);
    document.body.removeChild(container);
  });

  it("toggles the visibility of the password when the button is clicked", () => {
    const wrapper = mount(<PasswordToggle id="test-id" />);
    expect(wrapper.find("input#test-id").prop("type")).toBe("password");
    wrapper.find("button[aria-controls='test-id']").simulate("click");
    expect(wrapper.find("input#test-id").prop("type")).toBe("text");
  });

  it("implicitly accepts input props", () => {
    const wrapper = mount(
      <PasswordToggle
        id="test-id"
        value="My test value"
        onChange={() => null}
      />
    );
    expect(wrapper.find("input#test-id").prop("value")).toBe("My test value");
  });
});

describe("PasswordToggle RTL", () => {
  it("can display an error", async () => {
    render(<PasswordToggle error="Uh oh!" id="test-id" label="password" />);
    expect(screen.getByLabelText("password")).toHaveErrorMessage(
      "Error: Uh oh!"
    );
  });

  it("can display help", async () => {
    const help = "Save me!";
    render(<PasswordToggle help={help} id="test-id" label="password" />);
    expect(screen.getByLabelText("password")).toHaveAccessibleDescription(help);
  });
});
