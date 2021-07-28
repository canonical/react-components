import classNames from "classnames";
import React from "react";
import type { LabelHTMLAttributes, ReactNode } from "react";

import type { ClassName } from "types";

/**
 * The props for the Label component.
 */
export type Props = {
  /**
   * The label content.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to give to the label element.
   */
  className?: ClassName;
  /**
   * The id of the input this label is connected to.
   */
  forId?: string;
  /**
   * Whether to apply required styling to the label.
   */
  required?: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({
  children,
  className,
  forId,
  required,
  ...props
}: Props): JSX.Element => (
  <label
    className={classNames(className, "p-form__label", {
      "is-required": required,
    })}
    htmlFor={forId}
    {...props}
  >
    {children}
  </label>
);

export default Label;
