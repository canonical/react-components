import React from "react";
import PropTypes from "prop-types";
import { highlightSubString } from "../../utils";
import type { KeyboardEvent, MouseEvent } from "react";

export type Props = {
  lead?: string;
  onClick?: (
    event: MouseEvent<HTMLDivElement> | { lead: string; value: string }
  ) => void;
  onDismiss?: () => void;
  selected?: boolean;
  subString?: string;
  quoteValue?: boolean;
  value: string;
};

const Chip = ({
  lead = "",
  onClick,
  onDismiss,
  quoteValue,
  selected,
  subString = "",
  value,
}: Props): JSX.Element => {
  // When user tabs over chip and presses Enter or Space key, chip will trigger
  // click functionality
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // The " " value is what is returned for the spacebar
    if (e.key === " " || e.key === "Enter") {
      if (typeof onClick === "function") {
        onClick({ lead: lead, value: value });
      }
    }
  };

  const chipValue = highlightSubString(value, subString).text;
  return (
    <div
      className="p-chip"
      aria-pressed={selected}
      role="button"
      tabIndex={!onDismiss ? 0 : null}
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
  lead: PropTypes.string,
  onClick: PropTypes.func,
  onDismiss: PropTypes.func,
  selected: PropTypes.bool,
  subString: PropTypes.string,
  quoteValue: PropTypes.bool,
  value: PropTypes.string,
};

export default Chip;
