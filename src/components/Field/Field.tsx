import classNames from "classnames";
import React from "react";
import type { ReactNode } from "react";

import Label from "../Label";
import Col, { ColSize } from "../Col";

import type { ClassName } from "types";

/**
 * The props for the Field component.
 */
export type Props = {
  /**
   * The content for caution validation.
   */
  caution?: ReactNode;
  /**
   * The content of the Field component.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to pass to the Field wrapper div.
   */
  className?: ClassName;
  /**
   * The content for error validation.
   */
  error?: ReactNode;
  /**
   * The id of the input this Field component is controlling.
   */
  forId?: string;
  /**
   * Help text to show below the field.
   */
  help?: ReactNode;
  /**
   * Optional class(es) to pass to the help text element.
   */
  helpClassName?: string;
  /**
   * Whether the help should appear after the label (by default it will appear below the field).
   */
  helpAfterLabel?: boolean;
  /**
   * An id to give to the help element.
   */
  helpId?: string;
  /**
   * Whether the component is wrapping a select element.
   */
  isSelect?: boolean;
  /**
   * Whether the component is wrapping a checkbox or radio element.
   */
  isTickElement?: boolean;
  /**
   * The label for the field.
   */
  label?: ReactNode;
  /**
   * Optional class(es) to pass to the label component.
   */
  labelClassName?: string | null;
  /**
   * Whether the label should show before the input.
   */
  labelFirst?: boolean;
  /**
   * Whether the field is required.
   */
  required?: boolean;
  /**
   * Whether the form field should have a stacked appearance.
   */
  stacked?: boolean;
  /**
   * The number of columns the field should have when stacked.
   */
  stackedFieldColumns?: ColSize;
  /**
   * The number of columns the label should have when stacked.
   */
  stackedLabelColumns?: ColSize;
  /**
   * The content for success validation.
   */
  success?: ReactNode;
  /**
   * An id to give to the caution, error or success element.
   */
  validationId?: string;
};

const generateHelpText = ({
  help,
  helpId,
  helpClassName,
  isTickElement,
}: Pick<Props, "help" | "helpId" | "helpClassName" | "isTickElement">) =>
  help ? (
    <p
      className={classNames("p-form-help-text", helpClassName, {
        "is-tick-element": isTickElement,
      })}
      id={helpId}
    >
      {help}
    </p>
  ) : null;

const generateError = (
  error: Props["error"],
  caution: Props["caution"],
  success: Props["success"],
  validationId: Props["validationId"],
) => {
  if (!error && !caution && !success) {
    return null;
  }
  return (
    <p className="p-form-validation__message" id={validationId}>
      {error || caution || success}
    </p>
  );
};

const generateLabel = (
  forId: Props["forId"],
  required: Props["required"],
  label: Props["label"],
  labelClassName: Props["labelClassName"],
  stacked: Props["stacked"],
  stackedLabelColumns: Props["stackedLabelColumns"],
  help: ReactNode,
  helpAfterLabel: Props["helpAfterLabel"],
) => {
  if (!label) {
    return null;
  }
  const labelNode = (
    <>
      <Label className={labelClassName} forId={forId} required={required}>
        {label}
      </Label>
      {helpAfterLabel ? help : null}
    </>
  );
  if (stacked) {
    return <Col size={stackedLabelColumns}>{labelNode}</Col>;
  }
  return labelNode;
};

const generateContent = ({
  isSelect,
  children,
  labelFirst,
  labelNode,
  help,
  error,
  caution,
  success,
  validationId,
  helpAfterLabel,
}: Partial<Props> & {
  labelNode: React.JSX.Element | null;
  validationId: string;
  help: ReactNode;
}) => (
  <div className="p-form__control u-clearfix">
    {isSelect ? (
      <div className="p-form-validation__select-wrapper">{children}</div>
    ) : (
      children
    )}
    {!labelFirst && labelNode}
    {helpAfterLabel ? null : help}
    {generateError(error, caution, success, validationId)}
  </div>
);

const Field = ({
  caution,
  children,
  className,
  error,
  forId,
  help,
  helpClassName,
  helpAfterLabel,
  helpId,
  isSelect,
  isTickElement,
  label,
  labelClassName,
  labelFirst = true,
  required,
  stacked,
  stackedFieldColumns = 8,
  stackedLabelColumns = 4,
  success,
  validationId,
  ...props
}: Props): React.JSX.Element => {
  const helpNode = generateHelpText({
    helpId,
    help,
    helpClassName,
    isTickElement,
  });
  const labelNode = generateLabel(
    forId,
    required,
    label,
    labelClassName,
    stacked,
    stackedLabelColumns,
    helpNode,
    helpAfterLabel,
  );

  const content = generateContent({
    isSelect,
    children,
    labelFirst,
    labelNode,
    help: helpNode,
    error,
    caution,
    success,
    validationId,
    helpAfterLabel,
  });
  return (
    <div
      className={classNames("p-form__group", "p-form-validation", className, {
        "is-error": error,
        "is-caution": caution,
        "is-success": success,
        row: stacked,
      })}
      {...props}
    >
      {labelFirst && labelNode}
      {stacked ? <Col size={stackedFieldColumns}>{content}</Col> : content}
    </div>
  );
};

export default Field;
