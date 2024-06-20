import React from "react";
import { render, screen } from "@testing-library/react";

import AccordionSection from "./AccordionSection";
import userEvent from "@testing-library/user-event";

describe("AccordionSection ", () => {
  it("renders", () => {
    render(
      <AccordionSection
        content={<span>Test</span>}
        expanded="abcd-1234"
        setExpanded={jest.fn()}
        title="Test section"
      />
    );

    expect(screen.getByRole("listitem")).toMatchSnapshot();
  });

  it("renders headings for titles", () => {
    render(
      <AccordionSection
        content={<span>Test</span>}
        expanded="abcd-1234"
        setExpanded={jest.fn()}
        title="Test section"
        titleElement="h4"
      />
    );
    // Query for the specific element as defined in the titleElement prop.
    // eslint-disable-next-line testing-library/no-node-access
    const title = screen.getByRole("heading");
    expect(title.tagName).toBe("H4");
    expect(title).not.toHaveAttribute("aria-level");
  });

  it("can handle click events on the title", async () => {
    const onTitleClick = jest.fn();
    let expanded: string | null = null;
    const { rerender } = render(
      <AccordionSection
        content={<span>Test</span>}
        expanded={expanded}
        onTitleClick={onTitleClick}
        setExpanded={(id) => {
          expanded = id;
        }}
        title="Test section"
      />
    );
    await userEvent.click(screen.getByRole("tab", { name: "Test section" }));
    expect(onTitleClick).toHaveBeenCalledWith(true, ":r4:");
    rerender(
      <AccordionSection
        content={<span>Test</span>}
        expanded={expanded}
        onTitleClick={onTitleClick}
        setExpanded={(id) => {
          expanded = id;
        }}
        title="Test section"
      />
    );
    // Clicking the title again should close the accordion section.
    await userEvent.click(screen.getByRole("tab", { name: "Test section" }));

    expect(onTitleClick.mock.calls[1]).toEqual([false, ":r4:"]);
  });

  it("can use a key for expanded state", async () => {
    const onTitleClick = jest.fn();
    let expanded: string | null = null;
    render(
      <AccordionSection
        content={<span>Test</span>}
        expanded={expanded}
        sectionKey="first-key"
        onTitleClick={onTitleClick}
        setExpanded={(id) => {
          expanded = id;
        }}
        title="Test section"
      />
    );
    await userEvent.click(screen.getByRole("tab", { name: "Test section" }));

    expect(onTitleClick).toHaveBeenCalledWith(true, "first-key");
  });

  it("renders custom headings for titles", () => {
    render(
      <AccordionSection
        content={<span>Test</span>}
        expanded="abcd-1234"
        setExpanded={jest.fn()}
        title={
          <>
            <span>Test section </span>
            <span>optional</span>
          </>
        }
      />
    );
    const title = screen.getByRole("tab");
    expect(title.children).toHaveLength(2);
    expect(title).toHaveTextContent("Test section optional");
  });
});
