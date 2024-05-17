import type { Meta, StoryObj } from "@storybook/react";

import Application from "components/ApplicationLayout/Application";
import Button from "components/Button";
import React from "react";
import Panel from "components/Panel";

import AppMain from "./AppMain";

const meta: Meta<typeof AppMain> = {
  component: AppMain,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppMain>;

/**
 * In most common cases an `AppMain` should contain a `<Panel>` to display the
 * content as intended in the application layout.
 *
 * `AppMain` should be a direct child of an `<Application>` or when using `ApplicationLayout`
 * it will automatically wrap the component's children.
 */
export const Default: Story = {
  args: {
    children: "AppMain",
  },
};

export const Content: Story = {
  render: (args) => {
    return (
      <Application>
        <AppMain {...args}>
          <Panel
            controls={
              <>
                <Button
                  appearance="positive"
                  onClick={() => {}}
                  className="u-no-margin--bottom"
                >
                  Add
                </Button>
                <Button
                  appearance="negative"
                  onClick={() => {}}
                  className="u-no-margin--bottom"
                >
                  Delete
                </Button>
              </>
            }
            title="App main"
          >
            <p>App main content.</p>
            <p>Scroll to the right to see the controls.</p>
          </Panel>
        </AppMain>
      </Application>
    );
  },
};
