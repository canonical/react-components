import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AppAside from "./AppAside";

it("displays without a close", async () => {
  render(<AppAside>Content</AppAside>);
  expect(
    screen.queryByRole("button", { name: "Close" })
  ).not.toBeInTheDocument();
});

it("displays a close button", async () => {
  const onClose = jest.fn();
  render(<AppAside onClose={onClose} />);
  expect(screen.getByText("Close")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Close" }));
  expect(onClose).toHaveBeenCalled();
});
