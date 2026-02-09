import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Col from "./Col";
import Row from "../Row";
import { ColProps } from ".";

const Template = (args: ColProps) => {
  return (
    <div className="grid-demo">
      <Row>
        <Col {...args} />
      </Row>
    </div>
  );
};

const meta: Meta<typeof Template> = {
  component: Col,
  render: Template,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },

    size: {
      control: {
        type: "range",
        min: 1,
        max: 12,
        step: 1,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Col>;

export const Default: Story = {
  name: "Default",

  args: {
    children: "Hi, I'm Col.",
    size: 12,
  },
};

export const Grid: Story = {
  render: () => {
    return (
      <div className="grid-demo">
        <Row>
          <Col size={12}>
            <span>.col-12</span>
          </Col>
        </Row>
        <Row>
          <Col size={11}>
            <span>.col-11</span>
          </Col>
          <Col size={1}>
            <span>.col-1</span>
          </Col>
        </Row>
        <Row>
          <Col size={10}>
            <span>.col-10</span>
          </Col>
          <Col size={2}>
            <span>.col-2</span>
          </Col>
        </Row>
        <Row>
          <Col size={9}>
            <span>.col-9</span>
          </Col>
          <Col size={3}>
            <span>.col-3</span>
          </Col>
        </Row>
        <Row>
          <Col size={8}>
            <span>.col-8</span>
          </Col>
          <Col size={4}>
            <span>.col-4</span>
          </Col>
        </Row>
        <Row>
          <Col size={7}>
            <span>.col-7</span>
          </Col>
          <Col size={5}>
            <span>.col-5</span>
          </Col>
        </Row>
        <Row>
          <Col size={6}>
            <span>.col-6</span>
          </Col>
          <Col size={6}>
            <span>.col-6</span>
          </Col>
        </Row>
        <Row>
          <Col size={5}>
            <span>.col-5</span>
          </Col>
          <Col size={7}>
            <span>.col-7</span>
          </Col>
        </Row>
        <Row>
          <Col size={4}>
            <span>.col-4</span>
          </Col>
          <Col size={8}>
            <span>.col-8</span>
          </Col>
        </Row>
        <Row>
          <Col size={3}>
            <span>.col-3</span>
          </Col>
          <Col size={9}>
            <span>.col-9</span>
          </Col>
        </Row>
        <Row>
          <Col size={2}>
            <span>.col-2</span>
          </Col>
          <Col size={10}>
            <span>.col-10</span>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <span>.col-1</span>
          </Col>
          <Col size={11}>
            <span>.col-11</span>
          </Col>
        </Row>
      </div>
    );
  },

  name: "Grid",
};

export const NestedColumns: Story = {
  render: () => {
    return (
      <div className="grid-demo">
        <Row>
          <Col small={4} medium={6} size={12}>
            col-small-4 .col-medium-6 .col-12
            <Row>
              <Col small={3} medium={3} size={9}>
                col-small-3 .col-medium-3 .col-9
                <Row>
                  <Col small={1} medium={1} size={2}>
                    col-small-1 col-medium-1 col-2
                  </Col>
                  <Col small={1} medium={1} size={3}>
                    col-small-1 col-medium-1 col-2
                  </Col>
                  <Col small={1} medium={1} size={3}>
                    col-small-1 col-medium-1 col-2
                  </Col>
                </Row>
              </Col>
              <Col small={1} medium={3} size={3}>
                col-small-2 col-medium-3 col-3
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  },

  name: "Nested columns",
};

export const EmptyColumns: Story = {
  render: () => {
    return (
      <div className="grid-demo">
        <Row>
          <Col size={8}>.col-8</Col>
          <Col size={4}>.col-4</Col>
        </Row>
        <Row>
          <Col size={7}>.col-7</Col>
          <Col size={4}>
            <Row>
              <Col size={3} emptyLarge={2}>
                col-3 col-start-large-2 inside col-4
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col size={7}>.col-7</Col>
          <Col size={4}>
            <Row>
              <Col size={3}>col-3 inside col-4</Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  },

  name: "Empty columns",
};
