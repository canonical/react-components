import { shallow } from "enzyme";
import React from "react";

import Table from "./Table";

describe("Table", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Table>
        <thead></thead>
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("can be sortable", () => {
    const wrapper = shallow(<Table sortable />);
    expect(wrapper.prop("className").includes("p-table--sortable")).toBe(true);
  });

  it("can be expanding", () => {
    const wrapper = shallow(<Table expanding />);
    expect(wrapper.prop("className").includes("p-table-expanding")).toBe(true);
  });

  it("can be responsive", () => {
    const wrapper = shallow(<Table responsive />);
    expect(wrapper.prop("className").includes("p-table--mobile-card")).toBe(
      true
    );
  });

  it("can pass additional classes", () => {
    const wrapper = shallow(<Table sortable className="extra-class" />);
    const className = wrapper.prop("className");
    expect(className.includes("p-table--sortable")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
