import { shallow } from "enzyme";
import React from "react";

import CodeSnippet from "./CodeSnippet";

describe("CodeSnippet ", () => {
  it("can render", () => {
    const wrapper = shallow(<CodeSnippet blocks={[{ code: "Test" }]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("can render snippet with a title", () => {
    const wrapper = shallow(
      <CodeSnippet blocks={[{ title: "Title", code: "Test" }]} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("can render snippet with multiple blocks", () => {
    const wrapper = shallow(
      <CodeSnippet
        blocks={[
          { title: "Title", code: "Test" },
          { title: "Title 2", code: "Test 2" },
        ]}
      />
    );
    expect(wrapper.find("CodeSnippetBlock").length).toBe(2);
  });
});
