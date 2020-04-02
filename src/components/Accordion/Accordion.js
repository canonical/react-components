import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";

import AccordionSection from "../AccordionSection";

const generateSections = (sections, setExpanded, expanded) =>
  sections.map(({ key, ...props }, i) => (
    <AccordionSection
      expanded={expanded}
      key={key || i}
      sectionKey={key}
      setExpanded={setExpanded}
      {...props}
    />
  ));

const Accordion = ({
  className,
  expanded,
  externallyControlled,
  onExpandedChange,
  sections,
  ...props
}) => {
  const [expandedSection, setExpandedSection] = useState(expanded);
  const setExpanded = (id, title) => {
    setExpandedSection(id);
    onExpandedChange && onExpandedChange(id, title);
  };
  return (
    <aside
      className={classNames(className, "p-accordion")}
      {...props}
      role="tablist"
      aria-multiselectable="true"
    >
      <ul className="p-accordion__list">
        {generateSections(
          sections,
          setExpanded,
          externallyControlled ? expanded : expandedSection
        )}
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
   * An optional value to set the expanded section. The value must match a
   * section key. This value will only set the expanded section on first render
   * if externallyControlled is not set to `true`.
   */
  expanded: PropTypes.string,
  /**
   * Whether the expanded section will be controlled via external state.
   */
  externallyControlled: PropTypes.bool,
  /**
   * An array of sections and content.
   */
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The content of the section.
       */
      content: PropTypes.node,
      /**
       * An optional key for the section component. It will also be
       * used to track which section is selected.
       */
      key: PropTypes.string,
      /**
       * An optional click event when the title is clicked.
       */
      onTitleClick: PropTypes.func,
      /**
       * The title of the section.
       */
      title: PropTypes.string
    }).isRequired
  ),
  /**
   * Optional function that is called when the expanded section is changed.
   * The function is provided the section title or null.
   */
  onExpandedChange: PropTypes.func
};

export default Accordion;
