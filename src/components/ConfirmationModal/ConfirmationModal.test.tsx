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
      </ConfirmationModal>
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
      </ConfirmationModal>
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
      </ConfirmationModal>
    );
    expect(screen.getByTestId("extraElement")).toBeInTheDocument();
  });

  it("executes the onConfirm callback when confirm button is clicked", async () => {
    const onConfirm = jest.fn();
    render(
      <ConfirmationModal confirmButtonLabel="Proceed" onConfirm={onConfirm}>
        Test confirm button click
      </ConfirmationModal>
    );
    await userEvent.click(screen.getByText("Proceed"));
    expect(onConfirm).toHaveBeenCalled();
  });
});
