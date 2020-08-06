import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Chip from "../../Chip";
import { overflowingChipsCount } from "../shared";
import { hightlightSubString } from "../../../utils";

import "./filter-panel-section.scss";

const FilterPanelSection = ({
  data,
  toggleSelected,
  searchData,
  searchTerm,
}) => {
  const { chips, heading } = data;
  const [overflowCounter, setOverflowCounter] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const chipWrapper = useRef(null);

  const handleChipClick = (chip) => {
    toggleSelected(chip);
  };

  // If the offsetTop is more than double height of a single chip, consider it
  // overflowing
  const updateFlowCount = function () {
    const chips = chipWrapper?.current?.querySelectorAll(".p-chip");
    const overflowCount = overflowingChipsCount(chips, 2);
    setOverflowCounter(overflowCount);
  };

  // Check if search term characters matches any characters in panel heading
  const searchTermInHeading = hightlightSubString(heading, searchTerm).includes(
    "<strong>"
  );

  // Serialise chip values into string so it can be interrogated with subString
  let chipValues = [];
  Object.entries(chips).forEach((chipValue) => {
    chipValues.push(chipValue[1].value);
  });
  // Search chips for character match with search term
  const searchTermInChips = hightlightSubString(
    chipValues.toString(),
    searchTerm
  ).includes("<strong>");

  const panelSectionVisible =
    searchTermInHeading || searchTermInChips || searchTerm === "";

  // Update overflow count when component is resized
  useEffect(() => {
    if (typeof ResizeObserver !== "undefined" && panelSectionVisible) {
      const wrapperWidthObserver = new ResizeObserver(() => {
        updateFlowCount();
      });
      const wrapper = chipWrapper?.current;
      wrapperWidthObserver.observe(wrapper);
    } else {
      updateFlowCount();
    }
  }, [panelSectionVisible]);

  // When overflow counter is clicked, all chips are shown
  const showAllChips = () => {
    setExpanded(true);
  };

  return (
    <>
      {panelSectionVisible && (
        <div className="filter-panel-section" aria-expanded={expanded}>
          {heading && (
            <h3
              className="filter-panel-section__heading"
              dangerouslySetInnerHTML={{
                __html: hightlightSubString(heading, searchTerm),
              }}
            />
          )}
          <div className="filter-panel-section__chips" ref={chipWrapper}>
            {chips?.map((chip) => {
              // If search term has been added to input, only matching chips
              // should display
              const searchTermInChip = hightlightSubString(
                chip.value,
                searchTerm
              ).includes("<strong>");
              const chipVisible = searchTermInChip || searchTerm === "";
              return (
                <span key={`${chip.lead}+${chip.value}`}>
                  {chipVisible && (
                    <Chip
                      lead={chip.lead}
                      value={chip.value}
                      selected={searchData?.includes(chip) ? true : false}
                      subString={searchTerm}
                      onClick={() => handleChipClick(chip)}
                    />
                  )}
                </span>
              );
            })}
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
      )}
    </>
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
