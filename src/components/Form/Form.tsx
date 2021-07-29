import classNames from "classnames";
import React from "react";
import type { HTMLProps, ReactNode } from "react";

import type { ClassName } from "types";

export type Props = {
  /**
   * The content of the form.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to pass to the form element.
   */
  className?: ClassName;
  inline?: boolean;
  stacked?: boolean;
} & HTMLProps<HTMLFormElement>;

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

export default Form;
