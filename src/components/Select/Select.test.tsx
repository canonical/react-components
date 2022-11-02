import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import Select from "./Select";

describe("Select", () => {
  it("renders", () => {
    render(
      <Select
        id="test-id"
        options={[
          { value: "", disabled: true, label: "Select an option" },
          { value: "1", label: "Cosmic Cuttlefish" },
          { value: "2", label: "Bionic Beaver" },
          { value: "3", label: "Xenial Xerus" },
        ]}
        wrapperClassName="select"
      />
    );
    expect(screen.getByRole("combobox")).toMatchSnapshot();
  });

  it("should call onChange prop", async () => {
    const onChangeMock = jest.fn();
    const event = {
      target: {
        value: "selected option",
      },
    };
    render(<Select options={[]} onChange={onChangeMock} />);
    fireEvent.change(screen.getByRole("combobox"), event);
    expect(onChangeMock.mock.calls[0][0].target).toBe(
      screen.getByRole("combobox")
    );
  });

  it("can add additional classes", () => {
    render(<Select className="extra-class" options={[]} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("p-form-validation__input");
    expect(select).toHaveClass("extra-class");
  });

  it("can take focus on first render", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    render(<Select options={[]} takeFocus />);
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("can take null options", () => {
    render(<Select options={null} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("can display an error", async () => {
    render(<Select error="Uh oh!" />);
    expect(screen.getByRole("combobox")).toHaveErrorMessage("Error: Uh oh!");
  });

  it("can display help", async () => {
    const help = "Save me!";
    render(<Select help={help} />);
    expect(screen.getByRole("combobox")).toHaveAccessibleDescription(help);
  });
});
