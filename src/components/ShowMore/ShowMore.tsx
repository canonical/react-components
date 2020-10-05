import React, { SyntheticEvent } from "react";
import PropTypes from "prop-types";

import "./ShowMore.scss";

type Props = {
  label: string;
  onClick: (event: SyntheticEvent) => void;
  summary?: string;
  isLoading?: boolean;
};

const ShowMore = ({
  isLoading,
  summary,
  label,
  onClick,
}: Props): JSX.Element => {
  // prevent browser from changing the URL
  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    onClick(event);
  };

  return (
    <span>
      {summary && (
        <>
          <span>{summary}</span>{" "}
        </>
      )}
      {isLoading ? (
        <i className="p-icon--spinner u-animation--spin" />
      ) : (
        <a href="#show-more" onClick={handleClick}>
          {label}
        </a>
      )}
    </span>
  );
};

ShowMore.propTypes = {
  summary: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default ShowMore;
