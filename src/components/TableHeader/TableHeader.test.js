import { shallow } from "enzyme";
import React from "react";

import TableHeader from "./TableHeader";

describe("TableHeader", () => {
  it("renders", () => {
    const wrapper = shallow(
      <TableHeader>
        <tr></tr>
      </TableHeader>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("can set a sort", () => {
    const wrapper = shallow(<TableHeader sort="ascending" />);
    expect(wrapper.prop("aria-sort")).toEqual("ascending");
  });
});
