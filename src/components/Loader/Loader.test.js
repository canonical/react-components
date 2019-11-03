import { shallow } from "enzyme";
import React from "react";

import Loader from "./Loader";

describe("<Loader />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    const component = shallow(<Loader />);

    expect(component).toMatchSnapshot();
  });

  it("renders and matches the snapshot with text", () => {
    const component = shallow(<Loader text="foo" />);

    expect(component).toMatchSnapshot();
  });

  // unit tests
  it("renders a spinner icon", () => {
    const component = shallow(<Loader />);

    expect(
      component
        .find("i")
        .first()
        .hasClass("p-icon--spinner")
    ).toBeTruthy();
  });

  it("renders text correctly if given text prop", () => {
    const text = "Loading...";
    const component = shallow(<Loader text={text} />);

    expect(
      component
        .find("span")
        .first()
        .text()
    ).toEqual(text);
  });

  it("renders a light spinner if given isLight prop", () => {
    const component = shallow(<Loader isLight />);

    expect(
      component
        .find("i")
        .first()
        .hasClass("is-light")
    ).toEqual(true);
  });
});
