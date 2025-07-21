import { render, screen } from "@testing-library/react";
import React from "react";

import ThemeSwitcher from "./ThemeSwitcher";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ThemeSwitcher", () => {
  it("renders", () => {
    const { container } = render(<ThemeSwitcher />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("applies theme on interaction", async () => {
    render(<ThemeSwitcher />);
    const localStorage = window.localStorage.__proto__;
    const localstorageSpy = jest.spyOn(localStorage, "setItem");
    const bodyClassAddSpy = jest.spyOn(document.body.classList, "add");
    const bodyClassRemoveSpy = jest.spyOn(document.body.classList, "remove");

    // apply dark theme
    const darkBtn = screen.getByRole("button", { name: "dark" });
    await userEvent.click(darkBtn);
    expect(localstorageSpy).toHaveBeenCalledWith("theme", "dark");
    expect(bodyClassAddSpy).toHaveBeenCalledWith("is-dark");

    // apply light theme
    const lightBtn = screen.getByRole("button", { name: "light" });
    await userEvent.click(lightBtn);
    expect(localstorageSpy).toHaveBeenCalledWith("theme", "light");
    expect(bodyClassRemoveSpy).toHaveBeenCalledWith("is-dark");
  });
});
