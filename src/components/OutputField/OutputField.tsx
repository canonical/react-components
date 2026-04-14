import React, { FC, ReactNode } from "react";
import Field from "../Field";
import "./OutputField.scss";

export type Props = {
  /**
   * The id of the output element. This is used to associate the label with the output element for form or accessibility purposes.
   */
  id: string;
  /**
   * The label for the output field.
   */
  label: string;
  /**
   * The value to be displayed in the output field.
   */
  value: string;
  /**
   * Optional help text to provide additional information about the output field.
   */
  help?: ReactNode;
  /**
   * Whether the output field is required.
   */
  required?: boolean;
};

/**
 *
 * Use output fields to display read-only information with a label and optional help text. Output fields are ideal for displaying calculated values or results of user input in a consistent format.
 */
export const OutputField: FC<Props> = ({
  id,
  label,
  value,
  help,
  required,
}) => {
  return (
    <Field
      forId={id}
      label={label}
      help={help}
      labelClassName="u-no-margin--bottom"
      className="output-field"
      required={required}
    >
      <output id={id} className="mono-font u-sv2">
        <b>{value}</b>
      </output>
    </Field>
  );
};

export default OutputField;
