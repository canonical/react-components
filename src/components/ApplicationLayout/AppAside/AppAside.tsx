import React from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import { type HTMLProps, type PropsWithChildren } from "react";

export type Props = PropsWithSpread<
  {
    collapsed?: boolean;
    forwardRef?: React.Ref<HTMLElement> | null;
    narrow?: boolean;
    pinned?: boolean;
    wide?: boolean;
  } & PropsWithChildren,
  HTMLProps<HTMLElement>
>;

const AppAside = ({
  children,
  className,
  collapsed,
  narrow,
  forwardRef,
  pinned,
  wide,
  ...props
}: Props) => {
  return (
    <aside
      className={classNames("l-aside", className, {
        "is-collapsed": collapsed,
        "is-narrow": narrow,
        "is-pinned": pinned,
        "is-wide": wide,
      })}
      {...props}
      ref={forwardRef}
    >
      {children}
    </aside>
  );
};
export default AppAside;
