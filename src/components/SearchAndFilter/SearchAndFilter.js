import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import SearchBox from "../SearchBox";
import ContextualMenu from "../ContextualMenu";
import Chip from "../Chip";

import "./SearchAndFilter.scss";

const SearchAndFilter = ({ externallyControlled = false, onChange, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPanelHidden, setFilterPanelHidden] = useState(true);
  const filterPanelRef = useRef();

  const searchOnChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (externallyControlled && onChange) {
      onChange(searchTerm);
    }
  };

  // This useEffect sets up listeners so the panel will close if user clicks
  // anywhere else on the page or hits the escape key
  useEffect(() => {
    const closePanel = () => {
      setFilterPanelHidden(true);
    };

    const mouseDown = (e) => {
      // Check if click is outside of filter panel
      if (!filterPanelRef?.current?.contains(e.target)) {
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
  }, []);

  return (
    <div className="search-and-filter">
      <SearchBox
        autocomplete="off"
        externallyControlled={externallyControlled}
        placeholder="Search and filter"
        onChange={(searchTerm) => searchOnChange(searchTerm)}
        onClick={() => setFilterPanelHidden(false)}
        onFocus={() => setFilterPanelHidden(false)}
        value={searchTerm}
      />
      {data && (
        <div
          className="search-and-filter__panel"
          ref={filterPanelRef}
          aria-hidden={filterPanelHidden}
        >
          <ContextualMenu>
            {data.map((group, i) => (
              <div key={i} className="search-and-filter__section">
                <h3 className="search-and-filter__section-header">
                  {group.heading}
                </h3>
                {group.chips.map((chip, i) => (
                  <Chip key={i} lead={chip.lead} value={chip.value} />
                ))}
              </div>
            ))}
          </ContextualMenu>
        </div>
      )}
    </div>
  );
};

SearchAndFilter.propTypes = {
  externallyControlled: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      chips: PropTypes.arrayOf(
        PropTypes.shape({
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
