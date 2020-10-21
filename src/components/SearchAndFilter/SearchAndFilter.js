import { CSSTransition } from "react-transition-group";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import SearchBox from "../SearchBox";
import ContextualMenu from "../ContextualMenu";
import FilterPanelSection from "./FilterPanelSection";
import Chip from "../Chip";
import { overflowingChipsCount } from "./shared";

import "./SearchAndFilter.scss";

const SearchAndFilter = ({ filterPanelData, returnSearchData }) => {
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPanelHidden, setFilterPanelHidden] = useState(true);
  const [searchBoxExpanded, setSearchBoxExpanded] = useState(false);
  const [overflowSearchTermCounter, setOverflowSearchTermCounter] = useState(0);
  const [searchContainerActive, setSearchContainerActive] = useState(false);

  const searchAndFilterRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchBoxRef = useRef(null);

  // Return searchData to parent component
  useEffect(() => {
    let mounted = true;
    returnSearchData && mounted && returnSearchData(searchData);
    return () => {
      mounted = false;
    };
  }, [searchData, returnSearchData]);

  const searchOnChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Hide manual input form field when search container is inactive
  useEffect(() => {
    const searchContainerClickCheck = (e) => {
      const clickInContainer = e.target?.closest(".search-and-filter") !== null;
      setSearchContainerActive(clickInContainer);
    };

    document.addEventListener("click", (e) => searchContainerClickCheck(e));

    return () => {
      document.removeEventListener("click", (e) =>
        searchContainerClickCheck(e)
      );
    };
  }, [searchContainerActive]);

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
      if (!e.target.closest(".search-and-filter")) {
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
      toggleSelected({ value: searchTerm, quoteValue: true });
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
    const wrapperWidthObserver = new ResizeObserver(() => {
      updateFlowCount();
    });
    const wrapper = searchContainerRef.current;
    if (wrapper && typeof ResizeObserver !== "undefined") {
      wrapperWidthObserver.observe(wrapper);
    } else {
      updateFlowCount();
    }
    return () => {
      wrapperWidthObserver.disconnect();
    };
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
    <div
      className="search-and-filter"
      ref={searchAndFilterRef}
      onClick={() => filterPanelHidden && setFilterPanelHidden(false)}
    >
      <div
        className="search-and-filter__search-container"
        aria-expanded={searchBoxExpanded || searchContainerActive}
        data-active={searchContainerActive || searchData.length === 0}
        data-empty={searchData.length <= 0}
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
              quoteValue={chip.quoteValue}
            />
          );
        })}
        <SearchBox
          autocomplete="off"
          externallyControlled={true}
          placeholder={searchData.length ? "Add filter" : "Search and filter"}
          onChange={(searchTerm) => searchOnChange(searchTerm)}
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

      <div className="search-and-filter__panel" aria-hidden={filterPanelHidden}>
        <ContextualMenu
          autoAdjust={false}
          className="search-and-filter__contextual-menu"
          constrainPanelWidth
          onToggleMenu={(visible) => setFilterPanelHidden(!visible)}
          position="left"
          visible={!filterPanelHidden}
          dropdownClassName="search-and-filter__dropdown"
        >
          <CSSTransition
            appear={true}
            classNames={{
              appear: "search-and-filter__contextual-menu--transition-appear",
              appearActive:
                "search-and-filter__contextual-menu--transition-appear-active",
              appearDone:
                "search-and-filter__contextual-menu--transition-appear-done",
              enter: "search-and-filter__contextual-menu--transition-enter",
              enterActive:
                "search-and-filter__contextual-menu--transition-enter-active",
              enterDone:
                "search-and-filter__contextual-menu--transition-enter-done",
              exit: "search-and-filter__contextual-menu--transition-exit",
              exitActive:
                "search-and-filter__contextual-menu--transition-exit-active",
              exitDone:
                "search-and-filter__contextual-menu--transition-exit-done",
            }}
            in={true}
            timeout={200}
          >
            <>
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
                      sectionHidden={filterPanelHidden}
                    />
                  </div>
                );
              })}
            </>
          </CSSTransition>
        </ContextualMenu>
      </div>
    </div>
  );
};

SearchAndFilter.propTypes = {
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
  ).isRequired,
  returnSearchData: PropTypes.func.isRequired,
};

export default SearchAndFilter;
