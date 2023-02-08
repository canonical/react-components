import { render, screen, within } from "@testing-library/react";
import React from "react";

import List from "./List";

describe("List ", () => {
  let items: string[];

  beforeEach(() => {
    items = ["test", "items", "here"];
  });

  it("renders", () => {
    render(<List items={items} />);
    expect(screen.getByRole("list")).toMatchSnapshot();
  });

  it("can define items as JSX", () => {
    render(<List items={[<button>test</button>, <span>items</span>]} />);
    expect(
      within(screen.getAllByRole("listitem")[0]).getByRole("button")
    ).toBeInTheDocument();
  });

  it("can define items as objects", () => {
    render(
      <List
        items={[
          {
            content: "test",
            className: "item-class",
          },
        ]}
      />
    );
    const item = within(screen.getByRole("listitem")).getByText("test");
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass("item-class");
  });

  it("can be divided", () => {
    render(<List divided={true} items={items} />);
    expect(screen.getByRole("list")).toHaveClass("p-list--divided");
  });

  it("can be inline", () => {
    render(<List inline={true} items={items} />);
    expect(screen.getByRole("list")).toHaveClass("p-inline-list");
    expect(screen.getAllByRole("listitem")[0]).toHaveClass(
      "p-inline-list__item"
    );
  });

  it("can be inline middot", () => {
    render(<List middot={true} items={items} />);
    expect(screen.getByRole("list")).toHaveClass("p-inline-list--middot");
    expect(screen.getAllByRole("listitem")[0]).toHaveClass(
      "p-inline-list__item"
    );
  });

  it("can be inline stretch", () => {
    render(<List stretch={true} items={items} />);
    expect(screen.getByRole("list")).toHaveClass("p-inline-list--stretch");
    expect(screen.getByRole("list")).not.toHaveClass("p-list");
    expect(screen.getAllByRole("listitem")[0]).toHaveClass(
      "p-inline-list__item"
    );
  });

  it("can be split", () => {
    render(<List split={true} items={items} />);
    expect(screen.getByRole("list")).toHaveClass("is-split");
  });

  it("can be ticked", () => {
    render(<List ticked={true} items={items} />);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("is-ticked");
  });

  it("can be stepped", () => {
    render(
      <List
        stepped={true}
        items={[
          {
            title: "Test title",
            content: "test",
            className: "item-class",
            titleElement: "h1",
          },
        ]}
      />
    );
    expect(screen.getByRole("list")).toHaveClass("p-stepped-list");
    const item = screen.getAllByRole("listitem")[0];
    expect(item).toHaveClass("p-stepped-list__item");
    expect(within(item).getByText("Test title")).toHaveClass(
      "p-stepped-list__title"
    );
    expect(within(item).getByText("test")).toHaveClass(
      "p-stepped-list__content"
    );
  });

  it("can be detailed stepped", () => {
    render(
      <List
        detailed={true}
        stepped={true}
        items={[
          {
            title: "Test title",
            content: "test",
            className: "item-class",
            titleElement: "h1",
          },
        ]}
      />
    );
    expect(screen.getByRole("list")).toHaveClass("p-stepped-list--detailed");
    const item = screen.getAllByRole("listitem")[0];
    expect(item).toHaveClass("p-stepped-list__item");
    expect(within(item).getByText("Test title")).toHaveClass(
      "p-stepped-list__title"
    );
    expect(within(item).getByText("test")).toHaveClass(
      "p-stepped-list__content"
    );
  });

  it("can add additional classes", () => {
    render(<List className="extra-class" items={items} />);
    const list = screen.getByRole("list");
    expect(list).toHaveClass("p-list");
    expect(list).toHaveClass("extra-class");
  });
});
