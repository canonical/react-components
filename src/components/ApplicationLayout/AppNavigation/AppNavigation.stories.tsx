/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import classNames from "classnames";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Application from "components/ApplicationLayout/Application";
import AppMain from "components/ApplicationLayout/AppMain";
import Button from "components/Button";
import Icon from "components/Icon";
import Panel from "components/Panel";
import SideNavigation from "components/SideNavigation";
import Strip from "components/Strip";

import AppNavigation from "./AppNavigation";

const meta: Meta<typeof AppNavigation> = {
  component: AppNavigation,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppNavigation>;

/**
 * In most common cases an `AppNavigation` should contain a `<Panel>` and `<SideNavigation>`.
 *
 * `AppNavigation` should be a direct child of an `<Application>` or when using `ApplicationLayout`
 * it will wrap `navItems` and `sideNavigation`.
 */
export const Default: Story = {
  args: {
    children: "AppNavigation",
  },
};

export const States: Story = {
  render: (args) => {
    const [pinned, setPinned] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    return (
      <Application>
        <AppNavigation {...args} pinned={pinned} collapsed={collapsed}>
          <Panel
            dark
            controls={
              <>
                <Button
                  hasIcon
                  appearance="base"
                  className={classNames("u-no-margin u-hide--medium", {
                    "is-dark": true,
                  })}
                  onClick={(evt) => {
                    setCollapsed(true);
                    // The menu stays open while its content has focus, so the
                    // close button must blur to actually close the menu.
                    evt.currentTarget.blur();
                  }}
                >
                  <Icon
                    name="close"
                    className={classNames({ "is-light": true })}
                  >
                    Close menu
                  </Icon>
                </Button>
                <Button
                  hasIcon
                  appearance="base"
                  className={classNames("u-no-margin u-hide--small", {
                    "is-dark": true,
                  })}
                  onClick={() => {
                    setPinned(!pinned);
                  }}
                >
                  <Icon
                    name={pinned ? "close" : "pin"}
                    className={classNames({ "is-light": true })}
                  >
                    {pinned ? "Unpin menu" : "Pin menu"}
                  </Icon>
                </Button>
              </>
            }
            controlsClassName="u-hide--large"
            stickyHeader
            logo={{
              icon: "https://assets.ubuntu.com/v1/7144ec6d-logo-jaas-icon.svg",
              name: "https://assets.ubuntu.com/v1/2e04d794-logo-jaas.svg",
              nameAlt: "JAAS",
              href: "/",
            }}
          >
            <SideNavigation
              dark
              items={[
                {
                  items: [
                    {
                      icon: "drag",
                      label: "Models",
                      href: "/models",
                    },
                    {
                      icon: "menu",
                      label: "Controllers",
                      href: "/controllers",
                    },
                    {
                      icon: "user",
                      label: "Permissions",
                      href: "/permissions",
                    },
                  ],
                },
              ]}
            />
          </Panel>
        </AppNavigation>
        <AppMain>
          <Strip>
            <p>These behaviours are only available at smaller screen sizes:</p>
            <Button onClick={() => setPinned(!pinned)}>Pin</Button>
            <Button onClick={() => setCollapsed(!collapsed)}>Toggle</Button>
          </Strip>
        </AppMain>
      </Application>
    );
  },
};
