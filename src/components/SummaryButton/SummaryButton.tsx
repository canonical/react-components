import React from "react";
import type { MouseEventHandler } from "react";
import classNames from "classnames";

import ActionButton from "../ActionButton";

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

/**
 * `SummaryButton` is a component to render a short summary with an action button. It's initial use case is a summary of table contents with action to load more items.
 */
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
