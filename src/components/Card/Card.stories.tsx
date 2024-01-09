import React from "react";
import type { Meta } from "@storybook/react";

import Card from "./";
import Col from "../Col";
import Row from "../Row";

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Card](https://docs.vanillaframework.io/patterns/card/).
 * <br/>
 * <br/>
 * There are four card styles available to use in Vanilla: default, header, highlighted and overlay. Our card component will expand to fill the full width of its parent container.
 */

const meta: Meta<typeof Card> = {
  title: "Card",
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
  render: () => (
    <section
      className="p-strip--image is-light"
      style={{
        backgroundImage:
          "url('https://assets.ubuntu.com/v1/0a98afcd-screenshot_desktop.jpg')",
      }}
    >
      <Row>
        <Col size={6} emptyLarge={7}>
          <Card title="Web browsing" overlay>
            Renowned for speed and security, Ubuntu and Firefox make browsing
            the web a pleasure again. Ubuntu also includes Chrome, Opera and
            other browsers that can be installed from the Ubuntu Software
            Centre.
          </Card>
        </Col>
      </Row>
    </section>
  ),
};
