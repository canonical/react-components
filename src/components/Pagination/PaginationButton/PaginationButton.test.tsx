/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PaginationButton, { Label } from "./PaginationButton";

export enum CustomLabel {
  Next = "Custom forward label",
  Previous = "Custom back label",
}

describe("PaginationButton", () => {
  it("should render correctly and match snapshot", () => {
    render(<PaginationButton direction="back" onClick={() => {}} />);
    expect(screen.getByRole("button")).toMatchSnapshot();
  });

  it("should contain default label before the forward icon", () => {
    render(
      <PaginationButton direction="forward" onClick={() => {}} showLabel />
    );
    const defaultLabel = screen
      .getByRole("button", { name: new RegExp(Label.Next) })
      .querySelector("span");
    const icon = document.querySelector(".p-icon--chevron-down");
    expect(defaultLabel).toHaveTextContent(Label.Next);
    expect(
      defaultLabel &&
        icon &&
        defaultLabel.compareDocumentPosition(icon) &
          Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("should contain default label after the back icon", () => {
    render(<PaginationButton direction="back" onClick={() => {}} showLabel />);
    const defaultLabel = screen
      .getByRole("button", { name: new RegExp(Label.Previous) })
      .querySelector("span");
    const icon = document.querySelector(".p-icon--chevron-down");
    expect(defaultLabel).toHaveTextContent(Label.Previous);
    expect(
      defaultLabel &&
        icon &&
        defaultLabel.compareDocumentPosition(icon) &
          Node.DOCUMENT_POSITION_PRECEDING
    ).toBeTruthy();
  });

  it("should contain custom label before the forward icon", () => {
    render(
      <PaginationButton
        direction="forward"
        onClick={() => {}}
        showLabel
        label={CustomLabel.Next}
      />
    );
    const customLabel = screen
      .getByRole("button", { name: new RegExp(CustomLabel.Next) })
      .querySelector("span");
    const icon = document.querySelector(".p-icon--chevron-down");
    expect(customLabel).toHaveTextContent(CustomLabel.Next);
    expect(
      customLabel &&
        icon &&
        customLabel.compareDocumentPosition(icon) &
          Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("should contain custom label before the forward icon", () => {
    render(
      <PaginationButton
        direction="back"
        onClick={() => {}}
        showLabel
        label={CustomLabel.Previous}
      />
    );
    const customLabel = screen
      .getByRole("button", { name: new RegExp(CustomLabel.Previous) })
      .querySelector("span");
    const icon = document.querySelector(".p-icon--chevron-down");
    expect(customLabel).toHaveTextContent(CustomLabel.Previous);
    expect(
      customLabel &&
        icon &&
        customLabel.compareDocumentPosition(icon) &
          Node.DOCUMENT_POSITION_PRECEDING
    ).toBeTruthy();
  });

  it("should call onClick when clicking the forward button", async () => {
    const mockHandleClick = jest.fn();
    render(<PaginationButton direction="forward" onClick={mockHandleClick} />);
    await userEvent.click(screen.getByRole("button", { name: Label.Next }));
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it("should call onClick when clicking the back button", async () => {
    const mockHandleClick = jest.fn();
    render(<PaginationButton direction="back" onClick={mockHandleClick} />);
    await userEvent.click(screen.getByRole("button", { name: Label.Previous }));
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it("should be diabled and onClick will not be called when clicking the forward button", async () => {
    const mockHandleClick = jest.fn();
    render(
      <PaginationButton
        direction="forward"
        onClick={mockHandleClick}
        disabled
      />
    );
    const disabledButton = screen.getByRole("button", { name: Label.Next });
    expect(disabledButton).toBeDisabled();
    await userEvent.click(disabledButton);
    expect(mockHandleClick).not.toHaveBeenCalled();
  });

  it("should be diabled and onClick will not be called when clicking the back button", async () => {
    const mockHandleClick = jest.fn();
    render(
      <PaginationButton direction="back" onClick={mockHandleClick} disabled />
    );
    const disabledButton = screen.getByRole("button", { name: Label.Previous });
    expect(disabledButton).toBeDisabled();
    await userEvent.click(disabledButton);
    expect(mockHandleClick).not.toHaveBeenCalled();
  });
});
