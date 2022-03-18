import React from "react";
import type { HTMLProps, ReactNode } from "react";

import classNames from "classnames";
import { ClassName, PropsWithSpread, ValueOf } from "types";

export const StatusLabelAppearance = {
  CAUTION: "caution",
  DEFAULT: "",
  INFORMATION: "information",
  NEGATIVE: "negative",
  POSITIVE: "positive",
} as const;

/**
 * The type of the StatusLabel props.
 */
export type Props = PropsWithSpread<
  {
    /**
     * The appearance of the label.
     */
    appearance?: ValueOf<typeof StatusLabelAppearance> | string;
    /**
     * The content of the label.
     */
    children?: ReactNode;
    /**
     * Optional class(es) to pass to the wrapping element.
     */
    className?: ClassName;
  },
  HTMLProps<HTMLDivElement>
>;

/**
 * A component for the Vanilla Label.
 */
const StatusLabel = ({
  appearance,
  children,
  className,
  ...labelProps
}: Props): JSX.Element => {
  const classes = classNames(
    appearance ? `p-label--${appearance}` : "p-label",
    className
  );
  return (
    <div {...labelProps} className={classes}>
      {children}
    </div>
  );
};

export default StatusLabel;
