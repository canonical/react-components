import { render, screen } from "@testing-library/react";
import merge from "deepmerge";
import React from "react";

import ContextualMenuDropdown, {
  adjustForWindow,
} from "./ContextualMenuDropdown";

jest.useFakeTimers("modern");

describe("ContextualMenuDropdown ", () => {
  it("renders", () => {
    render(<ContextualMenuDropdown links={["Link1"]} data-testid="dropdown" />);
    expect(screen.getByTestId("dropdown")).toMatchSnapshot();
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
      expect(adjustForWindow("right", generateFits())).toBe("right");
    });

    it("handles left that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "left",
          generateFits({
            fromLeft: { fitsRight: false },
          })
        )
      ).toBe("right");
    });

    it("handles right that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "right",
          generateFits({
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("left");
    });

    it("handles center that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false, fitsRight: false } },
            fromLeft: { fitsRight: false },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("center");
    });

    it("handles center that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false } },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("left");
    });

    it("handles center that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "center",
          generateFits({
            fromCenter: { fitsCentered: { fitsRight: false } },
            fromLeft: { fitsRight: false },
          })
        )
      ).toBe("right");
    });
  });
});
