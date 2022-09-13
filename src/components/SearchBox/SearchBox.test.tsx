import { shallow, mount } from "enzyme";
import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
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

  it("renders extra props", () => {
    const wrapper = shallow(<SearchBox data-testid="testID" />);
    expect(wrapper.find(".p-search-box__input").prop("data-testid")).toBe(
      "testID"
    );
  });

  it("accepts a ref for the input", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const ref = React.createRef<HTMLInputElement>();
    const wrapper = mount(<SearchBox ref={ref} />, {
      attachTo: container,
    });
    ref.current.focus();
    expect(wrapper.find("input").getDOMNode()).toHaveFocus();
    document.body.removeChild(container);
  });

  it("after pressing the clear button focus remains on the button", async () => {
    render(
      <SearchBox externallyControlled onChange={jest.fn()} value="admin" />
    );
    const searchInput = screen.getByRole("searchbox");
    const clearButton = screen.getByRole("button", {
      name: "Clear search field",
    });
    await userEvent.click(searchInput);
    await userEvent.click(clearButton);
    expect(clearButton).toHaveFocus();
  });

  it("after pressing the clear button focuses on the input field", async () => {
    render(
      <SearchBox
        externallyControlled
        shouldRefocusAfterReset
        onChange={jest.fn()}
        value="admin"
      />
    );
    const searchInput = screen.getByRole("searchbox");
    const clearButton = screen.getByRole("button", {
      name: "Clear search field",
    });
    await userEvent.click(searchInput);
    await userEvent.click(clearButton);
    expect(searchInput).toHaveFocus();
  });
});
