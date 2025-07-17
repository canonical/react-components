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
      within(screen.getByTestId("chip")).getByText("positive"),
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
      <Chip
        data-testid="chip"
        lead="Owner"
        value="Bob"
        onDismiss={onDismiss}
      />,
    );
    expect(
      within(screen.getByTestId("chip")).getByRole("button", {
        name: Label.Dismiss,
      }),
    ).toBeInTheDocument();
  });

  it("calls onDismiss when clicked", async () => {
    const onDismiss = jest.fn();
    render(
      <Chip
        data-testid="chip"
        lead="Owner"
        value="Bob"
        onDismiss={onDismiss}
      />,
    );
    const dismissButton = within(screen.getByTestId("chip")).getByRole(
      "button",
      {
        name: Label.Dismiss,
      },
    );
    await userEvent.click(dismissButton);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("calls onKeyDown when key pressed", async () => {
    const onClick = jest.fn();
    render(
      <Chip data-testid="chip" lead="Owner" value="Bob" onClick={onClick} />,
    );
    const chip = screen.getByTestId("chip");
    await userEvent.type(chip, "{enter}");
    expect(onClick).toHaveBeenCalledWith({ lead: "Owner", value: "Bob" });
  });

  it("calls onClick when clicking on the chip", async () => {
    const onClick = jest.fn();
    render(
      <Chip data-testid="chip" lead="Owner" value="Bob" onClick={onClick} />,
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
      <Chip data-testid="chip" appearance="information" value="information" />,
    );
    expect(screen.getByTestId("chip")).toHaveClass("p-chip--information");
  });

  it("renders dense chip", () => {
    render(<Chip data-testid="chip" isDense={true} value="dense" />);
    expect(screen.getByTestId("chip")).toHaveClass("is-dense");
  });

  it("renders inline chip", () => {
    render(<Chip data-testid="chip" isInline={true} value="inline" />);
    expect(screen.getByTestId("chip")).toHaveClass("is-inline");
  });

  it("renders readonly chip", () => {
    render(<Chip data-testid="chip" isReadOnly={true} value="readonly" />);
    expect(screen.getByTestId("chip")).toHaveClass("is-readonly");
  });

  it("renders extra props", () => {
    render(
      <Chip
        data-testid="chip"
        appearance="information"
        lead="Owner"
        value="Bob"
        disabled
      />,
    );
    expect(screen.getByTestId("chip")).toBeDisabled();
  });

  it("renders icon chip", () => {
    render(<Chip data-testid="chip" iconName="user" value="Users" />);
    const chip = screen.getByTestId("chip");
    // Icons don't have roles (they are decorative), so we need to use query selector
    const icon = chip.querySelector(".p-icon--user");
    expect(icon).toBeInTheDocument();
  });

  it("renders chip with badge", () => {
    render(
      <Chip
        data-testid="chip"
        lead="Owner"
        value="Bob"
        badge={<span className="p-badge">1</span>}
      />,
    );

    const chip = screen.getByTestId("chip");
    const badge = within(chip).getByText("1");
    expect(badge).toBeInTheDocument();
  });

  it("passes additional classes", () => {
    render(
      <Chip
        data-testid="chip"
        className="extra-extra"
        lead="Owner"
        value="Bob"
      />,
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
      />,
    );
    expect(screen.getByTestId("chip")).toHaveClass("extra-extra");
  });

  it("does not submit forms when clicking on the chip", async () => {
    const onSubmit = jest.fn();
    render(
      <form onSubmit={onSubmit}>
        <Chip data-testid="chip" lead="Owner" value="Bob" />
      </form>,
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
      </form>,
    );
    const dismissButton = within(screen.getByTestId("chip")).getByRole(
      "button",
      {
        name: Label.Dismiss,
      },
    );
    await userEvent.click(dismissButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not render a dismiss button when isReadOnly is true", () => {
    const onDismiss = jest.fn();
    render(
      <Chip
        data-testid="chip"
        lead="Owner"
        value="Bob"
        isReadOnly={true}
        onDismiss={onDismiss}
      />,
    );
    const chip = screen.getByTestId("chip");

    const dismissButton = within(chip).queryByRole("button", {
      name: Label.Dismiss,
    });
    expect(dismissButton).not.toBeInTheDocument();
  });

  it("does not call onClick when isReadOnly is true", async () => {
    const onClick = jest.fn();
    render(
      <Chip
        data-testid="chip"
        lead="Owner"
        onClick={onClick}
        value="Bob"
        isReadOnly={true}
      />,
    );
    await userEvent.click(screen.getByTestId("chip"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("cannot be focused when isReadOnly is true", async () => {
    const onClick = jest.fn();
    render(
      <Chip
        data-testid="chip"
        lead="Owner"
        onClick={onClick}
        value="Bob"
        isReadOnly={true}
      />,
    );
    const chip = screen.getByTestId("chip");
    await userEvent.tab();
    expect(chip).not.toHaveFocus();
  });
});
