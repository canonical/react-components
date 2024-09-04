import { render } from "@testing-library/react";
import React from "react";

import Icon, { ICONS } from "./Icon";

describe("Icon", () => {
  it("renders", () => {
    const { container } = render(<Icon name={ICONS.success} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("sets correct class name based on given name", () => {
    const { container } = render(<Icon name="test" />);
    expect(container.firstChild).toHaveClass("p-icon--test");
  });

  it("can be given a custom class name", () => {
    const { container } = render(<Icon className="custom-class" name="test" />);
    expect(container.firstChild).toHaveClass("custom-class p-icon--test");
  });

  it("can be given standard HTML props", () => {
    const style = { width: "200px" };
    const { container } = render(<Icon name="test" style={style} />);
    expect(container.firstChild).toHaveAttribute("style", "width: 200px;");
  });
});
