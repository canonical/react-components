import { render, screen } from "@testing-library/react";
import React from "react";

import Field from "./Field";

describe("Field ", () => {
  it("renders", () => {
    render(
      <Field forId="test-id" label="Test label" data-testid="field">
        Test content
      </Field>,
    );
    expect(screen.getByTestId("field")).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    render(<Field className="extra-class" data-testid="field" />);
    const field = screen.getByTestId("field");
    expect(field).toHaveClass("p-form__group");
    expect(field).toHaveClass("extra-class");
  });

  it("can display a caution message", () => {
    render(
      <Field caution="Are you sure?" validationId="id-1" data-testid="field">
        <input aria-errormessage="id-1" aria-invalid="true" />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleErrorMessage(
      "Are you sure?",
    );
    expect(screen.getByTestId("field")).toHaveClass("is-caution");
  });

  it("can display a caution node", () => {
    render(
      <Field
        caution={<span>Are you sure?</span>}
        validationId="id-1"
        data-testid="field"
      >
        <input aria-errormessage="id-1" aria-invalid="true" />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleErrorMessage(
      "Are you sure?",
    );
    expect(screen.getByTestId("field")).toHaveClass("is-caution");
  });

  it("can display an error message", () => {
    render(
      <Field error="You can't do that" validationId="id-1" data-testid="field">
        <input aria-errormessage="id-1" aria-invalid="true" />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleErrorMessage(
      "You can't do that",
    );
    expect(screen.getByTestId("field")).toHaveClass("is-error");
  });

  it("can display an error node", () => {
    render(
      <Field
        error={<span>You can't do that</span>}
        validationId="id-1"
        data-testid="field"
      >
        <input aria-errormessage="id-1" aria-invalid="true" />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleErrorMessage(
      "You can't do that",
    );
    expect(screen.getByTestId("field")).toHaveClass("is-error");
  });

  it("can display a success message", () => {
    render(
      <Field success="You did it!" validationId="id-1" data-testid="field">
        <input aria-describedby="id-1" />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
      "You did it!",
    );
    expect(screen.getByTestId("field")).toHaveClass("is-success");
  });

  it("can display a success node", () => {
    render(
      <Field
        success={<span>You did it!</span>}
        validationId="id-1"
        data-testid="field"
      >
        <input aria-describedby="id-1" />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
      "You did it!",
    );
    expect(screen.getByTestId("field")).toHaveClass("is-success");
  });

  it("can display a help message", () => {
    render(
      <Field help="This is how you do it" helpId="id-1">
        <input aria-describedby="id-1" />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
      "This is how you do it",
    );
  });

  it("can display a help node", () => {
    render(
      <Field help={<span>This is how you do it</span>} helpId="id-1">
        <input aria-describedby="id-1" />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
      "This is how you do it",
    );
  });

  it("can display the label before the input", () => {
    render(
      <Field
        labelFirst={true}
        label="Test label"
        labelClassName="label-node"
        data-testid="field"
      />,
    );
    const field = screen.getByTestId("field");
    expect(field.childNodes[0]).toHaveClass("label-node");
    // The label should not be inside the control.
    expect(
      document.querySelector(".p-form__control .p-form__label"),
    ).not.toBeInTheDocument();
  });

  it("can display the label after the input", () => {
    render(<Field labelFirst={false} label="Test label" data-testid="field" />);
    const field = screen.getByTestId("field");
    // The first element should not be the label node.
    expect(field.childNodes[0]).not.toHaveClass("label-node");
    // The label should be inside the control.
    expect(
      document.querySelector(".p-form__control .p-form__label"),
    ).toBeInTheDocument();
  });

  it("can display a label node", () => {
    render(<Field label={<span>Test label</span>} />);
    expect(screen.getByText("Test label")).toBeInTheDocument();
  });

  it("can pass a class name to the label", () => {
    render(<Field label="Test label" labelClassName="custom-label" />);
    expect(screen.getByText("Test label")).toHaveClass("custom-label");
  });

  it("can be required", () => {
    render(<Field required={true} label="Test label" />);
    expect(screen.getByText("Test label")).toHaveClass("is-required");
  });

  it("can be stacked", () => {
    render(<Field stacked={true} label="Test label" data-testid="field" />);
    // The Label should be inside a col-4.
    expect(document.querySelector(".col-4 .p-form__label")).toBeInTheDocument();
    // The control should be inside a col-8.
    expect(
      document.querySelector(".col-8 .p-form__control"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("field")).toHaveClass("row");
  });
});
