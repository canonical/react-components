import React from "react";
import type { DependencyList, FC, ReactNode } from "react";
import { useEffect } from "react";
import { getAbsoluteHeightBelowById, getParentsBottomSpacing } from "utils";
import "./ScrollableTable.scss";
import { useListener } from "hooks";

export type Props = {
  /**
   * A MainTable that will be made scrollable.
   */
  children: ReactNode;

  /**
   * An array of dependencies that will trigger a re-calculation of the table body height when they change.
   */
  dependencies: DependencyList;

  /**
   * The ID of the table element that contains the `<tbody>` to be made scrollable.
   */
  tableId: string;

  /**
   * An array of element IDs below the table that should be considered when calculating the height.
   */
  belowIds?: string[];
};

/**
 * This is a [React](https://reactjs.org/) component for use within the [Vanilla framework](https://docs.vanillaframework.io/).
 *
 * It is used to make a table scrollable by adjusting the height of the `<tbody>` element based on the viewport height and the heights of elements above and below it. As a result the header is sticky and only the body scrolls
 */
const ScrollableTable: FC<Props> = ({
  dependencies,
  children,
  tableId,
  belowIds = [],
}) => {
  const updateTBodyHeight = () => {
    const table = document.getElementById(tableId);
    if (!table || table.children.length !== 2) {
      return;
    }

    const tBody = table.children[1];
    const above = tBody.getBoundingClientRect().top + 1;
    const below = belowIds.reduce(
      (acc, belowId) => acc + getAbsoluteHeightBelowById(belowId),
      0,
    );
    const parentsBottomSpacing = getParentsBottomSpacing(table);
    const offset = Math.ceil(above + below + parentsBottomSpacing);
    const style = `height: calc(100dvh - ${offset}px); min-height: calc(100dvh - ${offset}px)`;
    tBody.setAttribute("style", style);
  };

  useListener(window, updateTBodyHeight, "resize", true);
  useEffect(updateTBodyHeight, [...dependencies, belowIds, tableId]);

  return <div className="scrollable-table">{children}</div>;
};

export default ScrollableTable;
