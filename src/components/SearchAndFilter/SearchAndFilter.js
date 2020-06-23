import React, { useState } from "react";
import PropTypes from "prop-types";

import SearchBox from "../SearchBox";

const SearchAndFilter = ({ externallyControlled = false, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchOnChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (externallyControlled && onChange) {
      onChange(searchTerm);
    }
  };

  return (
    <div className="search-and-filter">
      <SearchBox
        externallyControlled={externallyControlled}
        placeholder="Search and filter"
        onChange={(searchTerm) => searchOnChange(searchTerm)}
        value={searchTerm}
      />
    </div>
  );
};

SearchAndFilter.propTypes = {
  externallyControlled: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchAndFilter;
