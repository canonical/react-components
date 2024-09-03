import { render, screen } from "@testing-library/react";
import React from "react";

import Strip from "./Strip";

describe("Strip ", () => {
  it("renders", () => {
    render(<Strip data-testid="strip">Test content</Strip>);
    expect(screen.getByTestId("strip")).toMatchSnapshot();
  });

  it("can set a background", () => {
    render(
      <Strip data-testid="strip" background="test.png">
        Test content
      </Strip>,
    );
    expect(screen.getByTestId("strip")).toHaveStyle({
      backgroundImage: "url('test.png')",
    });
  });

  it("can set a type", () => {
    render(
      <Strip data-testid="strip" type="dark">
        Test content
      </Strip>,
    );
    expect(screen.getByTestId("strip")).toHaveClass("p-strip--dark");
  });

  it("can set the element", () => {
    render(
      <Strip data-testid="strip" element="section">
        Test content
      </Strip>,
    );
    expect(screen.getByTestId("strip").nodeName).toEqual("SECTION");
  });

  it("can be bordered", () => {
    render(
      <Strip data-testid="strip" bordered={true}>
        Test content
      </Strip>,
    );
    expect(screen.getByTestId("strip")).toHaveClass("is-bordered");
  });

  it("can be dark", () => {
    render(
      <Strip data-testid="strip" dark={true}>
        Test content
      </Strip>,
    );
    expect(screen.getByTestId("strip")).toHaveClass("is-dark");
  });

  it("can be deep", () => {
    render(
      <Strip data-testid="strip" deep={true}>
        Test content
      </Strip>,
    );
    expect(screen.getByTestId("strip")).toHaveClass("is-deep");
  });

  it("can be light", () => {
    render(
      <Strip data-testid="strip" light={true}>
        Test content
      </Strip>,
    );
    expect(screen.getByTestId("strip")).toHaveClass("is-light");
  });

  it("can be shallow", () => {
    render(
      <Strip data-testid="strip" shallow={true}>
        Test content
      </Strip>,
    );
    expect(screen.getByTestId("strip")).toHaveClass("is-shallow");
  });

  it("can set a col size", () => {
    render(
      <Strip data-testid="strip" colSize={4}>
        Test content
      </Strip>,
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(".row .col-4")).toBeInTheDocument();
  });

  it("can not include a col", () => {
    render(
      <Strip data-testid="strip" includeCol={false}>
        Test content
      </Strip>,
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(".row .col-12")).not.toBeInTheDocument();
  });

  it("can set row classes", () => {
    render(
      <Strip data-testid="strip" rowClassName="row--extra">
        Test content
      </Strip>,
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(".row")).toHaveClass("row--extra");
  });

  it("can add additional classes", () => {
    render(
      <Strip data-testid="strip" className="extra-class">
        Test content
      </Strip>,
    );
    const strip = screen.getByTestId("strip");
    expect(strip).toHaveClass("p-strip");
    expect(strip).toHaveClass("extra-class");
  });
});
