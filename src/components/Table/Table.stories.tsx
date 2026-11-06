import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Table from "./Table";
import TableCell from "../TableCell";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import Button from "../Button";
import ContextualMenu from "../ContextualMenu";
import type { SortDirection } from "types";

const meta: Meta<typeof Table> = {
  component: Table,
  subcomponents: { TableRow, TableHeader, TableCell },
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

type Story = StoryObj<typeof Table>;

const machines = [
  { hostname: "karura", status: "Ready", cores: 8, ram: "16 GiB" },
  { hostname: "wombat", status: "Deploying", cores: 4, ram: "8 GiB" },
  { hostname: "koala", status: "Allocated", cores: 2, ram: "4 GiB" },
];

/**
 * `Table` can be composed with the `TableRow`, `TableHeader` and `TableCell`
 * components to build a table.
 *
 * For tables that need sorting, pagination or expanding rows out of the box,
 * see [MainTable](?path=/docs/components-maintable--docs), which is built with
 * these components.
 */
export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <thead>
        <TableRow>
          <TableHeader>Hostname</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader className="u-align--right">Cores</TableHeader>
          <TableHeader className="u-align--right">RAM</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {machines.map(({ hostname, status, cores, ram }) => (
          <TableRow key={hostname}>
            <TableCell role="rowheader">{hostname}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell className="u-align--right">{cores}</TableCell>
            <TableCell className="u-align--right">{ram}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  ),
};

/**
 * A `TableHeader` displays a sort button when both the `sort` and `onSort`
 * props are provided. Sorting the rows is left to the consumer.
 */
export const Sortable: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sort, setSort] = useState<SortDirection>("none");
    const nextSort: Record<SortDirection, SortDirection> = {
      none: "ascending",
      ascending: "descending",
      descending: "none",
    };
    const sortedMachines = [...machines];
    if (sort !== "none") {
      sortedMachines.sort(
        (a, b) =>
          a.hostname.localeCompare(b.hostname) *
          (sort === "ascending" ? 1 : -1),
      );
    }

    return (
      <Table {...args}>
        <thead>
          <TableRow>
            <TableHeader sort={sort} onSort={() => setSort(nextSort[sort])}>
              Hostname
            </TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="u-align--right">Cores</TableHeader>
            <TableHeader className="u-align--right">RAM</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {sortedMachines.map(({ hostname, status, cores, ram }) => (
            <TableRow key={hostname}>
              <TableCell role="rowheader">{hostname}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell className="u-align--right">{cores}</TableCell>
              <TableCell className="u-align--right">{ram}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    );
  },
};

/**
 * To display expandable content, set `expanding` on the `Table` and add a cell
 * with the `expanding` prop to each row. The cell is shown or hidden using the
 * `hidden` prop. An extra header is needed to account for the expanding cell.
 */
export const Expanding: Story = {
  args: {
    expanding: true,
  },

  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expandedRow, setExpandedRow] = useState<string | null>("karura");

    return (
      <Table {...args}>
        <thead>
          <TableRow>
            <TableHeader>Hostname</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="u-align--right">Details</TableHeader>
            <TableHeader aria-hidden="true">
              <span className="u-off-screen">Empty</span>
            </TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {machines.map(({ hostname, status, cores, ram }) => {
            const expanded = expandedRow === hostname;
            return (
              <TableRow key={hostname}>
                <TableCell role="rowheader">{hostname}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell className="u-align--right">
                  <Button
                    appearance="base"
                    aria-expanded={expanded}
                    className="u-no-margin--bottom"
                    dense
                    onClick={() => setExpandedRow(expanded ? null : hostname)}
                  >
                    {expanded ? "Hide" : "Show"}
                  </Button>
                </TableCell>
                <TableCell expanding hidden={!expanded}>
                  <p>
                    {hostname} has {cores} cores and {ram} of RAM.
                  </p>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    );
  },
};

/**
 * Set `responsive` on the `Table` to display each row as a card on small
 * screens. Each cell should be given a `data-heading` attribute to label its
 * content.
 */
export const Responsive: Story = {
  args: {
    responsive: true,
  },

  render: (args) => (
    <Table {...args}>
      <thead>
        <TableRow>
          <TableHeader>Hostname</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader className="u-align--right">Cores</TableHeader>
          <TableHeader className="u-align--right">RAM</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {machines.map(({ hostname, status, cores, ram }) => (
          <TableRow key={hostname}>
            <TableCell data-heading="Hostname" role="rowheader">
              {hostname}
            </TableCell>
            <TableCell data-heading="Status">{status}</TableCell>
            <TableCell className="u-align--right" data-heading="Cores">
              {cores}
            </TableCell>
            <TableCell className="u-align--right" data-heading="RAM">
              {ram}
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  ),
};

/**
 * If a cell may have overflowing content (such as a contextual menu) use the
 * `hasOverflow` prop on the `TableCell` to avoid cropping it.
 */
export const Overflow: Story = {
  render: (args) => (
    <Table {...args}>
      <thead>
        <TableRow>
          <TableHeader>Hostname</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader className="u-align--right">Actions</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {machines.map(({ hostname, status }) => (
          <TableRow key={hostname}>
            <TableCell role="rowheader">{hostname}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell className="u-align--right" hasOverflow>
              <ContextualMenu
                hasToggleIcon
                links={[
                  { children: "Deploy", onClick: () => {} },
                  { children: "Release", onClick: () => {} },
                ]}
                position="right"
                toggleLabel="Actions"
              />
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  ),
};
