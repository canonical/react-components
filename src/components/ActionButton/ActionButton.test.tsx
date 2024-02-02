import React from "react";
import { render, screen } from "@testing-library/react";

import ActionButton, {
  Label,
  LOADER_MIN_DURATION,
  SUCCESS_DURATION,
} from "./ActionButton";
import { act } from "react-dom/test-utils";

describe("ActionButton", () => {
  jest.useFakeTimers();

  it("matches loading snapshot", () => {
    render(<ActionButton loading>Click me</ActionButton>);
    expect(screen.getByRole("button")).toMatchSnapshot();
  });

  it("matches success snapshot", () => {
    const { rerender } = render(<ActionButton loading>Click me</ActionButton>);
    // Move on to the success state.
    rerender(<ActionButton success>Click me</ActionButton>);
    act(() => {
      jest.advanceTimersByTime(LOADER_MIN_DURATION + 1);
    });
    expect(screen.getByRole("button")).toMatchSnapshot();
  });

  it("shows a loader icon for the correct amount of time", () => {
    const { rerender } = render(<ActionButton loading>Click me</ActionButton>);
    // Check for the accessible element.
    expect(screen.getByLabelText(Label.WAITING)).toBeInTheDocument();
    const icon = ".p-icon--spinner";
    // Check for the visual element.
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(icon)).toBeInTheDocument();
    // Move on to the success state.
    rerender(<ActionButton success>Click me</ActionButton>);
    act(() => {
      jest.advanceTimersByTime(LOADER_MIN_DURATION);
    });
    expect(screen.queryByLabelText(Label.WAITING)).not.toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(icon)).not.toBeInTheDocument();
  });

  it("shows a success icon for the correct amount of time", () => {
    const { rerender } = render(<ActionButton loading>Click me</ActionButton>);
    // Move on to the success state.
    rerender(<ActionButton success>Click me</ActionButton>);
    act(() => {
      jest.advanceTimersByTime(LOADER_MIN_DURATION + 1);
    });
    // Check for the accessible element.
    expect(screen.getByLabelText(Label.SUCCESS)).toBeInTheDocument();
    const icon = ".p-icon--success";
    // Check for the visual element.
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(icon)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(SUCCESS_DURATION + 1);
    });
    expect(screen.queryByLabelText(Label.SUCCESS)).not.toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(icon)).not.toBeInTheDocument();
  });
});
