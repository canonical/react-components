import { shallow } from "enzyme";
import React from "react";

import TableRow from "./TableRow";

describe("TableRow", () => {
  it("renders", () => {
    const wrapper = shallow(
      <TableRow>
        <td></td>
      </TableRow>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
