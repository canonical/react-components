import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Application from "components/ApplicationLayout/Application";
import Button from "components/Button";
import Panel from "components/Panel";

import AppStatus from "./AppStatus";
import AppMain from "../AppMain";
import Strip from "components/Strip";
import Spinner from "components/Spinner";

const meta: Meta<typeof AppStatus> = {
  component: AppStatus,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppStatus>;

/**
 * `AppStatus` can contain a `<Panel>` to display the content as intended in the
 * application layout.
 *
 * `AppStatus` should be a direct child of an `<Application>` or when using `ApplicationLayout`
 * it will automatically wrap the content passed to the `status` prop.
 */
export const Default: Story = {
  render: (args) => {
    return (
      <Application>
        <AppMain>
          <Strip>
            <p>Scroll to the bottom to see the status bar.</p>
          </Strip>
        </AppMain>
        <AppStatus {...args}>
          <Panel wrapContent={false}>
            <p className="u-no-margin--bottom">
              <Spinner /> Update in progress...{" "}
              <Button
                appearance="base"
                onClick={() => {}}
                dense
                className="u-no-margin"
              >
                Retry
              </Button>
            </p>
          </Panel>
        </AppStatus>
      </Application>
    );
  },
};
