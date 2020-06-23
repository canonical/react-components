import React from "react";
import PropTypes from "prop-types";

import "./Chip.scss";

const Chip = ({ value, lead = "" }) => {
  return (
    <div className="p-chip">
      {lead ? `${lead.toUpperCase()}: ` : null}
      {value}
    </div>
  );
};

Chip.propTypes = {
  value: PropTypes.string,
  lead: PropTypes.string,
};

export default Chip;
