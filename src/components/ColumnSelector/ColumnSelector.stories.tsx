import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import ColumnSelector from "./ColumnSelector";
import MainTable from "components/MainTable";
import {
  getRows,
  FILESYSTEM,
  SNAPSHOTS,
  USER_HIDEABLE_COLUMNS,
  DESCRIPTION,
  CLUSTER_MEMBER,
  COLUMN_HEADERS,
} from "./ColumnSelectorStoriesHelper";
import {
  visibleHeaderColumns,
  visibleRowColumns,
} from "./columnSelectorHelper";

const meta: Meta<typeof ColumnSelector> = {
  component: ColumnSelector,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ColumnSelector>;

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userHidden, setUserHidden] = useState<string[]>([
      FILESYSTEM,
      SNAPSHOTS,
      CLUSTER_MEMBER,
    ]);

    const sizeHidden = [DESCRIPTION];

    const hiddenColumns = userHidden.concat(sizeHidden);
    const ROWS = getRows();

    const setUserHiddenAndSaveInLocalStorage = (columns: string[]) => {
      setUserHidden(columns);
    };

    const displayedRows = visibleRowColumns(ROWS, hiddenColumns);
    const displayedHeaders = visibleHeaderColumns(
      COLUMN_HEADERS.map((t) => {
        return {
          content: t,
          sortKey: t,
        };
      }),
      hiddenColumns,
    );

    return (
      <>
        <ColumnSelector
          columns={USER_HIDEABLE_COLUMNS}
          userHidden={userHidden}
          sizeHidden={sizeHidden}
          setUserHidden={setUserHiddenAndSaveInLocalStorage}
        />
        <MainTable rows={displayedRows} headers={displayedHeaders} />
      </>
    );
  },
  name: "Default",
};
