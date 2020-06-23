import React from "react";
import PropTypes from "prop-types";

import "./Chip.scss";

const Chip = ({ value, lead = "", onDismiss }) => {
  return (
    <div className="p-chip">
      {lead ? `${lead.toUpperCase()}: ` : null}
      {value}
      {onDismiss ? (
        <button className="p-chip__dismiss" onClick={onDismiss()}>
          <i class="p-icon--close">Dismiss</i>
        </button>
      ) : null}
    </div>
  );
};

Chip.propTypes = {
  value: PropTypes.string,
  lead: PropTypes.string,
  onDismiss: PropTypes.func
};

export default Chip;
