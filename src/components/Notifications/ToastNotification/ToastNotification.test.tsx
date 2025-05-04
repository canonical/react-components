import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToastNotification from "./ToastNotification";
import ToastNotificationList from "./ToastNotificationList";
import { ToastNotificationType } from "./ToastNotificationProvider";

describe("ToastNotification", () => {
  beforeEach(() => {
    // mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string): MediaQueryList => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }),
    });

    // mock animations API
    Element.prototype.animate = jest.fn(() => {
      return {
        currentTime: 0,
        effect: null,
        finished: Promise.resolve(),
        id: "",
        oncancel: null,
        onfinish: null,
        pause: jest.fn(),
        play: jest.fn(),
        cancel: jest.fn(),
        reverse: jest.fn(),
        startTime: 0,
        playbackRate: 1,
        playState: "finished",
        timeline: null,
        updatePlaybackRate: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      } as unknown as Animation;
    });
  });

  const baseNotification: ToastNotificationType = {
    id: "test-toast",
    type: "information",
    title: "Test Notification",
    message: "This is a test toast message.",
  };

  it("renders a single notification with title and message", () => {
    render(
      <ToastNotification
        notification={baseNotification}
        show={true}
        onDismiss={jest.fn()}
      />,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Test Notification")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test toast message."),
    ).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    const onDismiss = jest.fn();
    render(
      <ToastNotification
        notification={baseNotification}
        show={true}
        onDismiss={onDismiss}
      />,
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it("renders a toast with a timestamp", () => {
    const timestamp = "1h ago";
    render(
      <ToastNotification
        notification={{ ...baseNotification, timestamp }}
        show={true}
        onDismiss={jest.fn()}
      />,
    );
    expect(screen.getByText(timestamp)).toBeInTheDocument();
  });

  it("does not render the toast if show is false", () => {
    render(
      <ToastNotification
        notification={baseNotification}
        show={false}
        onDismiss={jest.fn()}
      />,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  const notifications: ToastNotificationType[] = [
    {
      id: "1",
      type: "positive",
      message: "Success!",
      title: "Success",
    },
    {
      id: "2",
      type: "negative",
      message: "Error!",
      title: "Failure",
    },
  ];

  const groupedCount = {
    positive: 1,
    negative: 1,
  };

  it("renders a list of notifications", () => {
    render(
      <ToastNotificationList
        notifications={notifications}
        onDismiss={jest.fn()}
        groupedCount={groupedCount}
        show={true}
      />,
    );
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Failure")).toBeInTheDocument();
  });

  it("shows filter buttons for available severities", () => {
    render(
      <ToastNotificationList
        notifications={notifications}
        onDismiss={jest.fn()}
        groupedCount={groupedCount}
        show={true}
      />,
    );

    expect(
      screen.getByLabelText("Filter positive notifications"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Filter negative notifications"),
    ).toBeInTheDocument();
  });

  it("does not render list if show is false", () => {
    render(
      <ToastNotificationList
        notifications={notifications}
        onDismiss={jest.fn()}
        groupedCount={groupedCount}
        show={false}
      />,
    );

    expect(screen.queryByText("Success")).not.toBeInTheDocument();
    expect(screen.queryByText("Failure")).not.toBeInTheDocument();
  });
});
