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
} & HTMLProps<HTMLSpanElement>;

const Spinner = ({
  className,
  text,
  isLight = false,
  ...props
}: Props): JSX.Element => (
  <span {...props} className={classNames(className, "p-text--default")}>
    <i
      className={classNames("p-icon--spinner", "u-animation--spin", {
        "is-light": isLight,
      })}
    />
    {text && (
      <>
        &ensp;
        <span>{text}</span>
      </>
    )}
  </span>
);

export default Spinner;
