import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { PropsWithChildren } from "react";
import { useClickOutside } from "./useClickOutside";

describe("useClickOutside", () => {
  const TestComponent = ({
    children,
    onClickOutside,
  }: PropsWithChildren<{
    onClickOutside: () => void;
  }>) => {
    const [wrapperRef, id] = useClickOutside<HTMLDivElement>(onClickOutside);
    return (
      <div>
        <div id={id} ref={wrapperRef}>
          Menu
          <button>Inside</button>
        </div>
        <button>Outside</button>
        {children}
      </div>
    );
  };

  it("handles clicks outside the target", () => {
    const onClickOutside = jest.fn();
    render(<TestComponent onClickOutside={onClickOutside} />);
    userEvent.click(screen.getByRole("button", { name: "Outside" }));
    expect(onClickOutside).toHaveBeenCalled();
  });

  it("handles clicks inside the target", () => {
    const onClickOutside = jest.fn();
    render(<TestComponent onClickOutside={onClickOutside} />);
    userEvent.click(screen.getByRole("button", { name: "Inside" }));
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it("handles clicking on elements that don't have string classNames", () => {
    const onClickOutside = jest.fn();
    render(
      <TestComponent onClickOutside={onClickOutside}>
        <svg data-testid="no-classname" />
      </TestComponent>
    );
    userEvent.click(screen.getByTestId("no-classname"));
    expect(onClickOutside).toHaveBeenCalled();
  });
});
