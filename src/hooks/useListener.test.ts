import { renderHook, RenderHookResult } from "@testing-library/react";

import { useListener } from "./useListener";

type Args = {
  targetNode?: HTMLElement;
  callback?: jest.Mock;
  eventType?: string;
  shouldThrottle?: boolean;
  shouldListen?: boolean;
};

describe("useListener", () => {
  let callback: jest.Mock;
  let targetNode: HTMLElement;
  let addEventListener: jest.SpyInstance;
  let removeEventListener: jest.SpyInstance;
  let defaultArgs: Args;
  let renderListener: (args?: Args) => RenderHookResult<Args, void>;

  beforeEach(() => {
    callback = jest.fn();
    targetNode = document.createElement("div");
    addEventListener = jest.spyOn(targetNode, "addEventListener");
    removeEventListener = jest.spyOn(targetNode, "removeEventListener");
    defaultArgs = {
      targetNode,
      callback,
      eventType: "mousemove",
      shouldThrottle: false,
      shouldListen: true,
    };
    renderListener = (initialProps) =>
      renderHook(
        (args) =>
          useListener(
            args.targetNode,
            args.callback,
            args.eventType,
            args.shouldThrottle,
            args.shouldListen
          ),
        {
          initialProps: {
            ...defaultArgs,
            ...initialProps,
          },
        }
      );
  });

  it("initially adds the listener", () => {
    renderListener();
    expect(addEventListener).toHaveBeenCalledWith("mousemove", callback);
  });

  it("does not add the listener if it shouldn't listen", () => {
    renderListener({ shouldListen: false });
    expect(addEventListener).not.toHaveBeenCalled();
  });

  it("adds the listener if it should start listening", () => {
    const { rerender } = renderListener({
      shouldListen: false,
    });
    expect(addEventListener).not.toHaveBeenCalled();
    rerender({
      ...defaultArgs,
      shouldListen: true,
    });
    expect(addEventListener).toHaveBeenCalled();
  });

  it("removes the listener if it should stop listening", () => {
    const { rerender } = renderListener({
      shouldListen: true,
    });
    rerender({
      ...defaultArgs,
      shouldListen: false,
    });
    expect(removeEventListener).toHaveBeenCalled();
  });

  it("re-adds the listener if the callback changes", () => {
    const { rerender } = renderListener();
    rerender({
      ...defaultArgs,
      callback: jest.fn(),
    });
    expect(removeEventListener).toHaveBeenCalled();
    expect(addEventListener).toHaveBeenCalled();
  });

  it("re-adds the listener if the event type changes", () => {
    const { rerender } = renderListener();
    rerender({
      ...defaultArgs,
      eventType: "resize",
    });
    expect(removeEventListener).toHaveBeenCalled();
    expect(addEventListener).toHaveBeenCalled();
  });

  it("re-adds the listener if the node changes", () => {
    const newNode = document.createElement("div");
    const newEventListener = jest.spyOn(newNode, "addEventListener");
    const { rerender } = renderListener();
    rerender({
      ...defaultArgs,
      targetNode: newNode,
    });
    expect(removeEventListener).toHaveBeenCalled();
    expect(newEventListener).toHaveBeenCalled();
  });

  it("re-adds the listener if the throttle option changes", () => {
    const { rerender } = renderListener();
    rerender({
      ...defaultArgs,
      shouldThrottle: true,
    });
    expect(removeEventListener).toHaveBeenCalled();
    expect(addEventListener).toHaveBeenCalled();
  });

  it("stops listening when unmounting", () => {
    const { unmount } = renderHook(() =>
      useListener(targetNode, callback, "mousemove")
    );
    expect(removeEventListener).not.toHaveBeenCalled();
    unmount();
    expect(removeEventListener).toHaveBeenCalled();
  });
});
