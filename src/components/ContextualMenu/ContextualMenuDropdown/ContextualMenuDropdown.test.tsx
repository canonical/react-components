import { render, screen, waitFor } from "@testing-library/react";
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

  it("doesn't change height if scrollOverflow not set", () => {
    render(
      <ContextualMenuDropdown
        isOpen
        links={Array.from({ length: 10 }).map((_, i) => i)}
      />
    );
    expect(
      document.querySelector(".p-contextual-menu__dropdown")
    ).not.toHaveAttribute("style");
  });

  it("changes height if scrollOverflow is set", async () => {
    global.innerHeight = 116;
    const positionNode = document.createElement("div");
    document.body.appendChild(positionNode);
    const links = Array.from({ length: 10 }).map((_, i) => i);
    const { rerender } = render(
      <ContextualMenuDropdown
        isOpen
        links={links}
        positionNode={positionNode}
        scrollOverflow
      />
    );
    // Rerender the component so that the hooks run again once the elements have
    // been created in the DOM.
    rerender(
      <ContextualMenuDropdown
        isOpen
        links={links}
        positionNode={positionNode}
        scrollOverflow
      />
    );
    await waitFor(() => {
      expect(
        document.querySelector(".p-contextual-menu__dropdown")
      ).toHaveAttribute(
        "style",
        "min-height: 2rem; overflow-x: auto; max-height: 100px;"
      );
    });
    positionNode.remove();
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
