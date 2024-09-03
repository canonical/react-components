import { render, screen } from "@testing-library/react";
import React from "react";

import Card from "./Card";

describe("Card ", () => {
  it("renders", () => {
    render(<Card title="This is the title">Test content</Card>);
    expect(screen.getByRole("group")).toMatchSnapshot();
  });

  it("can have a title", () => {
    render(<Card title="This is the title">Test content</Card>);
    expect(
      screen.getByRole("group", { name: "This is the title" }),
    ).toBeInTheDocument();
  });

  it("can display a header", () => {
    render(<Card thumbnail="test.png"></Card>);
    // Find the visible image in the DOM.
    // eslint-disable-next-line testing-library/no-node-access
    const image = document.querySelector(".p-card__thumbnail");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test.png");
  });

  it("can be highlighted", () => {
    render(<Card highlighted={true}></Card>);
    expect(screen.getByRole("group")).toHaveClass("p-card--highlighted");
  });

  it("can be an overlay", () => {
    render(<Card overlay={true}></Card>);
    expect(screen.getByRole("group")).toHaveClass("p-card--overlay");
  });

  it("can add additional classes", () => {
    render(<Card className="extra-class"></Card>);
    const card = screen.getByRole("group");
    expect(card).toHaveClass("p-card");
    expect(card).toHaveClass("extra-class");
  });
});
