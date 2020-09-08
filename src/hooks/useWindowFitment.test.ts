import { renderHook } from "@testing-library/react-hooks";

import { WindowFitment, useWindowFitment } from "./useWindowFitment";

describe("useWindowFitment", () => {
  let callback: jest.Mock;
  let targetNode: HTMLElement;
  let referenceNode: HTMLElement;
  let fits: WindowFitment;

  beforeEach(() => {
    callback = jest.fn();
    targetNode = document.createElement("div");
    referenceNode = document.createElement("div");
    fits = {
      fromTop: { fitsAbove: false, fitsBelow: true },
      fromBottom: { fitsAbove: false, fitsBelow: true },
      fromLeft: { fitsLeft: false, fitsRight: true },
      fromRight: { fitsLeft: false, fitsRight: true },
      fromCenter: {
        fitsLeft: false,
        fitsRight: true,
        fitsAbove: false,
        fitsBelow: true,
        fitsCentered: {
          fitsLeft: false,
          fitsRight: true,
          fitsAbove: false,
          fitsBelow: true,
        },
      },
    };
  });

  it("can respond with the fitment info", () => {
    renderHook(() => useWindowFitment(targetNode, referenceNode, callback));
    expect(callback).toHaveBeenCalledWith(fits);
  });

  it("does not respond when not checking", () => {
    renderHook(() =>
      useWindowFitment(targetNode, referenceNode, callback, 0, false)
    );
    expect(callback).not.toHaveBeenCalled();
  });

  it("can respond when it fits on the screen", () => {
    referenceNode.getBoundingClientRect = () =>
      ({
        height: 10,
        left: 20,
        top: 20,
        width: 10,
      } as DOMRect);
    renderHook(() => useWindowFitment(targetNode, referenceNode, callback));
    expect(callback).toHaveBeenCalledWith({
      fromTop: { fitsAbove: true, fitsBelow: true },
      fromBottom: { fitsAbove: true, fitsBelow: true },
      fromLeft: { fitsLeft: true, fitsRight: true },
      fromRight: { fitsLeft: true, fitsRight: true },
      fromCenter: {
        fitsLeft: true,
        fitsRight: true,
        fitsAbove: true,
        fitsBelow: true,
        fitsCentered: {
          fitsLeft: true,
          fitsRight: true,
          fitsAbove: true,
          fitsBelow: true,
        },
      },
    });
  });

  it("can respond when does not fit on the screen", () => {
    targetNode.getBoundingClientRect = () =>
      ({
        height: 20,
        left: 5,
        top: 5,
        width: 20,
      } as DOMRect);
    global.innerHeight = 10;
    global.innerWidth = 10;
    renderHook(() => useWindowFitment(targetNode, referenceNode, callback));
    expect(callback).toHaveBeenCalledWith({
      fromTop: { fitsAbove: false, fitsBelow: false },
      fromBottom: { fitsAbove: false, fitsBelow: false },
      fromLeft: { fitsLeft: false, fitsRight: false },
      fromRight: { fitsLeft: false, fitsRight: false },
      fromCenter: {
        fitsLeft: false,
        fitsRight: false,
        fitsAbove: false,
        fitsBelow: false,
        fitsCentered: {
          fitsLeft: false,
          fitsRight: false,
          fitsAbove: false,
          fitsBelow: false,
        },
      },
    });
  });
});
