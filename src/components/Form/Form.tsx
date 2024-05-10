import classNames from "classnames";
import React from "react";
import type { HTMLProps, ReactNode } from "react";

import type { ClassName, PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
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
  },
  HTMLProps<HTMLFormElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Form](https://docs.vanillaframework.io/base/forms).
 *
 * Form controls have global styling defined at the HTML element level. Labels and most input types are 100% width of the `<form>` parent element.
 */
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
