import React, { SyntheticEvent } from "react";
import PropTypes from "prop-types";

import "./ShowMore.scss";

type Props = {
  label: string;
  onClick: (event: SyntheticEvent) => void;
  isLoading?: boolean;
};

const ShowMore = ({ isLoading, label, onClick }: Props): JSX.Element => (
  <div className="p-show-more__container">
    {isLoading ? (
      <span className="p-show-more__button">
        <i className="p-icon--spinner u-animation--spin" />
      </span>
    ) : (
      <button className="p-show-more__button p-button--base" onClick={onClick}>
        {label}
      </button>
    )}
  </div>
);

ShowMore.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default ShowMore;
