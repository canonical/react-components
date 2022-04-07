/* eslint-disable testing-library/no-node-access */
import { render, isInaccessible } from "@testing-library/react";
import React from "react";

import TableCell from "./TableCell";

describe("TableCell", () => {
  it("renders", () => {
    const { container } = render(<TableCell>Test content</TableCell>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("can set a role", () => {
    const { container } = render(<TableCell role="rowheader" />);
    expect(container.firstChild).toHaveAttribute("role", "rowheader");
  });

  it("can be hidden", () => {
    const { container, rerender } = render(<TableCell hidden={false} />);
    expect(isInaccessible(container.firstElementChild)).toEqual(false);
    rerender(<TableCell hidden={true} />);
    expect(isInaccessible(container.firstElementChild)).toEqual(true);
  });

  it("can be expanding", () => {
    const { container } = render(<TableCell expanding={true} />);
    expect(container.firstChild).toHaveClass("p-table__expanding-panel");
  });

  it("can have overflow", () => {
    const { container } = render(<TableCell hasOverflow={true} />);
    expect(container.firstChild).toHaveClass("has-overflow");
  });

  it("can add additional classes", () => {
    const { container } = render(
      <TableCell expanding={true} className="extra-class" />
    );
    expect(container.firstChild).toHaveClass(
      "p-table__expanding-panel",
      "extra-class"
    );
  });
});
