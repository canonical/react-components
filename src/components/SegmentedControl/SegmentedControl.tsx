import classNames from "classnames";
import React, {
  HTMLProps,
  ReactNode,
} from "react";

import type { ClassName } from "types";

export type SegmentedControlTabs<P = null> = {
  /**
   * Whether the tab link should have selected styling.
   */
  selected?: boolean;
  /**
   * Id applied to the tab element.
   */
  id?: string;
  /**
   * Component to be displayed in each tab.
   */
  component?: ReactNode;
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
  tabs: SegmentedControlTabs<P>[];
  /**
   * Optional classes applied to the "ul" element.
   */
  dense?: boolean;
};

const SegmentedControl = <P,>({
  className,
  dense = false,
tabs,
}: Props<P>): JSX.Element => {
  return (
    
    <div
      className={
        dense
          ? classNames("p-segmented-control is-dense", className)
          : classNames("p-segmented-control", className)
      }
    >
      <div className="p-segmented-control__list" role="tablist">
        {tabs.map((tab)=>{
            const {
                selected,
                id,
                label,
            } = tab;
            return (
                <button className="p-segmented-control__button" role="tab" aria-selected={selected} aria-controls={id+"-tab"} id={id} tabIndex={selected?0:-1}>{label}</button>
            )
        })}
      </div>
      {tabs.map((tab)=>{
          const {
              selected,
              component,
              id,
          } = tab;
          return (
              <div tabIndex={0} role="tabpanel" id={id+"-tab"} aria-labelledby={id} hidden={!selected}>
                  {component}
              </div>
          )
      })}
    </div>
  );
};

export default SegmentedControl;
