import React from "react";
import type { HTMLProps, ReactNode } from "react";
import { AppMain } from "components/ApplicationLayout";
import Panel from "components/Panel";

export type Props = {
  /**
   * This prop can be used to replace the header area of the panel when the default implementation is not sufficient.
   */
  header?: ReactNode;
  /**
   * The main content.
   */
  children: ReactNode;
  /**
   * Classes to apply to the main content.
   */
  mainClassName?: string;
  /**
   * Classes to apply to the main area.
   */
  contentClassName?: string;
} & HTMLProps<HTMLDivElement>;

const CustomLayout = ({
  header,
  children,
  mainClassName,
  contentClassName,
}: Props) => {
  return (
    <AppMain className={mainClassName} id="main-content">
      <Panel contentClassName={contentClassName} header={header}>
        {children}
      </Panel>
    </AppMain>
  );
};

export default CustomLayout;
