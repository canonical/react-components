import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { LabelHTMLAttributes, ReactNode } from "react";

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
  className?: string;
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

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  forId: PropTypes.string,
  required: PropTypes.bool,
};

export default Label;
