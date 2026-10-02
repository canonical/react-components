import classNames from "classnames";
import Icon, { ICONS } from "components/Icon";
import React, {
  KeyboardEvent,
  ReactNode,
  useId,
  useRef,
  useState,
} from "react";
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
   * Label for the segmented control for accessibility purposes.
   */
  controlLabel?: string;
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
  controlLabel,
  segments,
}: Props): React.JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  const focusSegment = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const focusPanelContent = () => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    panel.focus();
  };

  const handleSegmentKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusSegment((index + 1) % segments.length);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusSegment((index - 1 + segments.length) % segments.length);
        break;
      case "Home":
        event.preventDefault();
        focusSegment(0);
        break;
      case "End":
        event.preventDefault();
        focusSegment(segments.length - 1);
        break;
      case "Tab":
        if (!event.shiftKey) {
          event.preventDefault();
          focusPanelContent();
        }
        break;
      default:
        break;
    }
  };

  const activeSegment = segments[activeIndex];
  const panelId = `${id}-panel`;

  return (
    <div className={classNames("p-segmented-control", className)}>
      <div
        className={classNames("p-segmented-control__list")}
        aria-label={controlLabel}
        role="tablist"
      >
        {segments.map((segment, i) => {
          const tabId = `${id}-tab-${i}`;
          return (
            <button
              aria-selected={activeIndex === i}
              aria-controls={panelId}
              className={classNames("p-segmented-control__button")}
              role="tab"
              key={segment.label}
              id={tabId}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(event) => handleSegmentKeyDown(event, i)}
              ref={(element) => {
                tabRefs.current[i] = element;
              }}
              tabIndex={activeIndex === i ? 0 : -1}
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
        aria-labelledby={`${id}-tab-${activeIndex}`}
        id={panelId}
        ref={panelRef}
        role="tabpanel"
        tabIndex={0}
      >
        {activeSegment.content}
      </div>
    </div>
  );
};

export default SegmentedControl;
