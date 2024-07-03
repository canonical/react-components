import { useState } from "react";
import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import MainTable from "./MainTable";
import Row from "../Row";
import Col from "../Col";
import ContextualMenu from "../ContextualMenu";

const meta: Meta<typeof MainTable> = {
  component: MainTable,
  tags: ["autodocs"],

  argTypes: {
    headers: {
      control: {
        disable: true,
      },
    },

    rows: {
      control: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MainTable>;

export const Default: Story = {
  name: "Default",

  args: {
    headers: [
      {
        content: null,
      },
      {
        content: "Foundation Cloud",
      },
      {
        content: "Foundation Cloud Plus",
      },
    ],

    rows: [
      {
        columns: [
          {
            content: "Expert delivery of an Ubuntu OpenStack cloud",
            role: "rowheader",
          },
          {
            content: "Reference architecture",
          },
          {
            content: "Custom architecture",
          },
        ],
      },
      {
        columns: [
          {
            content: "Workshop and training",
            role: "rowheader",
          },
          {
            content: "2-days",
          },
          {
            content: "4-days",
          },
        ],
      },
      {
        columns: [
          {
            content: "One-time price",
            role: "rowheader",
          },
          {
            content: "$75,000",
          },
          {
            content: "$150,000",
          },
        ],
      },
    ],
  },
};

export const Sortable: Story = {
  render: () => (
    <MainTable
      headers={[
        {
          content: "Status",
          sortKey: "status",
        },
        {
          content: "Cores",
          sortKey: "cores",
          className: "u-align--right",
        },
        {
          content: "RAM",
          sortKey: "ram",
          className: "u-align--right",
        },
        {
          content: "Disks",
          sortKey: "disks",
          className: "u-align--right",
        },
        {
          content: "Networks",
          className: "u-align--right",
        },
      ]}
      rows={[
        {
          columns: [
            {
              content: "Ready",
              role: "rowheader",
            },
            {
              content: 1,
              className: "u-align--right",
            },
            {
              content: "1 GiB",
              className: "u-align--right",
            },
            {
              content: 2,
              className: "u-align--right",
            },
            {
              content: 42,
              className: "u-align--right",
            },
          ],

          sortData: {
            status: "ready",
            cores: 2,
            ram: 1,
            disks: 2,
          },
        },
        {
          columns: [
            {
              content: "Idle",
              role: "rowheader",
            },
            {
              content: 1,
              className: "u-align--right",
            },
            {
              content: "1 GiB",
              className: "u-align--right",
            },
            {
              content: 2,
              className: "u-align--right",
            },
            {
              content: 23,
              className: "u-align--right",
            },
          ],

          sortData: {
            status: "idle",
            cores: 1,
            ram: 1,
            disks: 2,
          },
        },
        {
          columns: [
            {
              content: "Waiting",
              role: "rowheader",
            },
            {
              content: 8,
              className: "u-align--right",
            },
            {
              content: "3.9 GiB",
              className: "u-align--right",
            },
            {
              content: 3,
              className: "u-align--right",
            },
            {
              content: 0,
              className: "u-align--right",
            },
          ],

          sortData: {
            status: "waiting",
            cores: 8,
            ram: 3.9,
            disks: 3,
          },
        },
      ]}
      sortable
    />
  ),

  name: "Sortable",
};

export const Expanding: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [expandedRow, setExpandedRow] = useState(1);

    return (
      <MainTable
        expanding
        headers={[
          {
            content: "Name",
          },
          {
            content: "Mac address",
          },
          {
            content: "IP",
          },
          {
            content: "Rack",
          },
          {
            content: "Last seen",
          },
          {
            content: "Actions",
            className: "u-align--right",
          },
        ]}
        rows={[
          {
            columns: [
              {
                content: "Unknown",
                role: "rowheader",
              },
              {
                content: "2c:44:fd:80:3f:25",
              },
              {
                content: "10.249.0.1",
              },
              {
                content: "karura",
              },
              {
                content: "Thu, 25 Oct. 2018 13:55:21",
              },
              {
                content: (
                  <button
                    className="u-toggle"
                    onClick={() => setExpandedRow(1)}
                  >
                    Show
                  </button>
                ),
                className: "u-align--right",
              },
            ],

            expanded: expandedRow === 1,

            expandedContent: (
              <Row>
                <Col size={8}>
                  <h4>Expanding table cell</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Consequuntur cum dicta beatae nostrum eligendi similique
                    earum, dolorem fuga quis, sequi voluptates architecto ipsa
                    dolorum eaque rem expedita inventore voluptas odit
                    aspernatur alias molestias facere.
                  </p>
                </Col>
              </Row>
            ),
          },
          {
            columns: [
              {
                content: "Unknown",
                role: "rowheader",
              },
              {
                content: "52:54:00:3a:fe:e9",
              },
              {
                content: "172.16.99.191",
              },
              {
                content: "karura",
              },
              {
                content: "Wed, 3 Oct. 2018 23:08:06",
              },
              {
                content: (
                  <button
                    className="u-toggle"
                    onClick={() => setExpandedRow(2)}
                  >
                    Show
                  </button>
                ),
                className: "u-align--right",
              },
            ],

            expanded: expandedRow === 2,

            expandedContent: (
              <Row>
                <Col size={8}>
                  <h4>Expanding table cell</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Consequuntur cum dicta beatae nostrum eligendi similique
                    earum, dolorem fuga quis, sequi voluptates architecto ipsa
                    dolorum eaque rem expedita inventore voluptas odit
                    aspernatur alias molestias facere.
                  </p>
                </Col>
              </Row>
            ),
          },
          {
            columns: [
              {
                content: "Unknown",
                role: "rowheader",
              },
              {
                content: "52:54:00:74:c2:10",
              },
              {
                content: "172.16.99.192",
              },
              {
                content: "karura",
              },
              {
                content: "Wed, 17 Oct. 2018 12:18:18",
              },
              {
                content: (
                  <button
                    className="u-toggle"
                    onClick={() => setExpandedRow(3)}
                  >
                    Show
                  </button>
                ),
                className: "u-align--right",
              },
            ],

            expanded: expandedRow === 3,

            expandedContent: (
              <Row>
                <Col size={8}>
                  <h4>Expanding table cell</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Consequuntur cum dicta beatae nostrum eligendi similique
                    earum, dolorem fuga quis, sequi voluptates architecto ipsa
                    dolorum eaque rem expedita inventore voluptas odit
                    aspernatur alias molestias facere.
                  </p>
                </Col>
              </Row>
            ),
          },
        ]}
      />
    );
  },

  name: "Expanding",
};

/**
 * If the table cell may have overflowing content (such as contextual menu) use `hasOverflow` prop to avoid cropping it.
 */
export const Overflow: Story = {
  render: () => {
    return (
      <MainTable
        headers={[
          {
            content: "Name",
          },
          {
            content: "Mac address",
          },
          {
            content: "IP",
          },
          {
            content: "Rack",
          },
          {
            content: "Last seen",
          },
          {
            content: "Actions",
            className: "u-align--right",
          },
        ]}
        rows={[
          {
            columns: [
              {
                content: "Unknown",
                role: "rowheader",
              },
              {
                content: "2c:44:fd:80:3f:25",
              },
              {
                content: "10.249.0.1",
              },
              {
                content: "karura",
              },
              {
                content: "Thu, 25 Oct. 2018 13:55:21",
              },
              {
                content: (
                  <ContextualMenu
                    links={[
                      {
                        children: "Link 1",
                        onClick: () => {},
                      },
                      {
                        children: "Link 2",
                        onClick: () => {},
                      },
                    ]}
                    hasToggleIcon
                    position="right"
                  />
                ),

                className: "u-align--right",
                hasOverflow: true,
              },
            ],
          },
          {
            columns: [
              {
                content: "Unknown",
                role: "rowheader",
              },
              {
                content: "52:54:00:3a:fe:e9",
              },
              {
                content: "172.16.99.191",
              },
              {
                content: "karura",
              },
              {
                content: "Wed, 3 Oct. 2018 23:08:06",
              },
              {
                content: (
                  <ContextualMenu
                    links={[
                      {
                        children: "Link 1",
                        onClick: () => {},
                      },
                      {
                        children: "Link 2",
                        onClick: () => {},
                      },
                    ]}
                    hasToggleIcon
                    position="right"
                  />
                ),

                className: "u-align--right",
                hasOverflow: true,
              },
            ],
          },
          {
            columns: [
              {
                content: "Unknown",
                role: "rowheader",
              },
              {
                content: "52:54:00:74:c2:10",
              },
              {
                content: "172.16.99.192",
              },
              {
                content: "karura",
              },
              {
                content: "Wed, 17 Oct. 2018 12:18:18",
              },
              {
                content: (
                  <ContextualMenu
                    links={[
                      {
                        children: "Link 1",
                        onClick: () => {},
                      },
                      {
                        children: "Link 2",
                        onClick: () => {},
                      },
                    ]}
                    hasToggleIcon
                    position="right"
                  />
                ),

                className: "u-align--right",
                hasOverflow: true,
              },
            ],
          },
        ]}
      />
    );
  },

  name: "Overflow",
};

export const Responsive: Story = {
  render: () => (
    <MainTable
      headers={[
        {
          content: (
            <span>
              Name<i className="p-icon--information"></i>
            </span>
          ),

          heading: "Name",
        },
        {
          content: "Users",
          className: "u-align--right",
        },
        {
          content: "Units",
          className: "u-align--right",
        },
      ]}
      rows={[
        {
          columns: [
            {
              content: "Ready",
              role: "rowheader",
            },
            {
              content: 1,
              className: "u-align--right",
            },
            {
              content: "1 GiB",
              className: "u-align--right",
            },
          ],
        },
        {
          columns: [
            {
              content: "Ready",
              role: "rowheader",
            },
            {
              content: 1,
              className: "u-align--right",
            },
            {
              content: "1 GiB",
              className: "u-align--right",
            },
          ],
        },
        {
          columns: [
            {
              content: "Ready",
              role: "rowheader",
            },
            {
              content: 1,
              className: "u-align--right",
            },
            {
              content: "1 GiB",
              className: "u-align--right",
            },
          ],
        },
      ]}
      responsive
    />
  ),

  name: "Responsive",
};

export const Paginated: Story = {
  render: () => (
    <MainTable
      headers={[
        {
          content: "Status",
        },
        {
          content: "Cores",
        },
      ]}
      paginate={5}
      rows={[
        {
          columns: [
            {
              content: "Ready",
            },
            {
              content: 1,
            },
          ],
        },
        {
          columns: [
            {
              content: "Idle",
            },
            {
              content: 4,
            },
          ],
        },
        {
          columns: [
            {
              content: "Waiting",
            },
            {
              content: 2,
            },
          ],
        },
        {
          columns: [
            {
              content: "Ready",
            },
            {
              content: 1,
            },
          ],
        },
        {
          columns: [
            {
              content: "Idle",
            },
            {
              content: 4,
            },
          ],
        },
        {
          columns: [
            {
              content: "Waiting",
            },
            {
              content: 2,
            },
          ],
        },
        {
          columns: [
            {
              content: "Ready",
            },
            {
              content: 1,
            },
          ],
        },
        {
          columns: [
            {
              content: "Idle",
            },
            {
              content: 4,
            },
          ],
        },
        {
          columns: [
            {
              content: "Waiting",
            },
            {
              content: 2,
            },
          ],
        },
        {
          columns: [
            {
              content: "Ready",
            },
            {
              content: 1,
            },
          ],
        },
        {
          columns: [
            {
              content: "Idle",
            },
            {
              content: 4,
            },
          ],
        },
        {
          columns: [
            {
              content: "Waiting",
            },
            {
              content: 2,
            },
          ],
        },
        {
          columns: [
            {
              content: "Ready",
            },
            {
              content: 1,
            },
          ],
        },
        {
          columns: [
            {
              content: "Idle",
            },
            {
              content: 4,
            },
          ],
        },
        {
          columns: [
            {
              content: "Waiting",
            },
            {
              content: 2,
            },
          ],
        },
        {
          columns: [
            {
              content: "Ready",
            },
            {
              content: 1,
            },
          ],
        },
        {
          columns: [
            {
              content: "Idle",
            },
            {
              content: 4,
            },
          ],
        },
        {
          columns: [
            {
              content: "Waiting",
            },
            {
              content: 2,
            },
          ],
        },
      ]}
    />
  ),

  name: "Paginated",
};

export const Empty: Story = {
  render: () => (
    <MainTable
      headers={[
        {
          content: "Plan",
        },
        {
          content: "Foundation Cloud",
        },
        {
          content: "Foundation Cloud Plus",
        },
      ]}
      rows={[]}
      emptyStateMsg="No data to display"
    />
  ),

  name: "Empty",
};
