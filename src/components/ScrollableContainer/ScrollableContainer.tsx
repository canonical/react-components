import React from "react";
import type { DependencyList, FC, ReactNode } from "react";
import { useEffect, useRef } from "react";
import classnames from "classnames";
import "./ScrollableContainer.scss";
import { getAbsoluteHeightBelowById, getParentsBottomSpacing } from "utils";
import { useListener } from "hooks";

export type Props = {
  /**
   * The content that should be scrollable on overflow.
   */
  children: ReactNode;

  /**
   * An array of dependencies that will trigger a re-calculation of the scrollable height when changed.
   */
  dependencies: DependencyList;

  /**
   * An array of element IDs below the scrollable container that should be considered when calculating the height.
   */
  belowIds?: string[];

  /**
   * Additional CSS classes to apply to the scrollable container.
   */
  className?: string;
};

/**
 * This is a [React](https://reactjs.org/) component for use within the [Vanilla framework](https://docs.vanillaframework.io/).
 *
 * It is used to make any child element scrollable by adjusting the height based on the viewport height and the heights of elements above and below it. As a result the surrounding elements are sticky and only the wrapped element contents scroll
 */
const ScrollableContainer: FC<Props> = ({
  dependencies,
  children,
  belowIds = ["status-bar"],
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const updateChildContainerHeight = () => {
    const childContainer = ref.current?.children[0];
    if (!childContainer) {
      return;
    }

    const above = childContainer.getBoundingClientRect().top + 1;
    const below = belowIds.reduce(
      (acc, belowId) => acc + getAbsoluteHeightBelowById(belowId),
      0,
    );
    const parentsBottomSpacing = getParentsBottomSpacing(childContainer);
    const offset = Math.ceil(above + below + parentsBottomSpacing);
    const style = `height: calc(100dvh - ${offset}px); min-height: calc(100dvh - ${offset}px)`;
    childContainer.setAttribute("style", style);
  };

  useListener(window, updateChildContainerHeight, "resize", true);
  useEffect(updateChildContainerHeight, [dependencies, belowIds, ref]);

  return (
    <div ref={ref} className={classnames("scrollable-container", className)}>
      <div id="content-details" className="content-details">
        {children}
      </div>
    </div>
  );
};

export default ScrollableContainer;
