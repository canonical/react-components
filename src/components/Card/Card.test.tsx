import { render, screen } from "@testing-library/react";
import React from "react";

import Card from "./Card";

describe("Card ", () => {
  it("renders", () => {
    render(<Card title="This is the title">Test content</Card>);
    expect(screen.get).toMatchSnapshot();
  });

  it("can display a header", () => {
    render(<Card thumbnail="test.png"></Card>);
    expect(wrapper.find(".p-card__thumbnail").prop("src")).toEqual("test.png");
  });

  it("can be highlighted", () => {
    render(<Card highlighted={true}></Card>);
    expect(wrapper.prop("className").includes("p-card--highlighted")).toBe(
      true
    );
  });

  it("can be an overlay", () => {
    render(<Card overlay={true}></Card>);
    expect(wrapper.prop("className").includes("p-card--overlay")).toBe(true);
  });

  it("can add additional classes", () => {
    render(<Card className="extra-class"></Card>);
    const className = wrapper.prop("className");
    expect(className.includes("p-card")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
