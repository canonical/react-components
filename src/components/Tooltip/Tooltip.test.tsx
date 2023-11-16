import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import merge from "deepmerge";
import React from "react";

import Tooltip, { adjustForWindow } from "./Tooltip";

describe("Tooltip", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders and matches the snapshot", () => {
    const { container } = render(
      <Tooltip message="text">
        <button>button text</button>
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });

  it("focuses on the first focusable element within the tooltip on pressing tab ", async () => {
    render(
      <Tooltip
        message={
          <>
            Additional information <a href="canonical.com">Canonical</a>
          </>
        }
      >
        <button>open the tooltip</button>
      </Tooltip>
    );

    await userEvent.click(
      screen.getByRole("button", { name: /open the tooltip/i })
    );
    await userEvent.tab();

    expect(screen.getByRole("link", { name: "Canonical" })).toHaveFocus();
  });

  it("adds a description to the wrapped element", async () => {
    render(
      <Tooltip message="Additional description">
        <button>open the tooltip</button>
      </Tooltip>
    );
    await userEvent.tab();
    expect(
      screen.getByRole("button", { name: /open the tooltip/ })
    ).toHaveAccessibleDescription("Additional description");
  });

  it("preserves click handlers for elements within the tooltip", async () => {
    const clickHandler = jest.fn();

    render(
      <Tooltip
        message={
          <>
            Additional information{" "}
            <a
              href="canonical.com"
              onClick={(e) => {
                e.preventDefault();
                clickHandler();
              }}
            >
              Canonical
            </a>
          </>
        }
      >
        <button>open the tooltip</button>
      </Tooltip>
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("link", { name: "Canonical" }));

    expect(clickHandler).toHaveBeenCalled();
  });

  it("does not propogate clicks on the tooltip message to the parent", async () => {
    const parentClick = jest.fn();
    jest.useFakeTimers("modern");
    render(
      <div onClick={parentClick}>
        <Tooltip message="a message">
          <button>open the tooltip</button>
        </Tooltip>
      </div>
    );
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    await user.hover(screen.getByRole("button"));
    act(() => {
      jest.runAllTimers();
    });

    await user.click(screen.getByRole("tooltip"));
    expect(parentClick).not.toHaveBeenCalled();
  });

  it("does not propogate clicks in the tooltip's children to the parent", async () => {
    const parentClick = jest.fn();
    jest.useFakeTimers("modern");
    render(
      <div onClick={parentClick}>
        <Tooltip
          message={
            <>
              Additional information{" "}
              <a
                href="example.com"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                Canonical
              </a>
            </>
          }
        >
          <button>open the tooltip</button>
        </Tooltip>
      </div>
    );
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    await user.hover(screen.getByRole("button"));
    act(() => {
      jest.runAllTimers();
    });
    await user.click(screen.getByRole("link", { name: "Canonical" }));
    expect(parentClick).not.toHaveBeenCalled();
  });

  it("does not show tooltip message by default", () => {
    render(<Tooltip message="tooltip text">Child</Tooltip>);
    expect(screen.queryByText("tooltip text")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tooltip-portal")).not.toBeInTheDocument();
  });

  it("renders tooltip message on focus", async () => {
    render(
      <Tooltip message="tooltip text">
        <button>open the tooltip</button>
      </Tooltip>
    );

    expect(screen.queryByTestId("tooltip-portal")).not.toBeInTheDocument();
    expect(screen.queryByText("tooltip text")).not.toBeInTheDocument();
    await userEvent.tab();
    expect(screen.getByTestId("tooltip-portal")).toBeInTheDocument();
    expect(screen.getByText("tooltip text")).toBeInTheDocument();
  });

  it("updates the tooltip to fit on the screen", async () => {
    jest.useFakeTimers("modern");
    render(
      <Tooltip
        message="text that is too long to fit on the screen"
        position="right"
      >
        <button>Child</button>
      </Tooltip>
    );
    global.innerWidth = 20;
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    await user.hover(screen.getByRole("button", { name: "Child" }));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByTestId("tooltip-portal")).toHaveClass(
      "p-tooltip--btm-left"
    );
    expect(screen.getByTestId("tooltip-portal")).toHaveClass("is-detached");
  });

  it("gives the correct class name to the tooltip", async () => {
    // ensure the tooltip fits in the window and the positioning className remains unchanged
    global.innerWidth = 500;
    jest.useFakeTimers("modern");
    render(
      <Tooltip message="text" position="right">
        <button>open the tooltip</button>
      </Tooltip>
    );
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    await user.hover(screen.getByRole("button", { name: "open the tooltip" }));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByTestId("tooltip-portal")).toHaveClass(
      "p-tooltip--right"
    );
  });

  it("assigns the correct z-index to the correct element", async () => {
    jest.useFakeTimers("modern");
    render(
      <Tooltip message="text" zIndex={999}>
        <button>open the tooltip</button>
      </Tooltip>
    );
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    await user.hover(screen.getByRole("button", { name: "open the tooltip" }));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByRole("tooltip")).toHaveStyle("z-index: 999");
  });

  describe("adjustForWindow", () => {
    const generateFits = (overrides = {}) => {
      const fits = {
        fromTop: {
          fitsAbove: true,
          fitsBelow: true,
          spaceAbove: 0,
          spaceBelow: 768,
        },
        fromBottom: {
          fitsAbove: true,
          fitsBelow: true,
          spaceAbove: 0,
          spaceBelow: 768,
        },
        fromLeft: {
          fitsLeft: true,
          fitsRight: true,
          spaceLeft: 0,
          spaceRight: 1024,
        },
        fromRight: {
          fitsLeft: true,
          fitsRight: true,
          spaceLeft: 0,
          spaceRight: 1024,
        },
        fromCenter: {
          fitsLeft: true,
          fitsRight: true,
          fitsAbove: true,
          fitsBelow: true,
          spaceLeft: 0,
          spaceRight: 1024,
          spaceAbove: 0,
          spaceBelow: 768,
          fitsCentered: {
            fitsLeft: true,
            fitsRight: true,
            fitsAbove: true,
            fitsBelow: true,
          },
        },
      };
      return merge(fits, overrides);
    };

    it("doesn't change if it fits", () => {
      expect(adjustForWindow("left", generateFits())).toBe("left");
      expect(adjustForWindow("btm-left", generateFits())).toBe("btm-left");
      expect(adjustForWindow("btm-center", generateFits())).toBe("btm-center");
      expect(adjustForWindow("btm-right", generateFits())).toBe("btm-right");
      expect(adjustForWindow("right", generateFits())).toBe("right");
      expect(adjustForWindow("top-right", generateFits())).toBe("top-right");
      expect(adjustForWindow("top-center", generateFits())).toBe("top-center");
      expect(adjustForWindow("top-left", generateFits())).toBe("top-left");
    });

    it("handles left that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "left",
          generateFits({
            fromLeft: { fitsLeft: false },
          })
        )
      ).toBe("top-right");
    });

    it("handles left that doesn't fit left and top", () => {
      expect(
        adjustForWindow(
          "left",
          generateFits({
            fromTop: { fitsAbove: false },
            fromLeft: { fitsLeft: false },
          })
        )
      ).toBe("btm-right");
    });

    it("handles btm-left that doesn't fit right from right edge", () => {
      expect(
        adjustForWindow(
          "btm-left",
          generateFits({
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("btm-left");
    });

    it("handles btm-left that doesn't fit right from left edge", () => {
      expect(
        adjustForWindow(
          "btm-left",
          generateFits({
            fromLeft: { fitsRight: false },
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("btm-right");
    });

    it("handles btm-left that doesn't fit bottom", () => {
      expect(
        adjustForWindow(
          "btm-left",
          generateFits({
            fromBottom: { fitsBelow: false },
          })
        )
      ).toBe("top-left");
    });

    it("handles btm-left that doesn't fit right and bottom", () => {
      expect(
        adjustForWindow(
          "btm-left",
          generateFits({
            fromBottom: { fitsBelow: false },
            fromLeft: { fitsRight: false },
          })
        )
      ).toBe("top-right");
    });

    it("handles btm-right that doesn't fit left from left edge", () => {
      expect(
        adjustForWindow(
          "btm-right",
          generateFits({
            fromLeft: { fitsLeft: false },
          })
        )
      ).toBe("btm-right");
    });

    it("handles btm-right that doesn't fit left from left edge", () => {
      expect(
        adjustForWindow(
          "btm-right",
          generateFits({
            fromLeft: { fitsLeft: false },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("btm-left");
    });

    it("handles btm-right that doesn't fit bottom", () => {
      expect(
        adjustForWindow(
          "btm-right",
          generateFits({
            fromBottom: { fitsBelow: false },
          })
        )
      ).toBe("top-right");
    });

    it("handles btm-right that doesn't fit left and bottom", () => {
      expect(
        adjustForWindow(
          "btm-right",
          generateFits({
            fromBottom: { fitsBelow: false },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("top-left");
    });

    it("handles right that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "right",
          generateFits({
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("top-left");
    });

    it("handles right that doesn't fit right and top", () => {
      expect(
        adjustForWindow(
          "right",
          generateFits({
            fromTop: { fitsAbove: false },
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("btm-left");
    });

    it("handles top-left that doesn't fit right from right edge", () => {
      expect(
        adjustForWindow(
          "top-left",
          generateFits({
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("top-left");
    });

    it("handles top-left that doesn't fit right from left edge", () => {
      expect(
        adjustForWindow(
          "top-left",
          generateFits({
            fromLeft: { fitsRight: false },
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("top-right");
    });

    it("handles top-left that doesn't fit top", () => {
      expect(
        adjustForWindow(
          "top-left",
          generateFits({
            fromTop: { fitsAbove: false },
          })
        )
      ).toBe("btm-left");
    });

    it("handles top-left that doesn't fit right and top", () => {
      expect(
        adjustForWindow(
          "top-left",
          generateFits({
            fromTop: { fitsAbove: false },
            fromLeft: { fitsRight: false },
          })
        )
      ).toBe("btm-right");
    });

    it("handles top-right that doesn't fit left from left edge", () => {
      expect(
        adjustForWindow(
          "top-right",
          generateFits({
            fromLeft: { fitsLeft: false },
          })
        )
      ).toBe("top-right");
    });

    it("handles top-right that doesn't fit left from right edge", () => {
      expect(
        adjustForWindow(
          "top-right",
          generateFits({
            fromLeft: { fitsLeft: false },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("top-left");
    });

    it("handles top-right that doesn't fit top", () => {
      expect(
        adjustForWindow(
          "top-right",
          generateFits({
            fromTop: { fitsAbove: false },
          })
        )
      ).toBe("btm-right");
    });

    it("handles top-right that doesn't fit left and top", () => {
      expect(
        adjustForWindow(
          "top-right",
          generateFits({
            fromTop: { fitsAbove: false },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("btm-left");
    });

    it("handles top-right that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "top-right",
          generateFits({
            fromLeft: { fitsLeft: false, fitsRight: false },
            fromRight: { fitsLeft: false, fitsRight: false },
          })
        )
      ).toBe("top-center");
    });

    it("handles top-left that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "top-left",
          generateFits({
            fromLeft: { fitsLeft: false, fitsRight: false },
            fromRight: { fitsLeft: false, fitsRight: false },
          })
        )
      ).toBe("top-center");
    });

    it("handles top-center that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "top-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false, fitsRight: false } },
          })
        )
      ).toBe("top-center");
      // top-center
    });

    it("handles top-center that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "top-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false } },
          })
        )
      ).toBe("top-left");
    });

    it("handles top-center that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "top-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsRight: false } },
          })
        )
      ).toBe("top-right");
    });

    it("handles btm-right that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "btm-right",
          generateFits({
            fromLeft: { fitsLeft: false, fitsRight: false },
            fromRight: { fitsLeft: false, fitsRight: false },
          })
        )
      ).toBe("btm-center");
    });

    it("handles btm-left that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "btm-left",
          generateFits({
            fromLeft: { fitsLeft: false, fitsRight: false },
            fromRight: { fitsLeft: false, fitsRight: false },
          })
        )
      ).toBe("btm-center");
    });

    it("handles btm-center that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "btm-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false, fitsRight: false } },
          })
        )
      ).toBe("btm-center");
    });

    it("handles btm-center that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "btm-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false } },
          })
        )
      ).toBe("btm-left");
    });

    it("handles btm-center that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "btm-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsRight: false } },
          })
        )
      ).toBe("btm-right");
    });
  });
});
