import { shallow } from "enzyme";
import React from "react";

import Modal from "./Modal";

describe("Modal ", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Modal close={jest.fn()} title="Confirm delete">
        Are you sure?
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
