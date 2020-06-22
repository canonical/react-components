import React from "react";
import PropTypes from "prop-types";

import "./Chip.scss";

const Chip = ({ value }) => {
  return (
    <div className="p-chip">
      { value }
    </div>
  );
};

Chip.propTypes = {
  value: PropTypes.string,
};

export default Chip;
