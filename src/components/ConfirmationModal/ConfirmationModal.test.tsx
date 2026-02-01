import { render, screen } from "@testing-library/react";
import React from "react";

import ConfirmationModal from "./ConfirmationModal";
import userEvent from "@testing-library/user-event";

describe("ConfirmationModal ", () => {
  it("shows a customised cancel button label", () => {
    const { container } = render(
      <ConfirmationModal
        cancelButtonLabel="Go back"
        confirmButtonLabel="Proceed"
        onConfirm={jest.fn()}
      >
        Test cancel button label
      </ConfirmationModal>,
    );
    expect(container.innerHTML).toContain("Go back");
    expect(container.innerHTML).not.toContain("Cancel");
  });

  it("shows a customised confirm button appearance", () => {
    render(
      <ConfirmationModal
        confirmButtonAppearance="positive"
        confirmButtonLabel="Proceed"
        onConfirm={jest.fn()}
      >
        Test confirm button appearance
      </ConfirmationModal>,
    );
    expect(screen.getByText("Proceed")).toHaveClass("p-button--positive");
  });

  it("shows the confirm extra", () => {
    render(
      <ConfirmationModal
        confirmExtra={<div data-testid="extraElement" />}
        confirmButtonLabel="Proceed"
        onConfirm={jest.fn()}
      >
        Test confirm extra
      </ConfirmationModal>,
    );
    expect(screen.getByTestId("extraElement")).toBeInTheDocument();
  });

  it("executes the onConfirm callback when confirm button is clicked", async () => {
    const onConfirm = jest.fn();
    render(
      <ConfirmationModal confirmButtonLabel="Proceed" onConfirm={onConfirm}>
        Test confirm button click
      </ConfirmationModal>,
    );
    await userEvent.click(screen.getByText("Proceed"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("should stop click event propagation on cancel by default", async () => {
    const handleExternalClick = jest.fn();
    render(
      <div onClick={handleExternalClick}>
        <ConfirmationModal
          cancelButtonLabel="Go back"
          confirmButtonLabel="Proceed"
          onConfirm={jest.fn()}
        >
          Test click propagation
        </ConfirmationModal>
      </div>,
    );

    await userEvent.click(screen.getByText("Go back"));
    expect(handleExternalClick).not.toHaveBeenCalled();
  });

  it("should propagate click event on cancel", async () => {
    const handleExternalClick = jest.fn();
    render(
      <div onClick={handleExternalClick}>
        <ConfirmationModal
          cancelButtonLabel="Go back"
          confirmButtonLabel="Proceed"
          onConfirm={jest.fn()}
          shouldPropagateClickEvent={true}
        >
          Test click propagation
        </ConfirmationModal>
      </div>,
    );

    await userEvent.click(screen.getByText("Go back"));
    expect(handleExternalClick).toHaveBeenCalledTimes(1);
  });

  it("should stop click event propagation on confirm by default", async () => {
    const handleExternalClick = jest.fn();
    render(
      <div onClick={handleExternalClick}>
        <ConfirmationModal confirmButtonLabel="Proceed" onConfirm={jest.fn()}>
          Test click propagation
        </ConfirmationModal>
      </div>,
    );

    await userEvent.click(screen.getByText("Proceed"));
    expect(handleExternalClick).not.toHaveBeenCalled();
  });

  it("should propagate click event on confirm", async () => {
    const handleExternalClick = jest.fn();
    render(
      <div onClick={handleExternalClick}>
        <ConfirmationModal
          confirmButtonLabel="Proceed"
          onConfirm={jest.fn()}
          shouldPropagateClickEvent={true}
        >
          Test click propagation
        </ConfirmationModal>
      </div>,
    );

    await userEvent.click(screen.getByText("Proceed"));
    expect(handleExternalClick).toHaveBeenCalledTimes(1);
  });

  it("passes additional props to the buttons", () => {
    render(
      <ConfirmationModal
        cancelButtonLabel="cancel"
        confirmButtonLabel="submit"
        cancelButtonProps={{
          type: "button",
        }}
        confirmButtonProps={{
          type: "submit",
        }}
        onConfirm={jest.fn()}
      >
        Test
      </ConfirmationModal>,
    );
    expect(screen.getByRole("button", { name: "cancel" })).toHaveAttribute(
      "type",
      "button",
    );
    expect(screen.getByRole("button", { name: "submit" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("renders without portal by default", () => {
    const { container } = render(
      <ConfirmationModal confirmButtonLabel="Proceed" onConfirm={jest.fn()}>
        Test default rendering
      </ConfirmationModal>,
    );

    const modal = container.querySelector(".p-modal");
    expect(modal).toBeInTheDocument();
    expect(container.contains(modal)).toBe(true);
  });

  it("renders inside a portal when renderInPortal is true", () => {
    const { container } = render(
      <ConfirmationModal
        confirmButtonLabel="Proceed"
        onConfirm={jest.fn()}
        renderInPortal={true}
      >
        Test portal rendering
      </ConfirmationModal>,
    );

    const modal = document.querySelector(".p-modal");
    expect(modal).toBeInTheDocument();

    expect(container.contains(modal)).toBe(false);

    expect(document.body.contains(modal)).toBe(true);
  });
});
