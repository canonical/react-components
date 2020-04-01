import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";

import AccordionSection from "../AccordionSection";

const generateSections = (sections, setExpanded, expanded) =>
  sections.map((props, i) => (
    <AccordionSection
      expanded={expanded}
      key={i}
      setExpanded={setExpanded}
      {...props}
    />
  ));

const Accordion = ({ className, onExpandedChange, sections, ...props }) => {
  const [expanded, setExpanded] = useState();
  const changeExpanded = (id, title) => {
    setExpanded(id);
    onExpandedChange && onExpandedChange(title);
  };
  return (
    <aside
      className={classNames(className, "p-accordion")}
      {...props}
      role="tablist"
      aria-multiselectable="true"
    >
      <ul className="p-accordion__list">
        {generateSections(sections, changeExpanded, expanded)}
      </ul>
    </aside>
  );
};

Accordion.propTypes = {
  /**
   * Optional classes applied to the parent element.
   */
  className: PropTypes.string,
  /**
   * An array of sections and content.
   */
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * An optional click event when the title is clicked.
       */
      onTitleClick: PropTypes.func,
      /**
       * The title of the section.
       */
      title: PropTypes.string,
      /**
       * The content of the section.
       */
      content: PropTypes.node
    }).isRequired
  ),
  /**
   * Optional function that is called when the expanded section is changed.
   * The function is provided the section title or null.
   */
  onExpandedChange: PropTypes.func
};

export default Accordion;
