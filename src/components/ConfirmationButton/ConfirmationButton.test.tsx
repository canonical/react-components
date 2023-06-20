import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import ConfirmationButton from "./ConfirmationButton";
import Icon, { ICONS } from "../Icon";
import userEvent from "@testing-library/user-event";

describe("ConfirmationButton ", () => {
  it("shows button icon and label", () => {
    render(
      <ConfirmationButton
        confirmationModalProps={{
          confirmButtonLabel: "Confirm",
          onConfirm: jest.fn(),
        }}
      >
        <Icon name={ICONS.delete} />
        <span>Delete</span>
      </ConfirmationButton>
    );
    expect(screen.getByRole("button")).toContainHTML("p-icon--delete");
    expect(screen.getByRole("button")).toContainHTML("<span>Delete</span>");
  });

  it("shows the loading animation when loading is true", () => {
    render(
      <ConfirmationButton
        loading
        confirmationModalProps={{
          confirmButtonLabel: "Confirm",
          onConfirm: jest.fn(),
        }}
      />
    );
    expect(screen.getByRole("button")).toContainHTML(
      "u-animation--spin p-icon--spinner"
    );
  });

  it("shows a customised hover text", () => {
    render(
      <ConfirmationButton
        onHoverText="Delete"
        confirmationModalProps={{
          confirmButtonLabel: "Confirm",
          onConfirm: jest.fn(),
        }}
      />
    );
    expect(screen.getByTitle("Delete")).toBeInTheDocument();
  });

  it("performs the action skipping the confirmation with shift+click when enabled", async () => {
    const onConfirm = jest.fn();
    render(
      <ConfirmationButton
        shiftClickEnabled
        confirmationModalProps={{
          confirmButtonLabel: "Confirm",
          onConfirm,
        }}
      />
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
        confirmationModalProps={{
          confirmButtonLabel: "Confirm",
          onConfirm: jest.fn(),
        }}
      />
    );
    const button = screen.getByTitle("Confirm");
    const clickEvent = createEvent.click(button);
    fireEvent(button, clickEvent);
    expect(document.body).toContainHTML("<code>SHIFT</code>");
  });

  it("passes extra classes to the modal wrapper", async () => {
    render(
      <ConfirmationButton
        confirmationModalProps={{
          className: "extra-class",
          confirmButtonLabel: "Confirm",
          onConfirm: jest.fn(),
        }}
      />
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
        confirmationModalProps={{
          confirmButtonLabel: "Confirm",
          onConfirm: jest.fn(),
        }}
      />
    );
    expect(screen.getByTitle("Confirm")).toHaveClass("extra-class");
  });
});
