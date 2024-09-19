import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import SearchBox, { Label } from "./SearchBox";

describe("SearchBox ", () => {
  it("renders", () => {
    render(<SearchBox />);
    // Get the wrapping element for the snapshot.
    expect(document.querySelector(".p-search-box")).toMatchSnapshot();
  });

  it("shows the clear button when there is a value", () => {
    render(<SearchBox value="admin" />);
    expect(
      screen.getByRole("button", { name: Label.Clear }),
    ).toBeInTheDocument();
  });

  it("can externally control the value", () => {
    const { rerender } = render(
      <SearchBox externallyControlled onChange={jest.fn()} value="admin" />,
    );
    expect(screen.getByRole("searchbox")).toHaveAttribute("value", "admin");
    rerender(
      <SearchBox externallyControlled onChange={jest.fn()} value="new-admin" />,
    );
    expect(screen.getByRole("searchbox")).toHaveAttribute("value", "new-admin");
  });

  it("should call onSearch prop", async () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} />);
    await userEvent.type(screen.getByRole("searchbox"), "test");
    await userEvent.click(screen.getByRole("button", { name: Label.Search }));
    expect(onSearchMock).toHaveBeenCalledWith("test");
  });

  it("should call onSearch prop when externally controlled", async () => {
    const onSearchMock = jest.fn();
    render(<SearchBox onSearch={onSearchMock} value="externalvalue" />);
    await userEvent.click(screen.getByRole("button", { name: Label.Search }));
    expect(onSearchMock).toHaveBeenCalledWith("externalvalue");
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
      "testID",
    );
  });

  it("accepts a ref for the input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<SearchBox ref={ref} />);
    ref.current?.focus();
    expect(screen.getByRole("searchbox")).toHaveFocus();
  });

  it("after pressing the clear button focus remains on the button", async () => {
    render(
      <SearchBox externallyControlled onChange={jest.fn()} value="admin" />,
    );
    const searchInput = screen.getByRole("searchbox");
    const clearButton = screen.getByRole("button", {
      name: "Clear search field",
    });
    await userEvent.click(searchInput);
    await userEvent.click(clearButton);
    expect(clearButton).toHaveFocus();
  });

  it("after pressing the clear button focuses on the input field", async () => {
    render(
      <SearchBox
        externallyControlled
        shouldRefocusAfterReset
        onChange={jest.fn()}
        value="admin"
      />,
    );
    const searchInput = screen.getByRole("searchbox");
    const clearButton = screen.getByRole("button", {
      name: "Clear search field",
    });
    await userEvent.click(searchInput);
    await userEvent.click(clearButton);
    expect(searchInput).toHaveFocus();
  });

  it("calls onClear prop when the clear button is clicked", async () => {
    const handleOnClear = jest.fn();
    render(
      <SearchBox
        externallyControlled
        onChange={jest.fn()}
        onClear={handleOnClear}
        value="admin"
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: Label.Clear }));
    expect(handleOnClear).toBeCalled();
  });

  it("blurs when searching", async () => {
    render(<SearchBox />);
    const searchInput = screen.getByRole("searchbox");
    await userEvent.type(screen.getByRole("searchbox"), "test");
    expect(searchInput).toHaveFocus();
    await userEvent.type(screen.getByRole("searchbox"), "{Enter}");
    expect(searchInput).not.toHaveFocus();
  });

  it("can not blur when searching", async () => {
    render(<SearchBox shouldBlurOnSearch={false} />);
    const searchInput = screen.getByRole("searchbox");
    await userEvent.type(screen.getByRole("searchbox"), "test");
    expect(searchInput).toHaveFocus();
    await userEvent.type(screen.getByRole("searchbox"), "{Enter}");
    expect(searchInput).toHaveFocus();
  });
});
