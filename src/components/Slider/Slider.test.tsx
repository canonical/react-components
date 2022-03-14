import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import React from "react";

import Slider from "./Slider";

describe("Slider", () => {
  it("can render without an additional number input", () => {
    const wrapper = shallow(
      <Slider
        max={10}
        min={0}
        onChange={jest.fn()}
        showInput={false}
        value={5}
      />
    );
    expect(wrapper.find("input[type='number']").exists()).toBe(false);
  });

  it("can render with an additional number input", () => {
    const wrapper = shallow(
      <Slider max={10} min={0} onChange={jest.fn()} showInput value={5} />
    );
    expect(wrapper.find("input[type='number']").exists()).toBe(true);
  });
});

describe("Slider RTL", () => {
  it("can display an error", async () => {
    render(
      <Slider
        max={10}
        min={0}
        onChange={jest.fn()}
        showInput={false}
        value={5}
        error="Uh oh!"
      />
    );
    expect(screen.getByRole("slider")).toHaveErrorMessage("Error: Uh oh!");
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
      />
    );
    expect(screen.getByRole("slider")).toHaveAccessibleDescription(help);
  });
});
