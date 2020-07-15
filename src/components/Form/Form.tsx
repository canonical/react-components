import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLAttributes, ReactNode } from "react";

type Form = {
  children?: ReactNode;
  className?: string;
};

type OrderedForm = Form & {
  inline?: undefined;
  stacked?: undefined;
};

type InlineForm = Form & {
  inline: boolean;
  stacked?: undefined;
};

type StackedForm = Form & {
  stacked: boolean;
  inline?: undefined;
};

type Props = OrderedForm | InlineForm | StackedForm;

const Form = ({
  children,
  className,
  inline,
  stacked,
  ...formProps
}: Props & HTMLAttributes<HTMLFormElement>): JSX.Element => (
  <form
    className={classNames(className, {
      "p-form": inline || stacked,
      "p-form--inline": inline,
      "p-form--stacked": stacked,
    })}
    {...formProps}
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
