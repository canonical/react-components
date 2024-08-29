import classNames from "classnames";
import React, { useState, HTMLProps } from "react";

import AccordionSection from "./AccordionSection";
import type {
  AccordionHeadings,
  AccordionSectionProps,
} from "./AccordionSection";

import type { ClassName, PropsWithSpread } from "types";

export type Section = AccordionSectionProps & {
  /**
   * An optional key for the section component. It will also be
   * used to track which section is selected.
   */
  key?: string | number;
};

export type Props = PropsWithSpread<
  {
    /**
     * Optional classes applied to the parent element.
     */
    className?: ClassName;
    /**
     * An optional value to set the expanded section. The value must match a
     * section key. This value will only set the expanded section on first render
     * if externallyControlled is not set to `true`.
     */
    expanded?: string;
    /**
     * Whether the expanded section will be controlled via external state.
     */
    externallyControlled?: boolean;
    /**
     * Optional function that is called when the expanded section is changed.
     * The function is provided the section title or null.
     */
    onExpandedChange?: (id: string, title: string) => void;
    /**
     * An array of sections and content.
     */
    sections: Section[];
    /**
     * Optional string describing heading element that should be used for the section titles.
     */
    titleElement?: AccordionHeadings;
  },
  HTMLProps<HTMLElement>
>;

const generateSections = (
  sections: Section[],
  setExpanded,
  expanded,
  titleElement
) =>
  sections.map(({ key, ...props }, i) => (
    <AccordionSection
      expanded={expanded}
      key={key || i}
      sectionKey={key?.toString()}
      setExpanded={setExpanded}
      titleElement={titleElement}
      {...props}
    />
  ));

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Accordion](https://docs.vanillaframework.io/patterns/accordion/).
 *
 * The sidebar accordion, used in listing pages or as navigation, can hold multiple navigation items or to be used as a filter for content.
 */
const Accordion = ({
  className,
  expanded,
  externallyControlled,
  onExpandedChange,
  sections,
  titleElement,
  ...asideProps
}: Props): JSX.Element => {
  const [expandedSection, setExpandedSection] = useState(expanded);
  const setExpanded = (id: string, title: string) => {
    setExpandedSection(id);
    onExpandedChange && onExpandedChange(id, title);
  };
  return (
    <aside
      className={classNames(className, "p-accordion")}
      {...asideProps}
      role="tablist"
      aria-multiselectable="true"
    >
      <ul className="p-accordion__list">
        {generateSections(
          sections,
          setExpanded,
          externallyControlled ? expanded : expandedSection,
          titleElement
        )}
      </ul>
    </aside>
  );
};

export default Accordion;
