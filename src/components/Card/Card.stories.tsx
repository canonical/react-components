import React from "react";
import type { Meta } from "@storybook/react";

import Card, { CardProps } from "./";
import Col from "../Col";
import Row from "../Row";

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  args: {
    title: "We'd love to have you join us as a partner.",
    children:
      "If you are an independent software vendor or bundle author, it's easy to apply. You can find out more below.",
  },
};

export const Header = {
  args: {
    title: "Raspberry Pi2 and Pi3",
    thumbnail: "https://assets.ubuntu.com/v1/dca2e4c4-raspberry-logo.png",
    children:
      "For fun, for education and for profit, the RPi makes device development personal and entertaining. With support for both the Pi2 and the new Pi3, Ubuntu Core supports the world’s most beloved board.",
  },
};

export const Highlighted = {
  args: {
    ...Default.args,
    highlighted: true,
  },
};

export const Overlay = {
  args: {
    title: "Web browsing",
    overlay: true,
    children: `Renowned for speed and security, Ubuntu and Firefox make browsing
the web a pleasure again. Ubuntu also includes Chrome, Opera and
other browsers that can be installed from the Ubuntu Software
Centre.`,
  },
  render: (args: CardProps) => (
    <section
      className="p-strip--image is-light"
      style={{
        backgroundImage:
          "url('https://assets.ubuntu.com/v1/0a98afcd-screenshot_desktop.jpg')",
      }}
    >
      <Row>
        <Col size={6} emptyLarge={7}>
          <Card {...args} />
        </Col>
      </Row>
    </section>
  ),
};
