import React from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import { type HTMLProps, type PropsWithChildren } from "react";

export type Props = PropsWithSpread<
  {
    /**
     * Whether the aside panel should be collapsed. Toggling this state will animate
     * the panel open or closed.
     */
    collapsed?: boolean;
    /**
     * The panel content.
     */
    children?: PropsWithChildren["children"];
    /**
     * A ref that will be passed to the wrapping `<aside>` element.
     */
    forwardRef?: React.Ref<HTMLElement> | null;
    /**
     * Whether the aside panel should be narrow.
     */
    narrow?: boolean;
    /**
     * Whether the aside panel should be pinned. When pinned the panel will appear
     * beside the main content, instead of above it.
     */
    pinned?: boolean;
    /**
     * Whether the aside panel should be wide.
     */
    wide?: boolean;
  },
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
