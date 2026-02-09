import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createEventQueue } from "./EventQueue";
import Button from "../Button";

type Event = { message: string };

const { EventQueueProvider, useEventQueue } = createEventQueue<Event>();

describe("EventQueue", () => {
  const operationId = "test-operation-id";

  let user: ReturnType<typeof userEvent.setup>;
  let successSpy: jest.Mock;
  let failureSpy: jest.Mock;
  let finishSpy: jest.Mock;

  beforeEach(() => {
    user = userEvent.setup();
    successSpy = jest.fn();
    failureSpy = jest.fn();
    finishSpy = jest.fn();
  });

  const TriggerComponent = () => {
    const queue = useEventQueue();

    const handleRegister = () => {
      queue.set(operationId, successSpy, failureSpy, finishSpy);
    };

    const triggerSuccess = () => {
      const event = queue.get(operationId);
      event?.onSuccess({ message: "Success!" });
      event?.onFinish?.();
      queue.remove(operationId);
    };

    const triggerFailure = () => {
      const event = queue.get(operationId);
      event?.onFailure("Something went wrong.");
      event?.onFinish?.();
      queue.remove(operationId);
    };

    return (
      <div>
        <Button onClick={handleRegister} data-testid="register-btn" />
        <Button onClick={triggerSuccess} data-testid="success-btn" />
        <Button onClick={triggerFailure} data-testid="failure-btn" />
      </div>
    );
  };

  const renderQueue = () =>
    render(
      <EventQueueProvider>
        <TriggerComponent />
      </EventQueueProvider>,
    );

  it("calls onSuccess and onFinish when success is triggered", async () => {
    renderQueue();
    await user.click(screen.getByTestId("register-btn"));
    await user.click(screen.getByTestId("success-btn"));

    expect(successSpy).toHaveBeenCalledWith({ message: "Success!" });
    expect(failureSpy).not.toHaveBeenCalled();
    expect(finishSpy).toHaveBeenCalled();
  });

  it("calls onFailure and onFinish when failure is triggered", async () => {
    renderQueue();
    await user.click(screen.getByTestId("register-btn"));
    await user.click(screen.getByTestId("failure-btn"));

    expect(failureSpy).toHaveBeenCalledWith("Something went wrong.");
    expect(successSpy).not.toHaveBeenCalled();
    expect(finishSpy).toHaveBeenCalled();
  });

  it("does nothing if callback is not registered", async () => {
    renderQueue();
    await user.click(screen.getByTestId("success-btn"));
    await user.click(screen.getByTestId("failure-btn"));

    expect(successSpy).not.toHaveBeenCalled();
    expect(failureSpy).not.toHaveBeenCalled();
    expect(finishSpy).not.toHaveBeenCalled();
  });
});
