import { render, screen, within } from "@testing-library/react";
import React from "react";

import ContextualMenu, { Label } from "./ContextualMenu";
import { Label as DropdownLabel } from "./ContextualMenuDropdown/ContextualMenuDropdown";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("ContextualMenu ", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    render(<ContextualMenu data-testid="menu" links={[]} />);
    expect(screen.getByTestId("menu")).toMatchSnapshot();
  });

  it("can be aligned to the right", () => {
    render(<ContextualMenu data-testid="menu" links={[]} position="right" />);
    const menu = screen.getByTestId("menu");
    expect(menu).toHaveClass("p-contextual-menu");
    expect(menu).not.toHaveClass("p-contextual-menu--left");
    expect(menu).not.toHaveClass("p-contextual-menu--center");
  });

  it("can be aligned to the left", () => {
    render(<ContextualMenu data-testid="menu" links={[]} position="left" />);
    expect(screen.getByTestId("menu")).toHaveClass("p-contextual-menu--left");
  });

  it("can be aligned to the center", () => {
    render(<ContextualMenu data-testid="menu" links={[]} position="center" />);
    expect(screen.getByTestId("menu")).toHaveClass("p-contextual-menu--center");
  });

  it("can have a toggle button", () => {
    render(<ContextualMenu links={[]} toggleLabel="Toggle" />);
    expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<ContextualMenu links={[]} toggleDisabled toggleLabel="Toggle" />);
    expect(screen.getByRole("button", { name: "Toggle" })).toBeDisabled();
  });

  it("can have a toggle button with just an icon", () => {
    render(<ContextualMenu hasToggleIcon links={[]} />);
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(
        ".p-contextual-menu__toggle .p-contextual-menu__indicator"
      )
    ).toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: Label.Toggle });
    expect(toggle.childNodes).toHaveLength(1);
  });

  it("makes the icon light if the toggle is positive or negative", () => {
    render(
      <ContextualMenu hasToggleIcon links={[]} toggleAppearance="positive" />
    );
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(
        ".p-contextual-menu__toggle .p-contextual-menu__indicator"
      )
    ).toHaveClass("is-light");
  });

  it("can have a toggle button with an icon and text on the left", () => {
    render(
      <ContextualMenu
        hasToggleIcon
        links={[]}
        toggleLabel="Toggle"
        toggleLabelFirst
      />
    );
    const toggle = screen.getByRole("button", { name: "Toggle" });
    expect(toggle.childNodes[0].textContent).toBe("Toggle");
  });

  it("can have a toggle button with an icon and text on the right", () => {
    render(
      <ContextualMenu
        hasToggleIcon
        links={[]}
        toggleLabel="Toggle"
        toggleLabelFirst={false}
      />
    );
    const toggle = screen.getByRole("button", { name: "Toggle" });
    expect(toggle.childNodes[1].textContent).toBe("Toggle");
  });

  it("can have a toggle button with just text", () => {
    render(<ContextualMenu links={[]} toggleLabel="Toggle" />);
    expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument();
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-contextual-menu__indicator")
    ).not.toBeInTheDocument();
  });

  it("can not have a toggle button", () => {
    render(<ContextualMenu links={[]} />);
    expect(
      screen.queryByRole("button", { name: Label.Toggle })
    ).not.toBeInTheDocument();
  });

  it("can use the toggle button to display the menu", async () => {
    render(<ContextualMenu links={[]} toggleLabel="Toggle" />);
    expect(
      screen.queryByLabelText(DropdownLabel.Dropdown)
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Toggle", expanded: false })
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(
      screen.getByRole("button", { name: "Toggle", expanded: true })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(DropdownLabel.Dropdown)).toBeInTheDocument();
  });

  it("be visible without a toggle button", () => {
    render(<ContextualMenu links={[]} visible />);
    expect(screen.getByLabelText(DropdownLabel.Dropdown)).toBeInTheDocument();
  });

  it("can display links", () => {
    render(<ContextualMenu links={[{ children: "Link1" }]} visible />);
    expect(screen.getByRole("button", { name: "Link1" })).toBeInTheDocument();
  });

  it("can display links in groups", () => {
    render(<ContextualMenu links={[[{ children: "Link1" }]]} visible />);
    // eslint-disable-next-line testing-library/no-node-access
    const group = document.querySelector(
      ".p-contextual-menu__group"
    ) as HTMLElement;
    expect(group).toBeInTheDocument();
    expect(
      within(group).getByRole("button", { name: "Link1" })
    ).toBeInTheDocument();
  });

  it("can display a mix of links and groups", () => {
    render(
      <ContextualMenu
        links={[[{ children: "Link1" }], { children: "Link2" }]}
        visible
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const group = document.querySelector(
      ".p-contextual-menu__group"
    ) as HTMLElement;
    expect(group).toBeInTheDocument();
    expect(
      within(group).getByRole("button", { name: "Link1" })
    ).toBeInTheDocument();
    expect(
      within(group).queryByRole("button", { name: "Link2" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Link2" })).toBeInTheDocument();
  });

  it("can supply content instead of links", () => {
    render(
      <ContextualMenu visible>
        <span data-testid="content">content</span>
      </ContextualMenu>
    );
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-contextual-menu__link")
    ).not.toBeInTheDocument();
  });

  it("closes the menu when clicking on an item", async () => {
    render(
      <ContextualMenu
        links={[{ onClick: jest.fn(), children: "Link1" }]}
        toggleLabel="Toggle"
      />
    );
    // Open the menu:
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByLabelText(DropdownLabel.Dropdown)).toBeInTheDocument();
    // Click on an item:
    await userEvent.click(screen.getByRole("button", { name: "Link1" }));
    expect(
      screen.queryByLabelText(DropdownLabel.Dropdown)
    ).not.toBeInTheDocument();
  });

  it("can use a custom link component", () => {
    type LinkProps = {
      /** An address */
      to: string;
      children: React.ReactNode;
    };
    const Link = ({ children, to }: LinkProps) => <a href={to}>{children}</a>;
    render(
      <ContextualMenu
        links={[{ children: "Link1", element: Link, to: "http://example.com" }]}
        visible
      />
    );
    expect(screen.getByRole("link", { name: "Link1" })).toBeInTheDocument();
  });

  it("can pass props to the contextual menu", () => {
    render(<ContextualMenu links={[]} data-testid="extra-prop" />);
    expect(screen.getByTestId("extra-prop")).toBeInTheDocument();
    // Check that the prop was applied to the wrapping element:
    expect(screen.getByTestId("extra-prop")).toHaveClass("p-contextual-menu");
  });

  it("can pass props to the toggle button", () => {
    render(
      <ContextualMenu
        links={[]}
        toggleLabel="Toggle"
        toggleProps={{
          appearance: "negative",
          "data-testid": "extra-prop",
        }}
      />
    );
    expect(screen.getByTestId("extra-prop")).toBeInTheDocument();
    expect(screen.getByTestId("extra-prop")).toHaveClass("p-button--negative");
    // Check that the props were applied to the toggle element:
    expect(screen.getByTestId("extra-prop")).toHaveClass(
      "p-contextual-menu__toggle"
    );
  });

  it("can pass props to the contextual menu dropdown", async () => {
    render(
      <ContextualMenu
        links={[]}
        toggleLabel="Toggle"
        dropdownProps={{
          "data-testid": "extra-prop",
        }}
      />
    );
    // Open the menu.
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByTestId("extra-prop")).toBeInTheDocument();
    // Check that the props were applied to the dropdown element:
    expect(screen.getByTestId("extra-prop")).toHaveClass(
      "p-contextual-menu__dropdown"
    );
  });

  it("allows passing a component as a toggleLabel", () => {
    render(
      <ContextualMenu
        links={[]}
        position="right"
        toggleLabel={<span>toggleLabel component text</span>}
      />
    );
    expect(screen.getByText("toggleLabel component text")).toBeInTheDocument();
  });

  it("forwards close callback to child when it is a function", async () => {
    render(
      <ContextualMenu position="right" toggleLabel="Toggle">
        {(close: () => void) => <Button onClick={close}>child</Button>}
      </ContextualMenu>
    );

    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByLabelText(DropdownLabel.Dropdown)).toBeInTheDocument();
    // Click on an item:
    await userEvent.click(screen.getByRole("button", { name: "child" }));
    expect(
      screen.queryByLabelText(DropdownLabel.Dropdown)
    ).not.toBeInTheDocument();
  });

  it("does not forward close callback to child when it is an element", async () => {
    render(
      <ContextualMenu position="right" toggleLabel="Toggle">
        <span data-testid="child-span">child</span>
      </ContextualMenu>
    );

    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByLabelText(DropdownLabel.Dropdown)).toBeInTheDocument();
    // Click on an item:
    await userEvent.click(screen.getByTestId("child-span"));
    expect(screen.getByLabelText(DropdownLabel.Dropdown)).toBeInTheDocument();
  });
});
