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
 * This is a [React](https://reactjs.org/) component for the Vanilla [Label](https://vanillaframework.io/docs/patterns/labels).
 * Labels are static elements which you can apply to signify status, tags or any other information you find useful.
 * @deprecated StatusLabel is deprecated. Use Read-only Chip instead.
 */
const StatusLabel = ({
  appearance,
  children,
  className,
  ...labelProps
}: Props): React.JSX.Element => {
  const classes = classNames(
    appearance ? `p-status-label--${appearance}` : "p-status-label",
    className,
  );
  return (
    <div {...labelProps} className={classes}>
      {children}
    </div>
  );
};

export default StatusLabel;
