import { render, screen } from "@testing-library/react";
import React from "react";

import Spinner from "./Spinner";

describe("<Spinner />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    render(<Spinner />);

    expect(screen.getByRole("alert")).toMatchSnapshot();
  });

  it("renders and matches the snapshot with text", () => {
    render(<Spinner text="foo" />);

    expect(screen.getByRole("alert")).toMatchSnapshot();
  });

  // unit tests
  it("renders a spinner icon", () => {
    render(<Spinner />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(".p-icon--spinner")).toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("renders text correctly if given text prop", () => {
    const text = "Loading...";
    render(<Spinner text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-icon--spinner")?.textContent
    ).not.toContain(text);
  });

  it("renders Loading... for icon text if no text prop is provided", () => {
    render(<Spinner />);
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-icon--spinner")?.textContent
    ).toBe("Loading");
  });

  it("renders an assertive spinner", () => {
    render(<Spinner ariaLive={"assertive"} />);

    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
  });

  it("renders a light spinner if given isLight prop", () => {
    render(<Spinner isLight />);

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-icon--spinner")
    ).toHaveClass("is-light");
  });

  it("renders a custom aria-label", () => {
    render(<Spinner aria-label="custom loading text" />);

    expect(screen.getByRole("alert")).toHaveAttribute(
      "aria-label",
      "custom loading text"
    );
  });
});
