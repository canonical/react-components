import React from "react";
import PropTypes from "prop-types";
import Chip from "../../Chip";

import "./filter-panel-section.scss";

const FilterPanelSection = ({ data }) => (
  <div className="filter-panel-section">
    {data?.heading && (
      <h3 className="filter-panel-section__heading">{data.heading}</h3>
    )}
    {data?.chips?.map((chip) => (
      <Chip
        lead={chip.lead}
        value={chip.value}
        key={`${chip.lead}+${chip.value}`}
      />
    ))}
  </div>
);

FilterPanelSection.propTypes = {
  data: PropTypes.shape({
    heading: PropTypes.string,
    chips: PropTypes.arrayOf(
      PropTypes.shape({
        lead: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  }),
};

export default FilterPanelSection;
