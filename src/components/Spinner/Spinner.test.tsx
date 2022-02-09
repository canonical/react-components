import { shallow } from "enzyme";
import React from "react";

import Spinner from "./Spinner";

describe("<Spinner />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    const component = shallow(<Spinner />);

    expect(component).toMatchSnapshot();
  });

  it("renders and matches the snapshot with text", () => {
    const component = shallow(<Spinner text="foo" />);

    expect(component).toMatchSnapshot();
  });

  // unit tests
  it("renders a spinner icon", () => {
    const component = shallow(<Spinner />);

    expect(
      component.find("i").first().hasClass("p-icon--spinner")
    ).toBeTruthy();
  });

  it("renders text correctly if given text prop", () => {
    const text = "Loading...";
    const component = shallow(<Spinner text={text} />);

    expect(component.find("span").first().text()).toContain(text);
    expect(component.find("i").first().text()).toContain(text);
  });

  it("renders Loading... for icon text if no text prop is provided", () => {
    const component = shallow(<Spinner />);

    expect(component.find("i").first().text()).toContain("Loading");
  });

  it("renders a light spinner if given isLight prop", () => {
    const component = shallow(<Spinner isLight />);

    expect(component.find("i").first().hasClass("is-light")).toEqual(true);
  });

  it("renders a custom aria-label", () => {
    const component = shallow(<Spinner aria-label="custom loading text" />);

    expect(component.find("span").first().props()["aria-label"]).toEqual(
      "custom loading text"
    );
  });
});
