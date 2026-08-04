import classNames from "classnames";
import Icon, { ICONS } from "components/Icon";
import React, { ReactNode, useState } from "react";
import type { ClassName, ValueOf } from "types";

export type Segments = {
  /**
   * Label to be displayed inside the segment.
   */
  label: string;
  /**
   * Content to be displayed inside the segment.
   */
  content: ReactNode;
  /**
   * Icon to be displayed alongside the label of the segment.
   */
  iconName?: ValueOf<typeof ICONS> | string;
};

export type Props = {
  /**
   * Optional classes applied to the parent element.
   */
  className?: ClassName;
  /**
   * List of segments present in the element.
   */
  segments: Segments[];
};
/**
 * This is the [React](https://reactjs.org/) component for Vanilla [SegmentedControl](https://vanillaframework.io/docs/patterns/segmented-control).
SegmentedControl organises and allows navigation between groups of content that are related and at the same level
of hierarchy.
 */
const SegmentedControl = ({
  className,
  segments,
}: Props): React.JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className={classNames("p-segmented-control", className)}>
      <div className={classNames("p-segmented-control__list")} role="tablist">
        {segments.map((segment, i) => {
          return (
            <button
              aria-selected={activeIndex === i}
              className={classNames("p-segmented-control__button")}
              role="tab"
              key={segment.label}
              id={segment.label}
              onClick={() => setActiveIndex(i)}
            >
              {segment.iconName ? (
                <>
                  <Icon name={segment.iconName} />
                  <span>{segment.label}</span>
                </>
              ) : (
                segment.label
              )}
            </button>
          );
        })}
      </div>
      <div
        tabIndex={activeIndex}
        role="tabpanel"
        aria-labelledby={segments[activeIndex].label}
      >
        {segments[activeIndex].content}
      </div>
    </div>
  );
};

export default SegmentedControl;
