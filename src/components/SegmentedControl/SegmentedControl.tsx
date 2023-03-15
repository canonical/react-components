import classNames from "classnames";
import Icon, { ICONS } from "../Icon";
import React, {
  ChangeEventHandler,
  HTMLProps,
  MouseEventHandler,
  useRef,
  useState,
} from "react";

import type { ClassName, ValueOf } from "types";

export type SegmentedControlButton<P = null> = {
  /**
   * If the tab has an icon element, the type of icon.
   */
  icon?: ValueOf<typeof ICONS> | string;
  /**
   * Id applied to the tab element.
   */
  id?: string;
  /**
   * Label to be displayed inside the tab.
   */
  label: string;
} & (HTMLProps<HTMLElement> | P);

export type Props<P = null> = {
  /**
   * Optional classes applied to the parent element.
   */
  className?: ClassName;
  /**
   * An array of tab link objects.
   */
  tabs: SegmentedControlButton<P>[];
  /**
   * Optional classes to make the buttons take on a more compact appearance.
   */
  dense?: boolean;
  /**
   * Function to be called when a button is clicked
   */
  onChange: ChangeEventHandler<HTMLButtonElement>;
};

const SegmentedControl = <P,>({
  className,
  tabs,
  onChange,
  dense = false,
}: Props<P>): JSX.Element => {
  const [currentTab, changeTab] = useState(0);
  const inputRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const switchTab = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    if (event.code === "ArrowRight") {
      if (index === inputRefs.current.length - 1) {
        changeTab(0);
        inputRefs.current[0].focus();
      } else {
        changeTab(index + 1);
        inputRefs.current[index + 1].focus();
      }
    } else if (event.code === "ArrowLeft") {
      if (index === 0) {
        changeTab(inputRefs.current.length - 1);
        inputRefs.current[inputRefs.current.length - 1].focus();
      } else {
        changeTab(index - 1);
        inputRefs.current[index - 1].focus();
      }
    }
  };
  return (
    <div
      className={
        dense
          ? classNames("p-segmented-control is-dense", className)
          : classNames("p-segmented-control", className)
      }
    >
      <div className="p-segmented-control__list" role="tablist">
        {tabs.map((tab, i) => {
          const { id, label, icon = null } = tab;
          return (
            <button
              className="p-segmented-control__button"
              role="tab"
              aria-selected={currentTab === i}
              aria-controls={id + "-tab"}
              id={id}
              tabIndex={currentTab === i ? 0 : -1}
              onKeyUp={(e) => {
                switchTab(e, i);
              }}
              ref={(ref) => (inputRefs.current[i] = ref)}
              onFocus={onChange}
              onChange={onChange}
            >
              {icon ? <Icon name={icon} /> : null}
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SegmentedControl;
