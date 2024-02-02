import { renderHook } from "@testing-library/react";

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
      fromTop: {
        fitsAbove: false,
        fitsBelow: true,
        spaceAbove: 0,
        spaceBelow: 768,
      },
      fromBottom: {
        fitsAbove: false,
        fitsBelow: true,
        spaceAbove: 0,
        spaceBelow: 768,
      },
      fromLeft: {
        fitsLeft: false,
        fitsRight: true,
        spaceLeft: 0,
        spaceRight: 1024,
      },
      fromRight: {
        fitsLeft: false,
        fitsRight: true,
        spaceLeft: 0,
        spaceRight: 1024,
      },
      fromCenter: {
        fitsLeft: false,
        fitsRight: true,
        fitsAbove: false,
        fitsBelow: true,
        spaceLeft: 0,
        spaceRight: 1024,
        spaceAbove: 0,
        spaceBelow: 768,
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
      }) as DOMRect;
    renderHook(() => useWindowFitment(targetNode, referenceNode, callback));
    expect(callback).toHaveBeenCalledWith({
      fromTop: {
        fitsAbove: true,
        fitsBelow: true,
        spaceAbove: 20,
        spaceBelow: 748,
      },
      fromBottom: {
        fitsAbove: true,
        fitsBelow: true,
        spaceAbove: 30,
        spaceBelow: 738,
      },
      fromLeft: {
        fitsLeft: true,
        fitsRight: true,
        spaceLeft: 20,
        spaceRight: 1004,
      },
      fromRight: {
        fitsLeft: true,
        fitsRight: true,
        spaceLeft: 30,
        spaceRight: 994,
      },
      fromCenter: {
        fitsLeft: true,
        fitsRight: true,
        fitsAbove: true,
        fitsBelow: true,
        spaceAbove: 25,
        spaceBelow: 743,
        spaceLeft: 25,
        spaceRight: 999,
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
      }) as DOMRect;
    global.innerHeight = 10;
    global.innerWidth = 10;
    renderHook(() => useWindowFitment(targetNode, referenceNode, callback));
    expect(callback).toHaveBeenCalledWith({
      fromTop: {
        fitsAbove: false,
        fitsBelow: false,
        spaceAbove: 0,
        spaceBelow: 10,
      },
      fromBottom: {
        fitsAbove: false,
        fitsBelow: false,
        spaceAbove: 0,
        spaceBelow: 10,
      },
      fromLeft: {
        fitsLeft: false,
        fitsRight: false,
        spaceLeft: 0,
        spaceRight: 10,
      },
      fromRight: {
        fitsLeft: false,
        fitsRight: false,
        spaceLeft: 0,
        spaceRight: 10,
      },
      fromCenter: {
        fitsLeft: false,
        fitsRight: false,
        fitsAbove: false,
        fitsBelow: false,
        spaceAbove: 0,
        spaceBelow: 10,
        spaceLeft: 0,
        spaceRight: 10,
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
