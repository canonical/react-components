import { mount, shallow } from "enzyme";
import React from "react";

import Notification from "./Notification";

describe("Notification", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("renders", () => {
    const wrapper = shallow(
      <Notification close={() => {}} type="negative">
        User added
      </Notification>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("can start a timer", () => {
    mount(<Notification close={jest.fn()} timeout={1000} />);
    expect(setTimeout).toHaveBeenCalled();
  });

  it("can stop a timer", () => {
    const wrapper = mount(<Notification close={jest.fn()} timeout={1000} />);
    wrapper.unmount();
    expect(clearTimeout).toHaveBeenCalled();
  });

  it("can close when the time is hit", () => {
    const close = jest.fn();
    mount(<Notification close={close} timeout={1000} />);
    jest.advanceTimersByTime(1001);
    expect(close).toHaveBeenCalled();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Notification className="extra-class" />);
    const className = wrapper.prop("className");
    expect(className.includes("p-notification")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
