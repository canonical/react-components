import React from "react";
import PropTypes from "prop-types";

import "./Chip.scss";

const generateLead = (lead) => {
  if (!lead && typeof lead !== "string") {
    return "";
  }
  return `${lead.toUpperCase()}: `;
}

const Chip = ({ value, lead }) => {
  return (
    <div className="p-chip">
      { generateLead(lead) }{ value }
    </div>
  );
};

Chip.propTypes = {
  value: PropTypes.string,
  lead: PropTypes.string,
};

export default Chip;
