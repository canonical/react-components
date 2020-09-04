import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import SearchBox from "../SearchBox";
import ContextualMenu from "../ContextualMenu";
import FilterPanelSection from "./FilterPanelSection";
import Chip from "../Chip";
import { overflowingChipsCount } from "./shared";

import "./SearchAndFilter.scss";

const SearchAndFilter = ({ externallyControlled = false, filterPanelData }) => {
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPanelHidden, setFilterPanelHidden] = useState(true);
  const [searchBoxExpanded, setSearchBoxExpanded] = useState(false);
  const [overflowSearchTermCounter, setOverflowSearchTermCounter] = useState(0);
  const searchAndFilterRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [searchContainerActive, setSearchContainerActive] = useState(false);

  const searchOnChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Hide manual input form field when search container is inactive
  useEffect(() => {
    const searchContainerClickCheck = document.addEventListener(
      "click",
      (e) => {
        const clickInContainer =
          e.target?.closest(".search-and-filter__search-container") !== null;
        setSearchContainerActive(clickInContainer);
      }
    );
    return () => {
      document.removeEventListener("click", searchContainerClickCheck);
    };
  }, [searchContainerActive]);

  // This useEffect sets up listeners so the panel will close if user clicks
  // anywhere else on the page or hits the escape key
  useEffect(() => {
    const closePanel = () => {
      setFilterPanelHidden(true);
    };

    const mouseDown = (e) => {
      // Check if click is outside of filter panel
      if (!searchAndFilterRef?.current?.contains(e.target)) {
        // If so, close the panel
        closePanel();
      }
    };

    const keyDown = (e) => {
      if (e.code === "Escape") {
        // Close panel if Esc keydown detected
        closePanel();
      }
    };

    // Add listener on document to capture click events
    document.addEventListener("mousedown", mouseDown);
    // Add listener on document to capture keydown events
    document.addEventListener("keydown", keyDown);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("keydown", keyDown);
    };
  }, [searchTerm]);

  // Add passed chip to the searchData array
  const toggleSelected = (chip) => {
    const currentSelected = [...searchData];
    if (!currentSelected.includes(chip)) {
      currentSelected.push(chip);
      setSearchData(currentSelected);
      setSearchTerm("");
    } else {
      const updatedCurrentSelected = currentSelected.filter(
        (currentSelectedChip) => {
          return currentSelectedChip.value !== chip.value;
        }
      );
      setSearchData(updatedCurrentSelected);
    }
  };

  // Remove passed chip from the searchData array
  const removeFromSelected = (chip) => {
    if (searchData.includes(chip)) {
      const updatedSelected = searchData.filter(
        (searchDataChip) => searchDataChip !== chip
      );
      setSearchData(updatedSelected);
    }
  };

  // When overflow chips are shown, clicking anywhere outside search area
  // or clicking on a chip should hide them again
  useEffect(() => {
    const hideOverflowChips = (e) => {
      if (
        !e.target.closest(".search-and-filter__search-container") &&
        !e.target.closest(".p-chip")
      ) {
        setSearchBoxExpanded(false);
      }
    };
    document.addEventListener("click", (e) => {
      hideOverflowChips(e);
    });
    return () => {
      document.removeEventListener("click", (e) => {
        hideOverflowChips(e);
      });
    };
  }, []);

  const handleSubmit = () => {
    if (searchTerm.trim() !== "") {
      toggleSelected({ value: searchTerm });
      setSearchTerm("");
    }
  };

  // If the offsetTop is more than double height of a single chip, consider it
  // overflowing
  const updateFlowCount = function () {
    const chips = searchContainerRef?.current?.querySelectorAll(".p-chip");
    const overflowCount = overflowingChipsCount(chips, 1);
    setOverflowSearchTermCounter(overflowCount);
  };

  // Watch for container resize and recalculate overflow count accordingly
  useEffect(() => {
    if (typeof ResizeObserver !== "undefined") {
      const wrapperWidthObserver = new ResizeObserver(() => {
        updateFlowCount();
      });
      const wrapper = searchContainerRef.current;
      wrapperWidthObserver.observe(wrapper);
    } else {
      updateFlowCount();
    }
  }, [searchData]);

  // Add search prompt value to search on Enter key
  const searchPromptKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const searchBox = searchBoxRef.current;
  const searchContainer = searchContainerRef.current;
  if (
    !searchBoxExpanded &&
    searchBox &&
    searchContainer &&
    overflowSearchTermCounter === 0
  ) {
    if (searchBox.offsetTop > searchContainer.offsetHeight) {
      setSearchBoxExpanded(true);
    }
  }

  // If chips or input field contains values, clear 'em out
  const clearAllSearchTerms = () => {
    setSearchTerm("");
  };

  return (
    <div className="search-and-filter" ref={searchAndFilterRef}>
      <div
        className="search-and-filter__search-container"
        aria-expanded={searchBoxExpanded || searchContainerActive}
        data-active={searchContainerActive}
        ref={searchContainerRef}
      >
        {searchTerm !== "" && (
          <button
            className="search-and-filter__clear"
            onClick={() => clearAllSearchTerms()}
          >
            <i className="p-icon--close" />
          </button>
        )}
        {Object.values(searchData).map((chip) => {
          return (
            <Chip
              lead={chip.lead}
              value={chip.value}
              key={`search-${chip.lead}+${chip.value}`}
              onDismiss={() => removeFromSelected(chip)}
              selected={true}
            />
          );
        })}
        <SearchBox
          autocomplete="off"
          externallyControlled={externallyControlled}
          placeholder={searchData.length ? "Add filter" : "Search and filter"}
          onChange={(searchTerm) => searchOnChange(searchTerm)}
          onClick={() => setFilterPanelHidden(false)}
          onFocus={() => setFilterPanelHidden(false)}
          onSubmit={(e) => handleSubmit(e)}
          value={searchTerm}
          ref={searchBoxRef}
          data-overflowing={searchBoxExpanded}
        />
        {overflowSearchTermCounter > 0 && (
          <span
            className="search-and-filter__selected-count"
            onClick={() => setSearchBoxExpanded(true)}
            onKeyDown={() => setSearchBoxExpanded(true)}
            role="button"
            tabIndex="0"
          >
            +{overflowSearchTermCounter}
          </span>
        )}
      </div>
      {filterPanelData && (
        <div
          className="search-and-filter__panel"
          aria-hidden={filterPanelHidden}
        >
          <ContextualMenu>
            {searchTerm.length > 0 && (
              <div
                className="search-prompt"
                onClick={() => handleSubmit()}
                onKeyDown={(e) => searchPromptKeyDown(e)}
                role="button"
                tabIndex="0"
              >
                Search for <strong>{searchTerm}</strong>...
              </div>
            )}
            {filterPanelData.map((filterPanelSectionData) => {
              return (
                <div key={filterPanelSectionData.id}>
                  <FilterPanelSection
                    data={filterPanelSectionData}
                    toggleSelected={toggleSelected}
                    searchData={searchData}
                    searchTerm={searchTerm}
                  />
                </div>
              );
            })}
          </ContextualMenu>
        </div>
      )}
    </div>
  );
};

SearchAndFilter.propTypes = {
  externallyControlled: PropTypes.bool,
  searchData: PropTypes.arrayOf(
    PropTypes.shape({
      chips: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lead: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  filterPanelData: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      chips: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lead: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchAndFilter;
