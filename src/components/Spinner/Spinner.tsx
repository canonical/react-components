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
  ariaLive: "assertive" | "off" | "polite";
  /**
   * Text hidden from view, read by screen readers.
   */
  labelText?: string;
} & HTMLProps<HTMLSpanElement>;

const Spinner = ({
  className,
  text,
  isLight = false,
  ariaLive,
  labelText,
  role,
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
      {labelText}
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
