import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import SearchBox, { Label } from "./SearchBox";

describe("SearchBox ", () => {
  it("renders", () => {
    render(<SearchBox />);
    // Get the wrapping element for the snapshot.
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(".p-search-box")).toMatchSnapshot();
  });

  it("shows the clear button when there is a value", () => {
    render(<SearchBox value="admin" />);
    expect(
      screen.getByRole("button", { name: Label.Clear })
    ).toBeInTheDocument();
  });

  it("can externally control the value", () => {
    const { rerender } = render(
      <SearchBox externallyControlled onChange={jest.fn()} value="admin" />
    );
    expect(screen.getByRole("searchbox")).toHaveAttribute("value", "admin");
    rerender(
      <SearchBox externallyControlled onChange={jest.fn()} value="new-admin" />
    );
    expect(screen.getByRole("searchbox")).toHaveAttribute("value", "new-admin");
  });

  it("should call onSearch prop", async () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} />);
    await userEvent.click(screen.getByRole("button", { name: Label.Search }));
    expect(onSearchMock).toBeCalled();
  });

  it("should call onChange prop", async () => {
    const onChangeMock = jest.fn();
    render(<SearchBox onChange={onChangeMock} />);
    await userEvent.type(screen.getByRole("searchbox"), "test");
    expect(onChangeMock).toBeCalledWith("test");
  });

  it("renders extra props", () => {
    render(<SearchBox data-testid="testID" />);
    expect(screen.getByRole("searchbox")).toHaveAttribute(
      "data-testid",
      "testID"
    );
  });

  it("accepts a ref for the input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<SearchBox ref={ref} />);
    ref.current?.focus();
    expect(screen.getByRole("searchbox")).toHaveFocus();
  });
});
