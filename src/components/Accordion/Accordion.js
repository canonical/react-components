import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";

import AccordionSection from "../AccordionSection";

const generateSections = (sections, setExpanded, expanded) =>
  sections.map(({ content, title }, i) => (
    <AccordionSection
      content={content}
      expanded={expanded}
      key={i}
      setExpanded={setExpanded}
      title={title}
    />
  ));

const Accordion = ({ className, sections, ...props }) => {
  const [expanded, setExpanded] = useState();
  return (
    <aside
      className={classNames(className, "p-accordion")}
      {...props}
      role="tablist"
      aria-multiselectable="true"
    >
      <ul className="p-accordion__list">
        {generateSections(sections, setExpanded, expanded)}
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
       * The title of the section.
       */
      title: PropTypes.string,
      /**
       * The content of the section.
       */
      content: PropTypes.node
    }).isRequired
  )
};

export default Accordion;
