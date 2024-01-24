import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderComponent } from "testing/utils";

import AppAside from "./AppAside";

it("displays without a close", async () => {
  renderComponent(<AppAside>Content</AppAside>);
  expect(
    screen.queryByRole("button", { name: "Close" }),
  ).not.toBeInTheDocument();
});

it("displays a close button", async () => {
  const onClose = jest.fn();
  renderComponent(<AppAside onClose={onClose} />);
  expect(screen.getByText("Close")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Close" }));
  expect(onClose).toHaveBeenCalled();
});
