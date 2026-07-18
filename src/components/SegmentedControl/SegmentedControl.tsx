import classNames from "classnames";
import React, { ReactNode, HTMLProps, useState } from "react";
import type { ClassName } from "types";

export type Segments<P = null> = {
  /**
   * Label to be displayed inside the segment.
   */
  label: ReactNode;
  /**
   * Content to be displayed inside the segment.
   */
  segmentContent: ReactNode;
  /**
   * Icon to be displayed alongside the label of the segment.
   */
  segmentIcon?: ReactNode;
} & (HTMLProps<HTMLElement> | P);

export type Props<P = null> = {
  /**
   * Optional classes applied to the parent element.
   */
  className?: ClassName;
  /**
   * List of segments present in the element.
   */
  segments: Segments<P>[];
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
    <div
      className={classNames("p-segmented-control", className)}
      data-testid="segmented-control-div"
    >
      <div className={classNames("p-segmented-control__list")} role="tablist">
        {segments.map((segment, i) => {
          return (
            <button
              aria-selected={activeIndex === i}
              className={classNames("p-segmented-control__button")}
              role="tab"
              key={i}
              onClick={() => setActiveIndex(i)}
            >
              {segment.segmentIcon ? (
                <>
                  {segment.segmentIcon}
                  <span>{segment.label}</span>
                </>
              ) : (
                segment.label
              )}
            </button>
          );
        })}
      </div>
      <div tabIndex={activeIndex} role="tabpanel" data-testid="text-content">
        {segments[activeIndex].segmentContent}
      </div>
    </div>
  );
};

export default SegmentedControl;
