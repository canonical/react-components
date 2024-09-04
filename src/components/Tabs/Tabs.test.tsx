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
    // TODO: use a more appropriate attribute once the issue below is addressed:
    // https://github.com/canonical-web-and-design/vanilla-framework/issues/4481
    expect(screen.getByRole("link", { name: "label1" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("link", { name: "label2" })).toHaveAttribute(
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
    expect(screen.getByRole("list")).toHaveClass("list-class");
    expect(screen.getByRole("listitem")).toHaveClass("list-item-class");
    expect(screen.getByRole("link")).toHaveClass("link-class");
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
    expect(screen.getByRole("button", { name: "label1" })).toBeInTheDocument();
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

    expect(screen.queryByRole("link", { name })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name })).toBeInTheDocument();
  });
});
