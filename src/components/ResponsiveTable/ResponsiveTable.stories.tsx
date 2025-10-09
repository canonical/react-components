import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { CellProps } from "react-table";
import { ICONS } from "../Icon";
import ResponsiveTable from "./ResponsiveTable";

type Cell<D extends object = Record<string, string>> = CellProps<D>;

const meta: Meta<typeof ResponsiveTable> = {
  component: ResponsiveTable,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ResponsiveTable>;

export const Default: Story = {
  render: () => (
    <ResponsiveTable<Record<string, string>>
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
