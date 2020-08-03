import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Chip from "../../Chip";
import { overflowingChipsCount } from "../shared";

import "./filter-panel-section.scss";

const FilterPanelSection = ({
  data,
  addToSelected,
  searchData,
  searchTerm,
}) => {
  const { chips, heading } = data;
  const [overflowCounter, setOverflowCounter] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const chipWrapper = useRef(null);

  const handleChipClick = (chip) => {
    addToSelected(chip);
  };

  // If the offsetTop is more than double height of a single chip, consider it
  // overflowing
  const updateFlowCount = function () {
    const chips = chipWrapper?.current?.querySelectorAll(".p-chip");
    const overflowCount = overflowingChipsCount(chips, 2);
    setOverflowCounter(overflowCount);
  };

  useEffect(() => {
    if (typeof ResizeObserver !== "undefined") {
      const wrapperWidthObserver = new ResizeObserver(() => {
        updateFlowCount();
      });
      const wrapper = chipWrapper.current;
      wrapperWidthObserver.observe(wrapper);
    } else {
      updateFlowCount();
    }
  }, []);

  const showAllChips = () => {
    setExpanded(true);
  };

  const hightlightSearchTerm = (str) => {
    if (searchTerm === "") return str;
    const caseInsensitiveRegex = new RegExp(searchTerm, "gi");
    const newStr = str.replace(
      caseInsensitiveRegex,
      (match) => `<strong>${match}</strong>`
    );
    return newStr;
  };

  return (
    <div className="filter-panel-section" aria-expanded={expanded}>
      {heading && (
        <h3
          className="filter-panel-section__heading"
          dangerouslySetInnerHTML={{ __html: hightlightSearchTerm(heading) }}
        />
      )}
      <div className="filter-panel-section__chips" ref={chipWrapper}>
        {chips?.map((chip) => (
          <span
            key={`${chip.lead}+${chip.value}`}
            onClick={() => handleChipClick(chip)}
          >
            <Chip
              lead={chip.lead}
              value={chip.value}
              selected={searchData?.includes(chip) ? true : false}
            />
          </span>
        ))}
        {overflowCounter > 0 && !expanded && (
          <span
            className="filter-panel-section__counter"
            onClick={showAllChips}
            onKeyPress={showAllChips}
            tabIndex="0"
          >
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
