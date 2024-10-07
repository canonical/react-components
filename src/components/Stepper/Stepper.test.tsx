import React from "react";
import { render, screen } from "@testing-library/react";
import Step from "./Step";
import Stepper from "./Stepper";

describe("Stepper component", () => {
  const steps = [
    <Step
      key="Step 1"
      title="Step 1"
      index={1}
      enabled={true}
      hasProgressLine={true}
      iconName="success"
      label="Optional label"
      handleClick={() => {}}
    />,
    <Step
      key="Step 2"
      title="Step 2"
      index={2}
      enabled={true}
      hasProgressLine={true}
      iconName="success"
      handleClick={() => {}}
      label="Optional label"
    />,
    <Step
      key="Step 3"
      title="Step 3"
      index={3}
      enabled={true}
      hasProgressLine={true}
      iconName="number"
      label="Optional label"
      linkProps={{ children: "Optional link" }}
      handleClick={() => {}}
    />,
    <Step
      key="Step 4"
      title="Step 4"
      index={4}
      enabled={false}
      hasProgressLine={false}
      linkProps={{ children: "Optional link" }}
      iconName="number"
      handleClick={() => {}}
    />,
  ];

  it("renders the stepper", () => {
    render(<Stepper steps={steps} />);
    expect(screen.getByRole("list")).toMatchSnapshot();
  });

  it("can be a horizontal stepper", () => {
    render(<Stepper steps={steps} variant="horizontal" />);
    expect(document.querySelector(".stepper-horizontal")).toBeInTheDocument();
  });

  it("can be a vertical stepper", () => {
    render(<Stepper steps={steps} variant="vertical" />);
    expect(document.querySelector(".stepper-vertical")).toBeInTheDocument();
  });
});
