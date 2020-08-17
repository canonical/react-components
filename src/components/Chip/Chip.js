import React from "react";
import PropTypes from "prop-types";
import { hightlightSubString } from "../../utils";

import "./Chip.scss";

const Chip = ({
  value,
  lead = "",
  onClick,
  onDismiss,
  selected,
  subString = "",
}) => {
  // When user tabs over chip and presses Enter or Space key, chip will trigger
  // click functionality
  const onKeyPress = (e) => {
    // charCode 32 = Space key
    // charCode 13 = Enter key
    if (e.charCode === 32 || e.charCode === 13) {
      if (onClick instanceof Function) {
        onClick({ lead: lead, cloud: value });
      }
    }
  };

  return (
    <div
      className="p-chip"
      aria-pressed={selected}
      role="button"
      tabIndex={!onDismiss ? "0" : null}
      onClick={onClick}
      onKeyPress={(e) => onKeyPress(e)}
    >
      <span className="p-chip__lead">
        {lead ? `${lead.toUpperCase()}: ` : null}
      </span>
      <span
        className="p-chip__value"
        dangerouslySetInnerHTML={{
          __html: hightlightSubString(value, subString).text,
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
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  subString: PropTypes.string,
};

export default Chip;
