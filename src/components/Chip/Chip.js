import React from "react";
import PropTypes from "prop-types";
import { highlightSubString } from "../../utils";

const Chip = ({
  value,
  lead = "",
  onClick,
  onDismiss,
  selected,
  subString = "",
  quoteValue,
}) => {
  // When user tabs over chip and presses Enter or Space key, chip will trigger
  // click functionality
  const onKeyDown = (e) => {
    // The " " value is what is returned for the spacebar
    if (e.key === " " || e.key === "Enter") {
      if (onClick instanceof Function) {
        onClick({ lead: lead, cloud: value });
      }
    }
  };

  const chipValue = highlightSubString(value, subString).text;
  return (
    <div
      className="p-chip"
      aria-pressed={selected}
      role="button"
      tabIndex={!onDismiss ? "0" : null}
      onClick={onClick}
      onKeyDown={(e) => onKeyDown(e)}
    >
      {lead && <span className="p-chip__lead">{lead.toUpperCase()}</span>}
      <span
        className="p-chip__value"
        dangerouslySetInnerHTML={{
          __html: quoteValue ? `'${chipValue}'` : chipValue,
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
