import React, { SyntheticEvent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ActionButton from "../ActionButton";

type Props = {
  className?: string;
  label: string;
  onClick: (event: SyntheticEvent) => void;
  summary?: string;
  isLoading?: boolean;
};

const SummaryButton = ({
  className,
  isLoading,
  summary,
  label,
  onClick,
}: Props): JSX.Element => (
  <small className={classNames("u-text--muted", className)}>
    {summary && (
      <>
        <span>{summary}</span>{" "}
      </>
    )}
    {onClick && (
      <ActionButton
        appearance="neutral"
        className="is-small is-dense"
        onClick={onClick}
        loading={isLoading}
        disabled={isLoading}
      >
        {label}
      </ActionButton>
    )}
  </small>
);

SummaryButton.propTypes = {
  className: PropTypes.string,
  summary: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default SummaryButton;
