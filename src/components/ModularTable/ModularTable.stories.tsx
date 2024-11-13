import { useState } from "react";
import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import SummaryButton from "../SummaryButton";
import ModularTable from "./ModularTable";
import { ICONS } from "../Icon";
import { CellProps, Column } from "react-table";

type Cell<D extends object = Record<string, string>> = CellProps<D>;

const getSampleData = (i = 0) => [
  { data: ++i * 100 + i },
  { data: ++i * 100 + i },
  { data: ++i * 100 + i },
  { data: ++i * 100 + i },
  { data: ++i * 100 + i },
];

const meta: Meta<typeof ModularTable> = {
  component: ModularTable,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ModularTable>;

export const Default: Story = {
  render: () => (
    <ModularTable<Record<string, string>>
      getCellProps={({ value }) => ({
        className: value === "1 minute" ? "p-heading--5" : "",
      })}
      // eslint-disable-next-line react-hooks/rules-of-hooks
      columns={React.useMemo(
        () => [
          {
            Header: "ID",
            accessor: "buildId",
            Cell: ({ value }: Cell) => <a href="#test">#{value}</a>,
          },
          {
            Header: "Architecture",
            accessor: "arch",
          },
          {
            Header: "Build Duration",
            accessor: "duration",
            className: "u-hide--small",
          },
          {
            Header: "Result",
            accessor: "result",

            Cell: ({ value }: Cell) => {
              switch (value) {
                case "released":
                  return "Released";
                case "failed":
                  return "Failed";
                default:
                  return "Unknown";
              }
            },

            getCellIcon: ({ value }) => {
              switch (value) {
                case "released":
                  return ICONS.success;
                case "failed":
                  return ICONS.error;
                default:
                  return false;
              }
            },
          },
          {
            Header: "Build Finished",
            accessor: "finished",
            className: "u-align-text--right",
          },
        ],
        [],
      )}
      // eslint-disable-next-line react-hooks/rules-of-hooks
      data={React.useMemo(
        () => [
          {
            buildId: "5432",
            arch: "arm64",
            duration: "5 minutes",
            result: "released",
            finished: "10 minutes ago",
          },
          {
            buildId: "1234",
            arch: "armhf",
            duration: "5 minutes",
            result: "failed",
            finished: "over 1 year ago",
          },
          {
            buildId: "1111",
            arch: "test64",
            duration: "1 minute",
            result: "other",
            finished: "ages ago",
          },
        ],
        [],
      )}
    />
  ),

  name: "Default",
};

export const Empty: Story = {
  render: () => (
    <ModularTable<Record<string, unknown>>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      columns={React.useMemo(
        () => [
          {
            Header: "ID",
            accessor: "buildId",
          },
          {
            Header: "Architecture",
            accessor: "arch",
          },
          {
            Header: "Build Duration",
            accessor: "duration",
            className: "u-hide--small",
          },
          {
            Header: "Result",
            accessor: "result",
          },
          {
            Header: "Build Finished",
            accessor: "finished",
            className: "u-align-text--right",
          },
        ],
        [],
      )}
      data={[]}
      emptyMsg="Waiting for data..."
    />
  ),

  name: "Empty",
};

export const Sortable: Story = {
  render: () => (
    <ModularTable<Record<string, string>>
      sortable
      initialSortColumn="duration"
      initialSortDirection="ascending"
      getCellProps={({ value }) => ({
        className: value === "1 minute" ? "p-heading--5" : "",
      })}
      // eslint-disable-next-line react-hooks/rules-of-hooks
      columns={React.useMemo(
        () => [
          {
            Header: "ID",
            accessor: "buildId",
            sortType: "basic",

            Cell: ({ value }: Cell) => <a href="#test">#{value}</a>,
          },
          {
            Header: "Architecture",
            accessor: "arch",
            sortType: "basic",
          },
          {
            Header: "Build Duration",
            accessor: "duration",
            className: "u-hide--small",
            sortType: "basic",
          },
          {
            Header: "Result",
            accessor: "result",
            sortType: "basic",

            Cell: ({ value }: Cell) => {
              switch (value) {
                case "released":
                  return "Released";
                case "failed":
                  return "Failed";
                default:
                  return "Unknown";
              }
            },

            getCellIcon: ({ value }) => {
              switch (value) {
                case "released":
                  return ICONS.success;
                case "failed":
                  return ICONS.error;
                default:
                  return false;
              }
            },
          },
          {
            Header: "Build Finished",
            accessor: "finished",
            className: "u-align-text--right",
            sortType: "basic",
          },
        ],
        [],
      )}
      // eslint-disable-next-line react-hooks/rules-of-hooks
      data={React.useMemo(
        () => [
          {
            buildId: "5432",
            arch: "arm64",
            duration: "5 minutes",
            result: "released",
            finished: "10 minutes ago",
          },
          {
            buildId: "1234",
            arch: "armhf",
            duration: "5 minutes",
            result: "failed",
            finished: "over 1 year ago",
          },
          {
            buildId: "1111",
            arch: "test64",
            duration: "1 minute",
            result: "other",
            finished: "ages ago",
          },
        ],
        [],
      )}
    />
  ),

  name: "Sortable",
};

/**
 * Subrows can be used to group table rows under a heading that needs to appear
at the start of the group. In the following example sorting the columns will
sort the group rows, then sort the sub-rows, but the group header always comes first.
 */
export const Subrows: Story = {
  render: () => (
    <ModularTable<Record<string, unknown>>
      sortable
      // eslint-disable-next-line react-hooks/rules-of-hooks
      columns={React.useMemo(
        () => [
          {
            Header: "Flavour",
            accessor: "flavour",
            sortType: "basic",
            Cell: (props: Cell<Record<string, unknown>>) =>
              "depth" in props.row && props.row.depth === 0 ? (
                <strong>{props.value}</strong>
              ) : (
                <>
                  <input type="checkbox" /> {props.value}
                </>
              ),
          },
          {
            Header: "Scoops",
            accessor: "scoops",
            sortType: "basic",
            Cell: (props: Cell<Record<string, unknown>>) =>
              "depth" in props.row && props.row.depth === 0 ? (
                <span className="u-text--muted">{props.value}</span>
              ) : (
                props.value
              ),
          },
        ],
        [],
      )}
      // eslint-disable-next-line react-hooks/rules-of-hooks
      data={React.useMemo(
        () => [
          {
            flavour: "Sorbet",
            scoops: "1-2",

            subRows: [
              {
                flavour: "Lemon",
                scoops: 2,
              },
              {
                flavour: "Mango",
                scoops: 1,
              },
              {
                flavour: "Raspberry",
                scoops: 2,
              },
            ],
          },
          {
            flavour: "Ice-cream",
            scoops: "1-3",

            subRows: [
              {
                flavour: "Chocolate",
                scoops: 1,
              },
              {
                flavour: "Vanilla",
                scoops: 3,
              },
              {
                flavour: "Caramel",
                scoops: 2,
              },
            ],
          },
        ],
        [],
      )}
    />
  ),

  name: "Subrows",
};

/**
Example below shows a basic `ModularTable` with `SummaryButton` component in the footer.
```
export const getSampleData = (i = 0) => [
  { data: ++i * 100 + i },
  { data: ++i * 100 + i },
  { data: ++i * 100 + i },
  { data: ++i * 100 + i },
  { data: ++i * 100 + i },
];
```
 */
export const LoadMore: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState(getSampleData());
    const hasMore = data.length < 20;

    const loadMore = () => {
      setData(data.concat(getSampleData(data.length)));
    };

    const columns: Column[] = [
      {
        Header: "Id",
        accessor: (_d, i) => i,
      },
      {
        Header: "Data",
        accessor: "data",
      },
    ];

    const footer = hasMore ? (
      <div className="u-align--right">
        <SummaryButton
          summary={`Showing ${data.length} of 20 items.`}
          label="Show 5 more"
          onClick={loadMore}
        />
      </div>
    ) : null;

    return <ModularTable data={data} columns={columns} footer={footer} />;
  },

  name: "Load more",
};
