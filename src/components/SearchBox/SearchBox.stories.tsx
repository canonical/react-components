import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import SearchBox from "./SearchBox";

const meta: Meta<typeof SearchBox> = {
  component: SearchBox,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  name: "Default",
};

export const Disabled: Story = {
  render: () => <SearchBox disabled />,
  name: "Disabled",
};

/**
 * If you wish to control the value of the input via external state you can set
the `externallyControlled` prop and provide an `onChange` method to update the
state and the `value` from state.
 */
export const ExternalState: Story = {
  render: () => (
    <SearchBox
      externallyControlled
      shouldRefocusAfterReset
      onChange={() => {}}
      value="..."
    />
  ),

  name: "External state",
};

export const Navigation: Story = {
  render: () => (
    <header id="navigation" className="p-navigation">
      <div className="p-navigation__row--full-width">
        <div className="p-navigation__banner">
          <div className="p-navigation__logo">
            <a className="p-navigation__item" href="#test">
              <img
                className="p-navigation__image"
                src="https://assets.ubuntu.com/v1/5d6da5c4-logo-canonical-aubergine.svg"
                alt=""
                width="95"
              />
            </a>
          </div>
          <a
            href="#navigation"
            className="p-navigation__toggle--open"
            title="menu"
          >
            Menu
          </a>
          <a
            href="#navigation-closed"
            className="p-navigation__toggle--close"
            title="close menu"
          >
            Close menu
          </a>
        </div>
        <nav className="p-navigation__nav">
          <span className="u-off-screen">
            <a href="#main-content">Jump to main content</a>
          </span>
          <ul className="p-navigation__items" role="menu">
            <li className="p-navigation__item" role="menuitem">
              <a href="#test" className="p-navigation__link">
                Products
              </a>
            </li>
            <li className="p-navigation__item" role="menuitem">
              <a href="#test" className="p-navigation__link">
                Services
              </a>
            </li>
            <li className="p-navigation__item" role="menuitem">
              <a href="#test" className="p-navigation__link">
                Partners
              </a>
            </li>
            <li className="p-navigation__item" role="menuitem">
              <a href="#test" className="p-navigation__link">
                About
              </a>
            </li>
            <li className="p-navigation__item" role="menuitem">
              <a href="#test" className="p-navigation__link">
                Partners
              </a>
            </li>
          </ul>
          <SearchBox />
        </nav>
      </div>
    </header>
  ),

  name: "Navigation",
};
