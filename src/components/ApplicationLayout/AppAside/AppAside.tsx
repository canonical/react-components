import React from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import { type HTMLProps, type PropsWithChildren } from "react";

export type Props = PropsWithSpread<
  {
    forwardRef?: React.Ref<HTMLElement> | null;
    pinned?: boolean;
  } & PropsWithChildren,
  HTMLProps<HTMLElement>
>;

const AppAside = ({
  children,
  className,
  forwardRef,
  pinned,
  ...props
}: Props) => {
  return (
    <aside
      className={classNames("l-aside", className, {
        "is-pinned": pinned,
      })}
      {...props}
      ref={forwardRef}
    >
      {children}
    </aside>
  );
};
export default AppAside;
