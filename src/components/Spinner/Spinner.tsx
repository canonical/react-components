import React, { HTMLProps } from "react";
import classNames from "classnames";

import type { ClassName } from "types";

export type Props = {
  /**
   * Optional class(es) to pass to the wrapping span element.
   */
  className?: ClassName;
  /**
   * Whether the spinner should have a light appearance.
   */
  isLight?: boolean;
  /**
   * Text to display next to the spinner.
   */
  text?: string;
  /**
   * What the role of the spinner should be.
   */
  role?: string;
  /**
   * The politeness setting of the spinner alert.
   */
  ariaLive?: "assertive" | "off" | "polite";
} & HTMLProps<HTMLSpanElement>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Spin](https://docs.vanillaframework.io/settings/animation-settings/#spin) animation.
 */
const Spinner = ({
  className,
  text,
  isLight = false,
  ariaLive = "polite",
  role = "alert",
  ...props
}: Props): JSX.Element => (
  <span
    {...props}
    className={classNames(className, "p-text--default")}
    role={role}
    aria-live={ariaLive}
  >
    <i
      className={classNames("p-icon--spinner", "u-animation--spin", {
        "is-light": isLight,
      })}
    >
      {text ? "" : "Loading"}
    </i>
    {text && (
      <>
        &ensp;
        <span>{text}</span>
      </>
    )}
  </span>
);

export default Spinner;
