import React from "react";
import PropTypes from "prop-types";
import type { MouseEvent } from "react";

import "./Chip.scss";

type Props = {
  value: string;
  lead?: string;
  onDismiss?: (evt: MouseEvent) => void;
};

const Chip = ({ value, lead, onDismiss }: Props): JSX.Element => (
  <div className="p-chip">
    {lead ? `${lead.toUpperCase()}: ${value}` : value}
    {onDismiss ? (
      <button className="p-chip__dismiss" onClick={onDismiss}>
        <i className="p-icon--close">Dismiss</i>
      </button>
    ) : null}
  </div>
);

Chip.propTypes = {
  value: PropTypes.string.isRequired,
  lead: PropTypes.string,
  onDismiss: PropTypes.func,
};

export default Chip;
