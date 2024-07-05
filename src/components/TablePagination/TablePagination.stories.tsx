import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import TablePagination from "./TablePagination";
import MainTable from "../MainTable";

const meta: Meta<typeof TablePagination> = {
  component: TablePagination,
  tags: ["autodocs"],

  argTypes: {
    totalItems: {
      if: {
        arg: "externallyControlled",
        truthy: true,
      },
    },

    currentPage: {
      if: {
        arg: "externallyControlled",
        truthy: true,
      },
    },

    pageSize: {
      if: {
        arg: "externallyControlled",
        truthy: true,
      },
    },

    onPageChange: {
      if: {
        arg: "externallyControlled",
        truthy: true,
      },
    },

    onPageSizeChange: {
      if: {
        arg: "externallyControlled",
        truthy: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TablePagination>;

export const Default: Story = {
  name: "Default",

  args: {
    data: [
      {
        id: "row-1",
      },
      {
        id: "row-2",
      },
      {
        id: "row-3",
      },
      {
        id: "row-4",
      },
      {
        id: "row-5",
      },
    ],
  },
};

export const CustomPageLimit: Story = {
  name: "CustomPageLimit",

  args: {
    data: [
      {
        id: "row-1",
      },
      {
        id: "row-2",
      },
      {
        id: "row-3",
      },
      {
        id: "row-4",
      },
      {
        id: "row-5",
      },
    ],

    pageLimits: [1, 2, 3],
  },
};

export const CustomDisplayTitle: Story = {
  name: "CustomDisplayTitle",

  args: {
    data: [
      {
        id: "row-1",
      },
      {
        id: "row-2",
      },
      {
        id: "row-3",
      },
      {
        id: "row-4",
      },
      {
        id: "row-5",
      },
    ],

    description: <b>Hello there</b>,
  },
};

export const RenderAbove: Story = {
  render: () => {
    const data = [
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
    ];

    const headers = [
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
    ];

    return (
      <TablePagination data={data} pageLimits={[1, 2, 3]}>
        <MainTable headers={headers} rows={data} sortable />
      </TablePagination>
    );
  },

  name: "RenderAbove",
};

export const RenderBelow: Story = {
  render: () => {
    const data = [
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
    ];

    const headers = [
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
    ];

    return (
      <TablePagination data={data} pageLimits={[1, 2, 3]} position="below">
        <MainTable headers={headers} rows={data} sortable />
      </TablePagination>
    );
  },

  name: "RenderBelow",
};
