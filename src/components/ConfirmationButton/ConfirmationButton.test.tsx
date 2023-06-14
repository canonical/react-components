import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import ConfirmationButton from "./ConfirmationButton";
import userEvent from "@testing-library/user-event";

describe("ConfirmationButton ", () => {
  it("shows button label and icon", () => {
    const { container } = render(
      <ConfirmationButton
        buttonLabel="Delete"
        icon="delete"
        confirmButtonLabel="Confirm"
        onConfirm={jest.fn()}
      >
        Test button label and icon
      </ConfirmationButton>
    );
    expect(container.innerHTML).toContain("Delete");
    expect(screen.getByRole("button")).toContainHTML("p-icon--delete");
  });

  it("shows the loading animation when isLoading is true and an icon is set", () => {
    render(
      <ConfirmationButton
        icon="delete"
        isLoading
        confirmButtonLabel="Confirm"
        onConfirm={jest.fn()}
      >
        Test loading animation
      </ConfirmationButton>
    );
    expect(screen.getByRole("button")).toContainHTML(
      "u-animation--spin p-icon--spinner"
    );
  });

  it("shows a customised hover text", () => {
    render(
      <ConfirmationButton
        onHoverText="Delete"
        confirmButtonLabel="Confirm"
        onConfirm={jest.fn()}
      >
        Test custom hover text
      </ConfirmationButton>
    );
    expect(screen.getByTitle("Delete")).toBeInTheDocument();
  });

  it("performs the action skipping the confirmation with shift+click when enabled", async () => {
    const onConfirm = jest.fn();
    render(
      <ConfirmationButton
        shiftClickEnabled
        confirmButtonLabel="Confirm"
        onConfirm={onConfirm}
      >
        Test shift+click confirm shortcut
      </ConfirmationButton>
    );
    const user = userEvent.setup();
    await user.keyboard("{Shift>}");
    await user.click(screen.getByTitle("Confirm"));
    await user.keyboard("{/Shift}");
    expect(screen.queryByText("Confirm")).not.toBeInTheDocument();
    expect(onConfirm).toHaveBeenCalled();
  });

  it("shows the shift click hint", () => {
    render(
      <ConfirmationButton
        showShiftClickHint
        confirmButtonLabel="Confirm"
        onConfirm={jest.fn()}
      >
        Test shift click hint
      </ConfirmationButton>
    );
    const button = screen.getByTitle("Confirm");
    const clickEvent = createEvent.click(button);
    fireEvent(button, clickEvent);
    expect(document.body).toContainHTML(
      "You can skip the confirmation dialog by holding"
    );
  });

  it("passes extra classes to the modal wrapper", async () => {
    render(
      <ConfirmationButton
        modalClassName="extra-class"
        confirmButtonLabel="Confirm"
        onConfirm={jest.fn()}
      >
        Test modal extra class
      </ConfirmationButton>
    );
    const button = screen.getByTitle("Confirm");
    const clickEvent = createEvent.click(button);
    fireEvent(button, clickEvent);
    expect(document.body).toContainHTML("p-modal extra-class");
  });

  it("passes extra classes to the button", () => {
    render(
      <ConfirmationButton
        className="extra-class"
        confirmButtonLabel="Confirm"
        onConfirm={jest.fn()}
      >
        Test button extra class
      </ConfirmationButton>
    );
    expect(screen.getByTitle("Confirm")).toHaveClass("extra-class");
  });
});
