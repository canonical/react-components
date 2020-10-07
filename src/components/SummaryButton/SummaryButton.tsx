import React, { SyntheticEvent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

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
}: Props): JSX.Element => {
  // prevent browser from changing the URL
  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <small className={classNames("u-text--muted", className)}>
      {summary && (
        <>
          <span>{summary}</span>{" "}
        </>
      )}
      {isLoading ? (
        <i className="p-icon--spinner u-animation--spin" />
      ) : (
        onClick && (
          <a href="#show-more" onClick={handleClick}>
            {label}
          </a>
        )
      )}
    </small>
  );
};

SummaryButton.propTypes = {
  className: PropTypes.string,
  summary: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default SummaryButton;
