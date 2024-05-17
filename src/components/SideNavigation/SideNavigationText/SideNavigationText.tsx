import React from "react";
import classNames from "classnames";
import type { HTMLProps } from "react";

import type { SideNavigationBaseProps } from "../SideNavigationBase";
import SideNavigationBase from "../SideNavigationBase";

export type TextDefaultElement = HTMLProps<HTMLSpanElement>;

export type Props = Omit<
  SideNavigationBaseProps<TextDefaultElement>,
  "component" | "label"
>;

const SideNavigationText = ({ children, className, ...props }: Props) => {
  return (
    <SideNavigationBase<TextDefaultElement>
      className={classNames("p-side-navigation__text", className)}
      component="span"
      label={children}
      {...props}
    />
  );
};

export default SideNavigationText;
