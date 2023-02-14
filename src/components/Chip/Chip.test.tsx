import { render, screen, within } from "@testing-library/react";
import React from "react";

import Chip, { Label } from "./Chip";
import userEvent from "@testing-library/user-event";

describe("Chip ", () => {
  it("renders default chip", () => {
    render(<Chip data-testid="chip" value="positive" />);
    expect(screen.getByTestId("chip")).toMatchSnapshot();
  });

  it("renders lead-value chip", () => {
    render(<Chip data-testid="chip" lead="Owner" value="Bob" />);
    expect(screen.getByTestId("chip")).toMatchSnapshot();
  });

  it("displays the value", () => {
    render(<Chip data-testid="chip" value="positive" />);
    expect(
      within(screen.getByTestId("chip")).getByText("positive")
    ).toBeInTheDocument();
  });

  it("displays the lead-value", () => {
    render(<Chip data-testid="chip" lead="Owner" value="Bob" />);
    const chip = screen.getByTestId("chip");
    expect(within(chip).getByText("OWNER")).toBeInTheDocument(); // Colon and space added with CSS
    expect(within(chip).getByText("Bob")).toBeInTheDocument(); // Colon and space added with CSS
  });

  it("displays the dismiss action", () => {
    const onDismiss = jest.fn();
    render(
      <Chip data-testid="chip" lead="Owner" value="Bob" onDismiss={onDismiss} />
    );
    expect(
      within(screen.getByTestId("chip")).getByRole("button", {
        name: Label.Dismiss,
      })
    ).toBeInTheDocument();
  });

  it("calls onDismiss when clicked", async () => {
    const onDismiss = jest.fn();
    render(
      <Chip data-testid="chip" lead="Owner" value="Bob" onDismiss={onDismiss} />
    );
    const dismissButton = within(screen.getByTestId("chip")).getByRole(
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
    render(
      <Chip data-testid="chip" lead="Owner" value="Bob" onClick={onClick} />
    );
    const chip = screen.getByTestId("chip");
    await userEvent.type(chip, "{enter}");
    expect(onClick).toHaveBeenCalledWith({ lead: "Owner", value: "Bob" });
  });

  it("calls onClick when clicking on the chip", async () => {
    const onClick = jest.fn();
    render(
      <Chip data-testid="chip" lead="Owner" value="Bob" onClick={onClick} />
    );
    await userEvent.click(screen.getByTestId("chip"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders positive chip", () => {
    render(<Chip data-testid="chip" appearance="positive" value="positive" />);
    expect(screen.getByTestId("chip")).toHaveClass("p-chip--positive");
  });

  it("renders negative chip", () => {
    render(<Chip data-testid="chip" appearance="negative" value="negative" />);
    expect(screen.getByTestId("chip")).toHaveClass("p-chip--negative");
  });

  it("renders caution chip", () => {
    render(<Chip data-testid="chip" appearance="caution" value="caution" />);
    expect(screen.getByTestId("chip")).toHaveClass("p-chip--caution");
  });

  it("renders information chip", () => {
    render(
      <Chip data-testid="chip" appearance="information" value="information" />
    );
    expect(screen.getByTestId("chip")).toHaveClass("p-chip--information");
  });

  it("renders extra props", () => {
    render(
      <Chip
        data-testid="chip"
        appearance="information"
        lead="Owner"
        value="Bob"
        disabled
      />
    );
    expect(screen.getByTestId("chip")).toBeDisabled();
  });

  it("passes additional classes", () => {
    render(
      <Chip
        data-testid="chip"
        className="extra-extra"
        lead="Owner"
        value="Bob"
      />
    );
    expect(screen.getByTestId("chip")).toHaveClass("extra-extra");
  });

  it("passes additional classes to a dismissable chip", () => {
    render(
      <Chip
        data-testid="chip"
        className="extra-extra"
        lead="Owner"
        onDismiss={jest.fn()}
        value="Bob"
      />
    );
    expect(screen.getByTestId("chip")).toHaveClass("extra-extra");
  });

  it("does not submit forms when clicking on the chip", async () => {
    const onSubmit = jest.fn();
    render(
      <form onSubmit={onSubmit}>
        <Chip data-testid="chip" lead="Owner" value="Bob" />
      </form>
    );
    await userEvent.click(screen.getByTestId("chip"));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not submit forms when clicking on the dismiss button", async () => {
    const onSubmit = jest.fn();
    render(
      <form onSubmit={onSubmit}>
        <Chip
          data-testid="chip"
          lead="Owner"
          onDismiss={jest.fn()}
          value="Bob"
        />
      </form>
    );
    const dismissButton = within(screen.getByTestId("chip")).getByRole(
      "button",
      {
        name: Label.Dismiss,
      }
    );
    await userEvent.click(dismissButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
