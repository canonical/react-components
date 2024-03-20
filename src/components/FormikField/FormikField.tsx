import React from "react";
import { useField } from "formik";
import {
  type ComponentProps,
  type ComponentType,
  type ElementType,
  type HTMLProps,
} from "react";
import Input from "components/Input";

export type Props<C extends ElementType | ComponentType = typeof Input> = {
  /**
   * The component to display.
   * @default Input
   */
  component?: C;
  /**
   * This can be used to hide errors returned by Formik.
   */
  displayError?: boolean;
  /**
   * The name of the field as given to Formik.
   */
  name: string;
  value?: HTMLProps<HTMLElement>["value"];
} & ComponentProps<C>;

/**
 * This component makes it easier to use Vanilla form inputs with Formik. It
 * makes use of Formik's context to automatically map errors, values, states
 * etc. onto the provided field.
 */
const FormikField = <C extends ElementType | ComponentType = typeof Input>({
  component: Component = Input,
  displayError = true,
  name,
  value,
  label,
  ...props
}: Props<C>): JSX.Element => {
  const [field, meta] = useField({ name, type: props.type, value });

  return (
    <Component
      aria-label={label}
      error={meta.touched && displayError ? meta.error : null}
      label={label}
      {...field}
      {...props}
    />
  );
};

export default FormikField;
