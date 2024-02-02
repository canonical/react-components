import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  NotificationConsumer,
  NotificationProvider,
  useNotify,
} from "./NotificationProvider";
import Button from "../Button";
import { act } from "react-dom/test-utils";

describe("NotificationProvider", () => {
  it("stores and renders notifications", async () => {
    const handleRetry = jest.fn();

    const TriggerComponent = () => {
      const notify = useNotify();
      const handleSuccess = () => notify.success("My success!");
      const handleClear = () => notify.clear();
      const handleInfo = () => notify.info("Some more details", "Test info");
      const handleError = () =>
        notify.failure(
          "Fail title",
          new Error("error message"),
          "Button caused a failure",
          [
            {
              label: "Retry",
              onClick: handleRetry,
            },
          ]
        );

      return (
        <div>
          <Button onClick={handleSuccess} data-testid="success-btn" />
          <Button onClick={handleClear} data-testid="clear-btn" />
          <Button onClick={handleError} data-testid="error-btn" />
          <Button onClick={handleInfo} data-testid="info-btn" />
        </div>
      );
    };

    render(
      <div>
        <NotificationProvider>
          <TriggerComponent />
          <div data-testid="notification-consumer">
            <NotificationConsumer />
          </div>
        </NotificationProvider>
      </div>
    );

    const clickBtn = async (testId: string) =>
      await act(async () => await userEvent.click(screen.getByTestId(testId)));

    expect(screen.getByTestId("notification-consumer")).toBeEmptyDOMElement();

    await clickBtn("success-btn");
    expect(screen.getByTestId("notification-consumer")).toMatchSnapshot();

    await clickBtn("clear-btn");
    expect(screen.getByTestId("notification-consumer")).toBeEmptyDOMElement();

    await clickBtn("error-btn");
    expect(screen.getByTestId("notification-consumer")).toMatchSnapshot();

    expect(handleRetry).not.toHaveBeenCalled();
    await clickBtn("notification-action");
    expect(handleRetry).toHaveBeenCalled();

    await clickBtn("info-btn");
    expect(screen.getByTestId("notification-consumer")).toMatchSnapshot();
  });
});
