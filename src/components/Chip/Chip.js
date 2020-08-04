import React from "react";
import PropTypes from "prop-types";
import { hightlightSubString } from "../../utils";

import "./Chip.scss";

const Chip = ({ value, lead = "", onDismiss, selected, subString = "" }) => {
  return (
    <div className="p-chip" aria-pressed={selected} role="button">
      <span className="p-chip__lead">
        {lead ? `${lead.toUpperCase()}: ` : null}
      </span>
      <span
        className="p-chip__value"
        dangerouslySetInnerHTML={{
          __html: hightlightSubString(value, subString),
        }}
      />

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
