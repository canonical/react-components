import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Application from "components/ApplicationLayout/Application";
import AppMain from "components/ApplicationLayout/AppMain";
import Panel from "components/Panel";
import Strip from "components/Strip";

import AppNavigationBar from "./AppNavigationBar";

const meta: Meta<typeof AppNavigationBar> = {
  component: AppNavigationBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppNavigationBar>;

/**
 * In most common cases an `AppNavigationBar` should contain a `<Panel>`.
 *
 * `AppNavigationBar` should be a direct child of an `<Application>` or when using `ApplicationLayout`
 * it will already be included.
 *
 * The toggle state should control the collapsed state of `AppNavigation`.
 */
export const Default: Story = {
  args: {
    children: "AppNavigation",
  },
};

export const States: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapsed, setCollapsed] = useState(true);
    return (
      <Application>
        <AppNavigationBar {...args}>
          <Panel
            dark
            logo={{
              icon: "https://assets.ubuntu.com/v1/7144ec6d-logo-jaas-icon.svg",
              name: "https://assets.ubuntu.com/v1/2e04d794-logo-jaas.svg",
              nameAlt: "JAAS",
              href: "/",
            }}
            toggle={{
              label: "Menu",
              onClick: () => setCollapsed(!collapsed),
            }}
          />
        </AppNavigationBar>
        <AppMain>
          <Strip>
            <p>Reduce your window size to mobile to see the navigation bar.</p>
            <p>
              Pass the collapsed state to the main menu:{" "}
              <code>{`<AppNavigation collapsed={${collapsed}} />`}</code>
            </p>
          </Strip>
        </AppMain>
      </Application>
    );
  },
};
