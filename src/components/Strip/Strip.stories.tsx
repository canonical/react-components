import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Col from "../Col";
import Row from "../Row";
import Strip from "./Strip";

const meta: Meta<typeof Strip> = {
  component: Strip,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Strip>;

export const LightStrip: Story = {
  name: "Light strip",

  args: {
    type: "light",
    children: <p>This is a light row</p>,
  },
};

export const DarkStrip: Story = {
  render: () => (
    <Strip type="dark">
      <p>This is a dark row</p>
    </Strip>
  ),

  name: "Dark strip",
};

export const AccentStrip: Story = {
  render: () => (
    <Strip type="accent" element="section" includeCol={false}>
      <Col size={8}>
        <h1>Still running Ubuntu 14.04 LTS?</h1>
        <p>
          Learn how to maintain ongoing security compliance for your Ubuntu
          14.04 LTS systems.
        </p>
      </Col>
      <Col size={4}>
        <img
          src="https://assets.ubuntu.com/v1/2217d1c8-Security.svg"
          alt="Placeholder"
        />
      </Col>
    </Strip>
  ),

  name: "Accent strip",
};

export const ImageStrip: Story = {
  render: () => (
    <>
      <Strip
        background="https://assets.ubuntu.com/sites/ubuntu/latest/u/img/backgrounds/image-background-paper.png"
        includeCol={false}
        element="section"
        light
        rowClassName="u-vertically-center"
        type="image"
      >
        <Col size={8}>
          <h1>Get started with big software, fast</h1>
          <p>
            conjure-up lets you summon up a big-software stack as a “spell” — a
            model of the stack, combined with extra know-how to get you from an
            installed stack to a fully usable one. Start using your big software
            instead of learning how to deploy it.
          </p>
        </Col>
        <Col size={4} className="u-hide--small u-align--center">
          <img
            src="https://assets.ubuntu.com/v1/1abb8716-conjure-up-illustration.svg"
            alt="Placeholder"
          />
        </Col>
      </Strip>
      <Strip
        background="https://assets.ubuntu.com/v1/9b68976e-Aubergine_suru_background_2.png"
        dark
        includeCol={false}
        element="section"
        type="image"
      >
        <Row className="u-vertically-center">
          <Col size={8}>
            <h1>We are Canonical</h1>
            <p>
              It is our mission to make open source software available to people
              everywhere. We believe the best way to fuel innovation is to give
              the innovators the technology they need.
            </p>
          </Col>
          <Col size={4} className="u-hide--small u-align--center">
            <img
              src="https://assets.ubuntu.com/v1/9c74eb2d-logo-canonical-white.svg"
              alt="Placeholder"
            />
          </Col>
        </Row>
      </Strip>
    </>
  ),

  name: "Image strip",
  parameters: {
    percy: {
      waitForTimeout: 1000, // Wait for 1 second before taking a snapshot to allow the image to load
    },
  },
};

export const BorderedStrip: Story = {
  render: () => (
    <Strip bordered colSize={8} element="section">
      <h2>The node lifecycle</h2>
      <p>
        Each machine (“node”) managed by MAAS goes through a lifecycle — from
        its enlistment or onboarding to MAAS, through commissioning when we
        inventory and can setup firmware or other hardware-specific elements,
        then allocation to a user and deployment, and finally they are released
        back to the pool or retired altogether.
      </p>
    </Strip>
  ),

  name: "Bordered strip",
};

export const DeepStrip: Story = {
  render: () => (
    <Strip
      deep
      includeCol={false}
      element="section"
      type="light"
      rowClassName="u-vertically-center"
    >
      <Col size={8}>
        <h2>The fastest way to go from development to production in IoT</h2>
        <p>
          Learn about how Ubuntu Core and snaps can help you build your
          connected devices.
        </p>
      </Col>
      <Col size={4} className="u-hide--small u-align--center">
        <img
          src="https://assets.ubuntu.com/v1/808a4e5b-iot.png?h=300"
          alt="Placeholder"
        />
      </Col>
    </Strip>
  ),

  name: "Deep strip",
};

export const ShallowStrip: Story = {
  render: () => (
    <Strip
      shallow
      includeCol={false}
      element="section"
      type="light"
      rowClassName="u-vertically-center"
    >
      <Col size={8}>
        <h2>The fastest way to go from development to production in IoT</h2>
        <p>
          Learn about how Ubuntu Core and snaps can help you build your
          connected devices.
        </p>
      </Col>
      <Col size={4} className="u-hide--small u-align--center">
        <img
          src="https://assets.ubuntu.com/v1/808a4e5b-iot.png?h=300"
          alt="Placeholder"
        />
      </Col>
    </Strip>
  ),

  name: "Shallow strip",
};
