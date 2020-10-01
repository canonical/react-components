import { shallow } from "enzyme";
import React from "react";

import ShowMore from "./ShowMore";

describe("<ShowMore />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    const component = shallow(
      <ShowMore label="Show more" onClick={() => false} />
    );

    expect(component).toMatchSnapshot();
  });

  // unit tests
  it("renders a spinner icon", () => {
    const component = shallow(
      <ShowMore label="Show more" onClick={() => false} isLoading />
    );

    expect(
      component.find("i").first().hasClass("p-icon--spinner")
    ).toBeTruthy();
  });

  it("can handle button click events", () => {
    const onClick = jest.fn();
    const component = shallow(<ShowMore label="Show more" onClick={onClick} />);

    component.find("button").first().simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
