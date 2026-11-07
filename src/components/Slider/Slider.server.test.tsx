/** @jest-environment node */
import React from "react";
import { renderToString } from "react-dom/server";

import Slider from "./Slider";

describe("Slider server rendering", () => {
  it("renders when navigator is not available", () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, "navigator");
    Reflect.deleteProperty(globalThis, "navigator");
    try {
      const view = renderToString(
        <Slider
          label="Volume"
          min={0}
          max={10}
          value={5}
          onChange={jest.fn()}
        />,
      );
      expect(view).toContain('type="range"');
      expect(view).toContain("Volume");
    } finally {
      if (descriptor) {
        Object.defineProperty(globalThis, "navigator", descriptor);
      }
    }
  });
});
