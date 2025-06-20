import React, { act } from "react";
import { render, screen } from "@testing-library/react";

import ActionButton, {
  Label,
  LOADER_MIN_DURATION,
  SUCCESS_DURATION,
} from "./ActionButton";

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
    expect(document.querySelector(icon)).toBeInTheDocument();
    // Move on to the success state.
    rerender(<ActionButton success>Click me</ActionButton>);
    act(() => {
      jest.advanceTimersByTime(LOADER_MIN_DURATION);
    });
    expect(screen.queryByLabelText(Label.WAITING)).not.toBeInTheDocument();
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
    expect(document.querySelector(icon)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(SUCCESS_DURATION + 1);
    });
    expect(screen.queryByLabelText(Label.SUCCESS)).not.toBeInTheDocument();
    expect(document.querySelector(icon)).not.toBeInTheDocument();
  });

  it("renders loading for LOADER_MIN_DURATION time when loading is shorter", () => {
    const { rerender } = render(<ActionButton loading>Click me</ActionButton>);
    expect(screen.getByLabelText(Label.WAITING)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();

    // use a very short time of loading (1ms)
    act(() => {
      jest.advanceTimersByTime(1);
    });
    rerender(<ActionButton success>Click me</ActionButton>);
    // it should still waiting for at least LOADER_MIN_DURATION
    expect(screen.getByLabelText(Label.WAITING)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();

    // make sure 1ms before the time of LOADER_MIN_DURATION is met
    // it should still render label as waiting
    act(() => {
      jest.advanceTimersByTime(LOADER_MIN_DURATION - 2);
    });
    expect(screen.getByLabelText(Label.WAITING)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();

    // add the last 1ms to match LOADER_MIN_DURATION
    act(() => {
      jest.advanceTimersByTime(1);
    });
    // the ActionButton should finish its loading job
    expect(screen.getByLabelText(Label.SUCCESS)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("renders loading for LOADER_MIN_DURATION + 3s when loading is longer", () => {
    const { rerender } = render(<ActionButton loading>Click me</ActionButton>);
    expect(screen.getByLabelText(Label.WAITING)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();

    // use a long time of loading (LOADER_MIN_DURATION + 3 seconds)
    act(() => {
      jest.advanceTimersByTime(LOADER_MIN_DURATION + 3000);
    });
    rerender(<ActionButton success>Click me</ActionButton>);
    // wait 1ms more after success to finish setTimeout with 0ms
    act(() => {
      jest.advanceTimersByTime(1);
    });
    // the ActionButton should finish its loading job at LOADER_MIN_DURATION + 3s
    expect(screen.getByLabelText(Label.SUCCESS)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
