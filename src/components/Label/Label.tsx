import classNames from "classnames";
import PropTypes from "prop-types";
import React, { HTMLAttributes } from "react";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  forId?: string;
  required?: boolean;
} & HTMLAttributes<HTMLLabelElement>;

const Label = ({
  children,
  className,
  forId,
  required,
  ...labelProps
}: Props): JSX.Element => (
  <label
    className={classNames(className, "p-form__label", {
      "is-required": required,
    })}
    htmlFor={forId}
    {...labelProps}
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
