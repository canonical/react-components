import { shallow } from "enzyme";
import React from "react";

import Modal from "./Modal";

jest.mock("uuid/v4", () =>
  jest.fn(() => "00000000-0000-0000-0000-000000000000")
);

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
