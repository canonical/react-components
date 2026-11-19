import { render, screen } from "@testing-library/react";
import React from "react";
import { renderToString } from "react-dom/server.node";

import Slider from "./Slider";

describe("Slider", () => {
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

  it("can render without an additional number input", () => {
    render(
      <Slider
        max={10}
        min={0}
        onChange={jest.fn()}
        showInput={false}
        value={5}
      />,
    );
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
  });

  it("can render with an additional number input", () => {
    render(
      <Slider max={10} min={0} onChange={jest.fn()} showInput value={5} />,
    );
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("can display an error", async () => {
    render(
      <Slider
        max={10}
        min={0}
        onChange={jest.fn()}
        showInput={false}
        value={5}
        error="Uh oh!"
      />,
    );
    expect(screen.getByRole("slider")).toHaveAccessibleErrorMessage("Uh oh!");
  });

  it("can display help", async () => {
    const help = "Save me!";
    render(
      <Slider
        max={10}
        min={0}
        onChange={jest.fn()}
        showInput={false}
        value={5}
        help={help}
      />,
    );
    expect(screen.getByRole("slider")).toHaveAccessibleDescription(help);
  });
});
