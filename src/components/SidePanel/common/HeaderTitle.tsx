import React from "react";
import classnames from "classnames";
import type { FC, PropsWithChildren } from "react";

export interface HeaderTitleProps {
  className?: string;
}

const HeaderTitle: FC<PropsWithChildren & HeaderTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h2 className={classnames("p-panel__title", className)}>{children}</h2>
  );
};

export default HeaderTitle;
