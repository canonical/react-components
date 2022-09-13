import React from "react";
import * as nanoid from "nanoid";

import Accordion from "./Accordion";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Accordion", () => {
  beforeEach(() => {
    jest.spyOn(nanoid, "nanoid").mockReturnValueOnce("mocked-nanoid");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders", () => {
    render(
      <Accordion
        sections={[
          {
            title: "Advanced topics",
            content: "test content",
          },
          {
            title: "Networking",
            content: <>More test content</>,
          },
        ]}
      />
    );
    expect(screen.getByRole("tablist")).toMatchSnapshot();
  });

  it("passes title heading element to AccordionSections", () => {
    render(
      <Accordion
        sections={[
          {
            title: "Advanced topics",
            content: "test content",
          },
          {
            title: "Networking",
            content: <>More test content</>,
          },
        ]}
        titleElement="h4"
      />
    );
    // Query for the specific element as defined in the titleElement prop.
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector("li h4")).toBeInTheDocument();
  });

  it("can call a function when a section is expanded", async () => {
    const onExpandedChange = jest.fn();
    render(
      <Accordion
        onExpandedChange={onExpandedChange}
        sections={[
          {
            title: "Advanced topics",
            content: "test content",
          },
          {
            title: "Networking",
            content: <>More test content</>,
          },
        ]}
      />
    );
    const tab = screen.getByRole("tab", { name: "Advanced topics" });
    await userEvent.click(tab);
    expect(onExpandedChange).toHaveBeenCalledWith(
      "mocked-nanoid",
      "Advanced topics"
    );
    // Clicking the tab again should close the accordion section.
    await userEvent.click(tab);
    expect(onExpandedChange).toHaveBeenCalledWith(null, null);
  });

  it("can set the default expanded state", () => {
    render(
      <Accordion
        expanded="networking"
        sections={[
          {
            title: "Advanced topics",
            content: "test content",
            key: "advanced",
          },
          {
            title: "Networking",
            content: <>More test content</>,
            key: "networking",
          },
        ]}
      />
    );
    expect(screen.getByRole("tabpanel", { name: "Networking" })).toBeVisible();
  });

  it("can add additional classes", () => {
    render(<Accordion className="extra-class" sections={[]} />);
    expect(screen.getByRole("tablist")).toHaveClass("p-accordion");
    expect(screen.getByRole("tablist")).toHaveClass("extra-class");
  });
});
