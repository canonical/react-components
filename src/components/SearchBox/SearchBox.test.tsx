import { shallow, mount } from "enzyme";
import React from "react";

import SearchBox from "./SearchBox";

describe("SearchBox ", () => {
  it("renders", () => {
    const wrapper = shallow(<SearchBox />);
    expect(wrapper).toMatchSnapshot();
  });

  it("shows the clear button when there is a value", () => {
    const wrapper = shallow(<SearchBox value="admin" />);
    expect(wrapper.find(".p-search-box__reset").exists()).toBe(true);
  });

  it("can externally control the value", () => {
    const wrapper = shallow(
      <SearchBox externallyControlled onChange={jest.fn()} value="admin" />
    );
    let input = wrapper.find(".p-search-box__input");
    expect(input.prop("defaultValue")).toBe(undefined);
    expect(input.prop("value")).toBe("admin");
    wrapper.setProps({ value: "new-admin" });
    input = wrapper.find(".p-search-box__input");
    expect(input.prop("value")).toBe("new-admin");
  });

  it("should call onSearch prop", () => {
    const onSearchMock = jest.fn();
    const component = shallow(<SearchBox onSearch={onSearchMock} />);
    component.find(".p-search-box__button").simulate("click");
    expect(onSearchMock).toBeCalled();
  });

  it("should call onChange prop", () => {
    const onChangeMock = jest.fn();
    const event = {
      target: {
        value: "test",
      },
    };
    const component = shallow(<SearchBox onChange={onChangeMock} />);
    component.find(".p-search-box__input").simulate("change", event);
    expect(onChangeMock).toBeCalledWith(event.target.value);
  });

  it("can be found using the component name", () => {
    const WrappingComponent = () => (
      <div>
        <SearchBox />
      </div>
    );
    const wrapper = mount(<WrappingComponent />);
    expect(wrapper.find("SearchBox").exists()).toBe(true);
  });
});
