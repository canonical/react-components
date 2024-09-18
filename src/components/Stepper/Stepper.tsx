import React from "react";
import List from "components/List";
import { StepProps } from "./Step";
import classNames from "classnames";

export type Props = {
  /**
   * Optional value that defines the orientation of the stepper. Can either be "horizontal" or "vertical". If not specified, it defaults to "vertical".
   */
  variant?: "horizontal" | "vertical";
  /**
   * A list of steps.
   */
  steps: React.ReactElement<StepProps>[];
};

/**
 * This is a stepper component that is used to guide users through a series of sequential steps, providing a clear start and end point. It helps users understand their current position in the process and anticipate upcoming actions. The stepper component should accept a list of Step components for the steps.
 */

const Stepper = ({ variant = "vertical", steps }: Props): JSX.Element => {
  return (
    <List
      items={steps}
      inline={variant === "horizontal"}
      className={classNames({
        "stepper-horizontal": variant === "horizontal",
        "stepper-vertical": variant === "vertical",
      })}
    />
  );
};

export default Stepper;
