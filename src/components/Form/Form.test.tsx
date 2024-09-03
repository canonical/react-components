import { render, screen } from "@testing-library/react";
import React from "react";

import Form from "./Form";

describe("Form ", () => {
  it("renders", () => {
    render(
      <Form name="this needs a name so RTL can find it">Test content</Form>,
    );
    expect(screen.getByRole("form")).toMatchSnapshot();
  });

  it("can be inline", () => {
    render(<Form name="this needs a name so RTL can find it" inline={true} />);
    expect(screen.getByRole("form")).toHaveClass("p-form--inline");
  });

  it("can be stacked", () => {
    render(<Form name="this needs a name so RTL can find it" stacked={true} />);
    expect(screen.getByRole("form")).toHaveClass("p-form--stacked");
  });

  it("can add additional classes", () => {
    render(
      <Form
        name="this needs a name so RTL can find it"
        stacked={true}
        className="extra-class"
      />,
    );
    const form = screen.getByRole("form");
    expect(form).toHaveClass("p-form");
    expect(form).toHaveClass("extra-class");
  });
});
