/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Form from "components/Form";
import Input from "components/Input";
import Button from "components/Button";
import Row from "components/Row";
import Col from "components/Col";

import ApplicationLayout from "./ApplicationLayout";
import AppAside from "./AppAside";
import Panel from "components/Panel";
import Icon from "components/Icon";
import SideNavigation from "components/SideNavigation";

const meta: Meta<typeof ApplicationLayout> = {
  component: ApplicationLayout,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ApplicationLayout>;

export const Default: Story = {
  render: () => {
    const [showAside, setShowAside] = useState(true);
    const [asidePinned, setAsidePinned] = useState(false);

    return (
      <ApplicationLayout
        logo={{
          icon: "https://assets.ubuntu.com/v1/7144ec6d-logo-jaas-icon.svg",
          name: "https://assets.ubuntu.com/v1/2e04d794-logo-jaas.svg",
          nameAlt: "JAAS",
          href: "/",
        }}
        navItems={[
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
                href: "/users",
              },
            ],
          },
        ]}
        aside={
          showAside ? (
            <AppAside title="Aside panel" pinned={asidePinned}>
              <Panel
                controls={
                  <>
                    <Button
                      onClick={() => setAsidePinned(!asidePinned)}
                      dense
                      className="u-no-margin"
                    >
                      Pin aside
                    </Button>
                    <Button
                      appearance="base"
                      className="u-no-margin--bottom"
                      hasIcon
                      onClick={() => {
                        setShowAside(false);
                        setAsidePinned(false);
                      }}
                    >
                      <Icon name="close">Close</Icon>
                    </Button>
                  </>
                }
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
          ) : null
        }
        status={
          <Button
            onClick={() => setShowAside(!showAside)}
            dense
            appearance="base"
            className="u-no-margin"
          >
            Toggle aside
          </Button>
        }
      >
        <Panel title="Application Layout">
          <Row>
            <Col size={12}>Content</Col>
          </Row>
        </Panel>
      </ApplicationLayout>
    );
  },
};

/**
 * The pinned and collapsed states can be handled externally if you need access
 * to these outside the application layout.
 */
export const ExternalStates: Story = {
  render: () => {
    const [menuPinned, setMenuPinned] = useState(false);
    const [menuCollapsed, setMenuCollapsed] = useState(true);

    return (
      <ApplicationLayout
        menuPinned={menuPinned}
        onPinMenu={setMenuPinned}
        menuCollapsed={menuCollapsed}
        onCollapseMenu={setMenuCollapsed}
        logo={{
          icon: "https://assets.ubuntu.com/v1/7144ec6d-logo-jaas-icon.svg",
          name: "https://assets.ubuntu.com/v1/2e04d794-logo-jaas.svg",
          nameAlt: "JAAS",
          href: "/",
        }}
        navItems={[
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
                href: "/users",
              },
            ],
          },
        ]}
      >
        <Panel title="Application Layout">
          <Row>
            <Col size={12}>Content</Col>
          </Row>
        </Panel>
      </ApplicationLayout>
    );
  },
};

/**
 * Menu items can either be provided as an array given to `navItems` or when
 * more control is needed then by proving `sideNavigation`.
 *
 * For more details about how to provide navigation items see the
 * [`SideNavigation`](/docs/components-sidenavigation--docs) docs.
 */
export const Navigation: Story = {
  render: () => {
    const [menuPinned, setMenuPinned] = useState(false);
    const [menuCollapsed, setMenuCollapsed] = useState(true);

    return (
      <ApplicationLayout
        menuPinned={menuPinned}
        onPinMenu={setMenuPinned}
        menuCollapsed={menuCollapsed}
        onCollapseMenu={setMenuCollapsed}
        logo={{
          icon: "https://assets.ubuntu.com/v1/7144ec6d-logo-jaas-icon.svg",
          name: "https://assets.ubuntu.com/v1/2e04d794-logo-jaas.svg",
          nameAlt: "JAAS",
          href: "/",
        }}
        sideNavigation={
          <SideNavigation
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
                    href: "/users",
                  },
                ],
              },
            ]}
          />
        }
      >
        <Panel title="Application Layout">
          <Row>
            <Col size={12}>Content</Col>
          </Row>
        </Panel>
      </ApplicationLayout>
    );
  },
};
