import React from "react";
import PropTypes from "prop-types";
import Chip from "../../Chip";

import "./filter-panel-section.scss";

const FilterPanelSection = ({ data }) => (
  <div className="filter-panel-section">
    <h3 className="filter-panel-section__heading">{data?.heading}</h3>
    {data?.chips?.map((chip, i) => (
      <Chip lead={chip.lead} value={chip.value} key={i} />
    ))}
  </div>
);

FilterPanelSection.propTypes = {
  data: PropTypes.any,
};

export default FilterPanelSection;
