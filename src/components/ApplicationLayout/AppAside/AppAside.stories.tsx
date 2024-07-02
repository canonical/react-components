/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Application from "components/ApplicationLayout/Application";
import AppMain from "components/ApplicationLayout/AppMain";
import Button from "components/Button";
import Col from "components/Col";
import Form from "components/Form";
import Icon from "components/Icon";
import Input from "components/Input";
import Panel from "components/Panel";
import Row from "components/Row";

import AppAside from "./AppAside";

const meta: Meta<typeof AppAside> = {
  component: AppAside,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppAside>;

/**
 * In most common cases an `AppAside` should contain a `<Panel>` to display the
 * content as intended in the application layout.
 *
 * `AppAside` should be a direct child of an `<Application>` or passed to the
 * application layout `<ApplicationLayout aside={<AppAside .../>}>`.
 */
export const Default: Story = {
  render: (args) => {
    const [pinned, setPinned] = useState(false);
    const [width, setWidth] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Application>
        <AppMain>
          <p>Scroll to the right to see the panel.</p>
          <Button onClick={() => setCollapsed(false)}>Open</Button>
          <Button onClick={() => setWidth("narrow")}>Narrow</Button>
          <Button onClick={() => setWidth(null)}>Default</Button>
          <Button onClick={() => setWidth("wide")}>Wide</Button>
        </AppMain>
        <AppAside
          {...args}
          pinned={pinned}
          wide={width === "wide"}
          narrow={width === "narrow"}
          collapsed={collapsed}
        >
          <Panel
            controls={
              <>
                <Button
                  onClick={() => setPinned(!pinned)}
                  dense
                  className="u-no-margin--bottom"
                >
                  Pin
                </Button>
                <Button
                  appearance="base"
                  className="u-no-margin--bottom"
                  hasIcon
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <Icon name="close">Close</Icon>
                </Button>
              </>
            }
            title="App aside"
          >
            <Form stacked>
              <Input
                label="Full name"
                type="text"
                name="fullName"
                autoComplete="name"
                stacked
              />
              <Input
                label="Username"
                type="text"
                name="username-stacked"
                autoComplete="username"
                aria-describedby="exampleHelpTextMessage"
                stacked
                help="30 characters or fewer."
              />
              <Input
                type="text"
                label="Email address"
                aria-invalid="true"
                name="username-stackederror"
                autoComplete="email"
                required
                error="This field is required."
                stacked
              />
              <Input
                label="Address line 1"
                type="text"
                name="address-optional-stacked"
                autoComplete="address-line1"
                stacked
              />
              <Input
                label="Address line 2"
                type="text"
                name="address-optional-stacked"
                autoComplete="address-line3"
                stacked
              />
              <Row>
                <Col size={12}>
                  <Button
                    appearance="positive"
                    className="u-float-right"
                    name="add-details"
                  >
                    Add details
                  </Button>
                </Col>
              </Row>
            </Form>
          </Panel>
        </AppAside>
      </Application>
    );
  },
};
