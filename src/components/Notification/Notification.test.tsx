import { render, screen } from "@testing-library/react";
import React from "react";

import Notification, { NotificationSeverity, Label } from "./Notification";
import userEvent from "@testing-library/user-event";

describe("Notification", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("renders", () => {
    render(
      <Notification
        data-testid="notification"
        severity={NotificationSeverity.INFORMATION}
        title="Permissions changed"
      >
        Anyone with access can view your invited users.
      </Notification>,
    );
    expect(screen.getByTestId("notification")).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    render(<Notification className="extra-class" data-testid="notification" />);
    expect(screen.getByTestId("notification")).toHaveClass("extra-class");
  });

  it("can be given a title", () => {
    const { rerender } = render(<Notification />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    rerender(<Notification title="Title" />);
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
  });

  it("can be made inline", () => {
    const { rerender } = render(<Notification data-testid="notification" />);
    expect(screen.getByTestId("notification")).not.toHaveClass("is-inline");
    rerender(<Notification inline data-testid="notification" />);
    expect(screen.getByTestId("notification")).toHaveClass("is-inline");
  });

  it("can have a borderless appearance", () => {
    const { rerender } = render(<Notification data-testid="notification" />);
    expect(screen.getByTestId("notification")).not.toHaveClass("is-borderless");
    rerender(<Notification borderless data-testid="notification" />);
    expect(screen.getByTestId("notification")).toHaveClass("is-borderless");
  });

  it("can be made dismissible", async () => {
    const onDismiss = jest.fn();
    const { rerender } = render(<Notification />);
    expect(
      screen.queryByRole("button", { name: Label.Close }),
    ).not.toBeInTheDocument();
    rerender(<Notification onDismiss={onDismiss} />);
    expect(
      screen.getByRole("button", { name: Label.Close }),
    ).toBeInTheDocument();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    await user.click(screen.getByRole("button", { name: Label.Close }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it("can be given a timestamp", () => {
    const timestamp = "1h ago";
    const { rerender } = render(<Notification />);
    expect(screen.queryByText(timestamp)).not.toBeInTheDocument();
    rerender(<Notification timestamp={timestamp} />);
    expect(screen.getByText(timestamp)).toBeInTheDocument();
    expect(screen.getByText(timestamp)).toHaveClass(
      "p-notification__timestamp",
    );
  });

  it("can be given actions", async () => {
    const onActionClick = jest.fn();
    const { rerender } = render(<Notification />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(
      <Notification actions={[{ label: "Action", onClick: onActionClick }]} />,
    );
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    await user.click(screen.getByRole("button", { name: "Action" }));
    expect(onActionClick).toHaveBeenCalled();
  });

  it("can automatically dismiss the notification after a given timeout period", () => {
    const onDismiss = jest.fn();
    const timeout = 1000;
    render(<Notification onDismiss={onDismiss} timeout={timeout} />);
    expect(onDismiss).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout + 1);
    expect(onDismiss).toHaveBeenCalled();
  });
});
