import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Chip from "../../Chip";

import "./filter-panel-section.scss";

const FilterPanelSection = ({ data }) => {
  const { chips, heading } = data;
  const [overflowCounter, setOverflowCounter] = useState(0);
  const chipWrapper = useRef(null);
  const viewportWidth = window.innerWidth;

  // if the offsetTop is more than double height of a single chip, consider it
  // oveflowing
  const updateFlowCount = function () {
    const chips = chipWrapper.current.querySelectorAll(".p-chip");
    let overflowChips = 0;
    chips.forEach((chip) => {
      if (chip.offsetTop > chip.offsetHeight * 2) overflowChips++;
    });
    setOverflowCounter(overflowChips);
  };

  useEffect(() => {
    updateFlowCount();
    window.addEventListener("resize", updateFlowCount);
    return () => {
      window.removeEventListener("resize", updateFlowCount);
    };
  }, [chipWrapper, viewportWidth]);

  return (
    <div className="filter-panel-section">
      {heading && (
        <h3 className="filter-panel-section__heading">{data.heading}</h3>
      )}
      <div className="filter-panel-section__chips" ref={chipWrapper}>
        {chips?.map((chip) => (
          <Chip
            lead={chip.lead}
            value={chip.value}
            key={`${chip.lead}+${chip.value}`}
          />
        ))}
        {overflowCounter > 0 && (
          <span className="filter-panel-section__counter">
            +{overflowCounter}
          </span>
        )}
      </div>
    </div>
  );
};

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
