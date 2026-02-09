import React from "react";
import classnames from "classnames";
import type { FC, PropsWithChildren } from "react";

export interface HeaderControlsProps {
  className?: string;
  key?: string;
}

const HeaderControls: FC<PropsWithChildren & HeaderControlsProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classnames("p-panel__controls", className)}>{children}</div>
  );
};

export default HeaderControls;
