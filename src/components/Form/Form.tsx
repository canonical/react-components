import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps, ReactNode } from "react";

export type BaseForm = {
  children?: ReactNode;
  className?: string;
};

export type OrderedForm = BaseForm & {
  inline?: false;
  stacked?: false;
};

export type InlineForm = BaseForm & {
  inline: boolean;
  stacked?: false;
};

export type StackedForm = BaseForm & {
  stacked: boolean;
  inline?: false;
};

export type Props = (OrderedForm | InlineForm | StackedForm) &
  HTMLProps<HTMLFormElement>;

const Form = ({
  children,
  className,
  inline,
  stacked,
  ...props
}: Props): JSX.Element => (
  <form
    className={classNames(className, {
      "p-form": inline || stacked,
      "p-form--inline": inline,
      "p-form--stacked": stacked,
    })}
    {...props}
  >
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inline: PropTypes.bool,
  stacked: PropTypes.bool,
};

export default Form;
