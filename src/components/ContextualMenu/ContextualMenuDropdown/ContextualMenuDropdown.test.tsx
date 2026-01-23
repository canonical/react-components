import { render, screen, waitFor } from "@testing-library/react";
import merge from "deepmerge";
import React from "react";

import ContextualMenuDropdown, {
  adjustForWindow,
  getNearestParentsZIndex,
} from "./ContextualMenuDropdown";

jest.useFakeTimers();

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
      />,
    );
    expect(
      document.querySelector(".p-contextual-menu__dropdown"),
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
      />,
    );
    // Rerender the component so that the hooks run again once the elements have
    // been created in the DOM.
    rerender(
      <ContextualMenuDropdown
        isOpen
        links={links}
        positionNode={positionNode}
        scrollOverflow
      />,
    );
    await waitFor(() => {
      expect(
        document.querySelector(".p-contextual-menu__dropdown"),
      ).toHaveAttribute(
        "style",
        "min-height: 2rem; overflow-x: auto; max-height: 100px;",
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
          }),
        ),
      ).toBe("right");
    });

    it("handles right that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "right",
          generateFits({
            fromRight: { fitsLeft: false },
          }),
        ),
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
          }),
        ),
      ).toBe("center");
    });

    it("handles center that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false } },
            fromRight: { fitsLeft: false },
          }),
        ),
      ).toBe("left");
    });

    it("handles center that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "center",
          generateFits({
            fromCenter: { fitsCentered: { fitsRight: false } },
            fromLeft: { fitsRight: false },
          }),
        ),
      ).toBe("right");
    });
  });

  describe("dropdown menu vertical positioning", () => {
    const renderMenu = (positionNode: HTMLElement, menuHeight: number) => {
      // need to mock overflow property for scrollparent
      jest
        .spyOn(global, "getComputedStyle")
        .mockImplementation((node: Element) => {
          if (node.id === "scrollParent") {
            return {
              overflowY: "auto",
              overflowX: "auto",
              getPropertyValue: (_: string) => "",
            } as CSSStyleDeclaration;
          }
          return {
            getPropertyValue: (_: string) => "",
          } as CSSStyleDeclaration;
        });

      // render the component once to setup initial jsdom elements
      const links = Array.from({ length: 10 }).map((_, i) => i);
      const { rerender } = render(
        <ContextualMenuDropdown
          autoAdjust
          setAdjustedPosition={jest.fn()}
          isOpen
          links={links}
          positionNode={positionNode}
        />,
      );

      // get the dropdown menu dom element and set its height
      // NOTE: we can only do this after the component has been rendered at least once
      const dropdownNode = document.querySelector(
        ".p-contextual-menu__dropdown",
      ) as HTMLElement;

      dropdownNode.getBoundingClientRect = jest
        .fn()
        .mockReturnValue({ height: menuHeight });

      rerender(
        <ContextualMenuDropdown
          autoAdjust
          setAdjustedPosition={jest.fn()}
          isOpen
          links={links}
          positionNode={positionNode}
        />,
      );
    };

    const assertMenuPosition = async (position: "above" | "below") => {
      await waitFor(() => {
        const dropdownNode = document.querySelector(
          ".p-contextual-menu__dropdown",
        ) as HTMLElement;

        let condition = expect(dropdownNode);
        if (position === "below") {
          condition = condition.not as jest.JestMatchers<HTMLElement>;
        }

        condition.toHaveAttribute("style", "bottom: 0px;");
      });
    };

    it("places menu below toggle if there is enough space in window and scroll parent", async () => {
      global.innerHeight = 1000;

      const scrollParent = document.createElement("div");
      jest.spyOn(scrollParent, "getBoundingClientRect").mockReturnValue({
        top: 0,
        bottom: 0,
        height: 1000,
      } as DOMRect);
      scrollParent.id = "scrollParent";

      const positionNode = document.createElement("div");
      jest.spyOn(positionNode, "getBoundingClientRect").mockReturnValue({
        top: 500,
        bottom: 480,
        height: 20,
      } as DOMRect);

      scrollParent.appendChild(positionNode);
      document.body.appendChild(scrollParent);

      const menuHeight = 200;
      renderMenu(positionNode, menuHeight);

      await assertMenuPosition("below");

      positionNode.remove();
    });

    it("places menu below toggle if there is not enough space in window or scroll parent, but there is more space below than above", async () => {
      global.innerHeight = 600;

      const scrollParent = document.createElement("div");
      jest.spyOn(scrollParent, "getBoundingClientRect").mockReturnValue({
        top: 180,
        bottom: 400,
        height: 20,
      } as DOMRect);
      scrollParent.id = "scrollParent";

      const positionNode = document.createElement("div");
      jest.spyOn(positionNode, "getBoundingClientRect").mockReturnValue({
        top: 100,
        bottom: 480,
        height: 20,
      } as DOMRect);

      scrollParent.appendChild(positionNode);
      document.body.appendChild(scrollParent);

      const menuHeight = 200;
      renderMenu(positionNode, menuHeight);

      await assertMenuPosition("below");

      positionNode.remove();
    });

    it("places menu above if there is not enough space in the window", async () => {
      global.innerHeight = 10;

      const positionNode = document.createElement("div");
      jest.spyOn(positionNode, "getBoundingClientRect").mockReturnValue({
        top: 0,
        bottom: 50,
        height: 50,
      } as DOMRect);

      jest.spyOn(document.body, "getBoundingClientRect").mockReturnValue({
        height: 10,
        bottom: 0,
        top: 0,
      } as DOMRect);
      document.body.appendChild(positionNode);

      const menuHeight = 200;
      renderMenu(positionNode, menuHeight);

      await assertMenuPosition("above");

      positionNode.remove();
    });

    it("places menu above if there is enough space in the window, but not enough space in the scroll parent", async () => {
      global.innerHeight = 500;

      const scrollParent = document.createElement("div");
      jest.spyOn(scrollParent, "getBoundingClientRect").mockReturnValue({
        top: 0,
        bottom: 0,
        height: 300,
      } as DOMRect);
      scrollParent.id = "scrollParent";

      const positionNode = document.createElement("div");
      jest.spyOn(positionNode, "getBoundingClientRect").mockReturnValue({
        top: 200,
        bottom: 400,
        height: 20,
      } as DOMRect);

      scrollParent.appendChild(positionNode);
      document.body.appendChild(scrollParent);

      const menuHeight = 200;
      renderMenu(positionNode, menuHeight);

      await assertMenuPosition("above");

      positionNode.remove();
    });
  });

  describe("getNearestParentsZIndex", () => {
    beforeEach(() => {
      jest.spyOn(global, "getComputedStyle").mockReturnValue({
        getPropertyValue: (_: string) => "",
      } as CSSStyleDeclaration);
    });

    it("should return '0' if the element is not available", () => {
      const actual = getNearestParentsZIndex(null);
      expect(actual).toBe("0");
    });

    it("should return the element's z-index if it does not have a parent", () => {
      jest.spyOn(global, "getComputedStyle").mockReturnValue({
        getPropertyValue: (_: string) => "5",
      } as CSSStyleDeclaration);

      const div = document.createElement("div");
      div.style.zIndex = "5";
      document.body.appendChild(div);

      const actual = getNearestParentsZIndex(div);
      expect(actual).toBe("5");

      document.body.removeChild(div);
    });

    it("should return the z-index of the closest parent with a defined value", () => {
      jest.spyOn(global, "getComputedStyle").mockReturnValue({
        getPropertyValue: (_: string) => "5",
      } as CSSStyleDeclaration);

      const grandparent = document.createElement("div");
      grandparent.style.zIndex = "5";
      const parent = document.createElement("div");
      parent.style.zIndex = "auto";
      const child = document.createElement("div");
      child.style.zIndex = "auto";
      parent.appendChild(child);
      grandparent.appendChild(parent);
      document.body.appendChild(grandparent);

      const actual = getNearestParentsZIndex(child);
      expect(actual).toBe("5");

      document.body.removeChild(grandparent);
    });
  });
});
