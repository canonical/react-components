import React from "react";
import type { MouseEventHandler } from "react";
import classNames from "classnames";

import ActionButton from "../ActionButton";
import { ButtonAppearance } from "../Button/Button";

import type { ClassName } from "types";

export type Props = {
  /**
   * Optional class(es) to pass to the wrapping element.
   */
  className?: ClassName;
  /**
   * Whether the summary button is loading.
   */
  isLoading?: boolean;
  /**
   * The label of the summary button.
   */
  label: string;
  /**
   * Function to handle clicking the summary button.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
  /**
   * The summary content.
   */
  summary?: string;
};

const SummaryButton = ({
  className,
  isLoading,
  summary,
  label,
  onClick,
}: Props): JSX.Element => (
  <small className={className}>
    {summary && <span className="u-text--muted">{summary}</span>}
    {onClick && (
      <ActionButton
        appearance={ButtonAppearance.NEUTRAL}
        className={classNames("is-small", "is-dense", {
          "is-inline": summary,
        })}
        onClick={onClick}
        loading={isLoading}
        disabled={isLoading}
      >
        {label}
      </ActionButton>
    )}
  </small>
);

export default SummaryButton;
