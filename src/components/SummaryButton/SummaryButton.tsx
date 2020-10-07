import React, { SyntheticEvent } from "react";
import PropTypes from "prop-types";

import ActionButton from "../ActionButton";

import "./SummaryButton.scss";

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
  <small className={className}>
    {summary && (
      <span className="p-summary__text u-text--muted">{summary}</span>
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
