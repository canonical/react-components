import React from "react";
import classnames from "classnames";
import type { FC, PropsWithChildren } from "react";

export interface HeaderProps {
  className?: string;
  key?: string;
}

const Header: FC<PropsWithChildren & HeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classnames("p-panel__header", className)}>{children}</div>
  );
};

export default Header;
