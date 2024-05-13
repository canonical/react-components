import React from "react";
import classNames from "classnames";
import type { HTMLProps, PropsWithChildren } from "react";

type Props = PropsWithChildren & HTMLProps<HTMLDivElement>;

const AppStatus = ({ children, className, ...props }: Props) => {
  return (
    <aside className={classNames("l-status", className)} {...props}>
      {children}
    </aside>
  );
};

export default AppStatus;
