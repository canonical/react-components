import classNames from "classnames";
import React from "react";
import Icon from "components/Icon";
import Link, { LinkProps } from "components/Link";
import { ClassName } from "types";
import "./Step.scss";

export type Props = {
  /**
   * Whether the step has a darkened progress line.
   */
  hasProgressLine: boolean;
  /**
   * Index of the step.
   */
  index: number;
  /**
   * Title of the step.
   */
  title: string;
  /**
   * Optional label for the step.
   */
  label?: string;
  /**
   * Optional props to configure the `Link` component.
   */
  linkProps?: LinkProps;
  /**
   * Whether the step is clickable. If set to false, the step is not clickable and the text is muted with a light-dark colour.
   */
  enabled: boolean;
  /**
   * Optional value to highlight the selected step.
   */
  selected?: boolean;
  /**
   * Icon to display in the step. Specify "number" if the index should be displayed.
   */
  iconName: string;
  /**
   * Optional class(es) to pass to the Icon component.
   */
  iconClassName?: ClassName;
  /**
   * Function that is called when the step is clicked.
   */
  handleClick: () => void;
};

const Step = ({
  hasProgressLine,
  index,
  title,
  label,
  linkProps,
  enabled,
  selected = false,
  iconName,
  iconClassName,
  handleClick,
  ...props
}: Props): React.JSX.Element => {
  const stepStatusClass = enabled ? "step-enabled" : "step-disabled";

  return (
    <div
      className={classNames("step", {
        "progress-line": hasProgressLine,
        "step-selected": selected,
      })}
      {...props}
    >
      {iconName === "number" ? (
        <span
          className={classNames("step-number", {
            "step-number-disabled": !enabled,
          })}
        >
          {index}
        </span>
      ) : (
        <Icon
          name={iconName}
          className={classNames("step-status-icon", iconClassName)}
        />
      )}
      <div className="step-content">
        <span className={classNames(stepStatusClass)} onClick={handleClick}>
          {title}
        </span>
        {label && (
          <span
            className={classNames(
              "step-optional-content",
              "u-no-margin--bottom",
              {
                "step-disabled": !enabled,
              },
            )}
          >
            {label}
          </span>
        )}
        {linkProps && (
          <Link
            className="p-text--small u-no-margin--bottom step-optional-content"
            {...linkProps}
          >
            {linkProps.children}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Step;
