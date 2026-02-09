import React from "react";
import classnames from "classnames";
import type { FC, PropsWithChildren } from "react";

export interface ContentProps {
  className?: string;
  key?: string;
}

const Content: FC<PropsWithChildren & ContentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classnames("p-panel__content", className)}>{children}</div>
  );
};

export default Content;
