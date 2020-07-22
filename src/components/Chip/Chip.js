import React from "react";
import PropTypes from "prop-types";

import "./Chip.scss";

const Chip = ({ value, lead = "", onDismiss, selected }) => {
  return (
    <div className="p-chip" aria-pressed={selected} role="button">
      <span className="p-chip__lead">
        {lead ? `${lead.toUpperCase()}: ` : null}
      </span>
      <span className="p-chip__value">{value}</span>
      {onDismiss ? (
        <button className="p-chip__dismiss" onClick={() => onDismiss()}>
          <i className="p-icon--close">Dismiss</i>
        </button>
      ) : null}
    </div>
  );
};

Chip.propTypes = {
  value: PropTypes.string,
  lead: PropTypes.string,
  onDismiss: PropTypes.func,
};

export default Chip;
