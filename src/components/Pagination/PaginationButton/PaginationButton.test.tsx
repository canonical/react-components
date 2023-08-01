import React from "react";
import { render, screen } from "@testing-library/react";

import PaginationButton from "./PaginationButton";

describe("PaginationButton", () => {
  it("should render correctly and match snapshot", () => {
    render(<PaginationButton direction="back" onClick={() => {}} />);
    expect(screen.getByRole("button")).toMatchSnapshot();
  });

  it("should contain default label after the back icon", () => {
    render(<PaginationButton direction="back" onClick={() => {}} showLabel />);
    const customLabel = screen
      .getByRole("button", { name: /Previous page/ })
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector("span");
    // eslint-disable-next-line testing-library/no-node-access
    const icon = document.querySelector(".p-icon--chevron-down");
    expect(customLabel).toHaveTextContent("Previous page");
    expect(
      customLabel &&
        icon &&
        customLabel.compareDocumentPosition(icon) &
          Node.DOCUMENT_POSITION_PRECEDING
    ).toBeTruthy();
  });

  it("should contain custom label before the forward icon", () => {
    render(
      <PaginationButton
        direction="forward"
        onClick={() => {}}
        showLabel
        label="Custom label"
      />
    );
    const customLabel = screen
      .getByRole("button", { name: /Custom label/ })
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector("span");
    // eslint-disable-next-line testing-library/no-node-access
    const icon = document.querySelector(".p-icon--chevron-down");
    expect(customLabel).toHaveTextContent("Custom label");
    expect(
      customLabel &&
        icon &&
        customLabel.compareDocumentPosition(icon) &
          Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
