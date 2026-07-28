import React, { PropsWithChildren } from "react";
import { render, screen } from "@testing-library/react";

import Tabs from "./Tabs";

describe("Tabs", () => {
  it("renders", () => {
    const { container } = render(
      <Tabs
        links={[
          {
            active: true,
            href: "/path1",
            label: "label1",
          },
          {
            active: false,
            href: "/path2",
            label: "label2",
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("sets an active item correctly", () => {
    render(
      <Tabs
        links={[
          {
            active: true,
            href: "/path1",
            label: "label1",
          },
          {
            active: false,
            href: "/path2",
            label: "label2",
          },
        ]}
      />,
    );
    expect(screen.getByRole("tab", { name: "label1" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "label2" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("can set classNames correctly", () => {
    render(
      <Tabs
        className="nav-class"
        listClassName="list-class"
        links={[
          {
            className: "link-class",
            label: "label1",
            listItemClassName: "list-item-class",
            href: "/path1",
          },
        ]}
      />,
    );
    expect(screen.getByRole("navigation")).toHaveClass("nav-class");
    expect(screen.getByRole("tablist")).toHaveClass("list-class");
    expect(screen.getByRole("tab", { name: "label1" })).toHaveClass(
      "link-class",
    );
    expect(
      screen.getByRole("tab", { name: "label1" }).closest("li"),
    ).toHaveClass("list-item-class");
  });

  it("can use custom elements as links", () => {
    render(
      <Tabs
        links={[
          {
            component: "button",
            label: "label1",
            to: "/path",
          },
        ]}
      />,
    );
    expect(screen.getByRole("tab", { name: "label1" })).toBeInTheDocument();
  });

  it("can use custom components as links", () => {
    const TestLink = ({
      children,
      ...props
    }: { to: string } & PropsWithChildren) => (
      <button {...props}>{children}</button>
    );
    const name = "label1";
    render(
      <Tabs
        links={[
          {
            component: TestLink,
            label: name,
            to: "/path",
          },
        ]}
      />,
    );

    expect(screen.queryByRole("button", { name })).not.toBeInTheDocument();
    expect(screen.getByRole("tab", { name })).toBeInTheDocument();
  });
});
