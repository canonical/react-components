import { render, screen, within } from "@testing-library/react";
import React from "react";

import Chip, { Label } from "./Chip";
import userEvent from "@testing-library/user-event";

describe("Chip ", () => {
  it("renders default chip", () => {
    render(<Chip role="option" value="positive" />);
    expect(screen.getByRole("option")).toMatchSnapshot();
  });

  it("renders lead-value chip", () => {
    render(<Chip role="option" lead="Owner" value="Bob" />);
    expect(screen.getByRole("option")).toMatchSnapshot();
  });

  it("displays the value", () => {
    render(<Chip role="option" value="positive" />);
    expect(
      within(screen.getByRole("option")).getByText("positive")
    ).toBeInTheDocument();
  });

  it("displays the lead-value", () => {
    render(<Chip role="option" lead="Owner" value="Bob" />);
    const chip = screen.getByRole("option");
    expect(within(chip).getByText("OWNER")).toBeInTheDocument(); // Colon and space added with CSS
    expect(within(chip).getByText("Bob")).toBeInTheDocument(); // Colon and space added with CSS
  });

  it("displays the dismiss action", () => {
    const onDismiss = jest.fn();
    render(
      <Chip role="option" lead="Owner" value="Bob" onDismiss={onDismiss} />
    );
    expect(
      within(screen.getByRole("option")).getByRole("button", {
        name: Label.Dismiss,
      })
    ).toBeInTheDocument();
  });

  it("calls onDismiss when clicked", async () => {
    const onDismiss = jest.fn();
    render(
      <Chip role="option" lead="Owner" value="Bob" onDismiss={onDismiss} />
    );
    const dismissButton = within(screen.getByRole("option")).getByRole(
      "button",
      {
        name: Label.Dismiss,
      }
    );
    await userEvent.click(dismissButton);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("calls onKeyDown when key pressed", async () => {
    const onClick = jest.fn();
    render(<Chip role="option" lead="Owner" value="Bob" onClick={onClick} />);
    const chip = screen.getByRole("option");
    await userEvent.type(chip, "{enter}");
    expect(onClick).toHaveBeenCalledWith({ lead: "Owner", value: "Bob" });
  });

  it("calls onClick when clicking on the chip", async () => {
    const onClick = jest.fn();
    render(<Chip role="option" lead="Owner" value="Bob" onClick={onClick} />);
    await userEvent.click(screen.getByRole("option"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders positive chip", () => {
    render(<Chip role="option" appearance="positive" value="positive" />);
    expect(screen.getByRole("option")).toHaveClass("p-chip--positive");
  });

  it("renders negative chip", () => {
    render(<Chip role="option" appearance="negative" value="negative" />);
    expect(screen.getByRole("option")).toHaveClass("p-chip--negative");
  });

  it("renders caution chip", () => {
    render(<Chip role="option" appearance="caution" value="caution" />);
    expect(screen.getByRole("option")).toHaveClass("p-chip--caution");
  });

  it("renders information chip", () => {
    render(<Chip role="option" appearance="information" value="information" />);
    expect(screen.getByRole("option")).toHaveClass("p-chip--information");
  });

  it("renders extra props", () => {
    render(
      <Chip
        role="option"
        appearance="information"
        lead="Owner"
        onDismiss={jest.fn()}
        value="Bob"
        data-testid="testID"
      />
    );
    expect(screen.getByRole("option")).toHaveAttribute("data-testid", "testID");
  });

  it("passes additional classes", () => {
    render(
      <Chip role="option" className="extra-extra" lead="Owner" value="Bob" />
    );
    expect(screen.getByRole("option")).toHaveClass("extra-extra");
  });

  it("passes additional classes to a dismissable chip", () => {
    render(
      <Chip
        role="option"
        className="extra-extra"
        lead="Owner"
        onDismiss={jest.fn()}
        value="Bob"
      />
    );
    expect(screen.getByRole("option")).toHaveClass("extra-extra");
  });

  it("does not submit forms when clicking on the chip", async () => {
    const onSubmit = jest.fn();
    render(
      <form onSubmit={onSubmit}>
        <Chip role="option" lead="Owner" value="Bob" />
      </form>
    );
    await userEvent.click(screen.getByRole("option"));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not submit forms when clicking on the dismiss button", async () => {
    const onSubmit = jest.fn();
    render(
      <form onSubmit={onSubmit}>
        <Chip role="option" lead="Owner" onDismiss={jest.fn()} value="Bob" />
      </form>
    );
    const dismissButton = within(screen.getByRole("option")).getByRole(
      "button",
      {
        name: Label.Dismiss,
      }
    );
    await userEvent.click(dismissButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
