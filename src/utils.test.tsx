import { render } from "@testing-library/react";
import React from "react";

import { highlightSubString } from "./utils";

describe("highlightSubString function ", () => {
  it("returns a substring match", () => {
    const { text, match } = highlightSubString("react", "act");
    expect(match).toBe(true);
    expect(render(<>{text}</>).container.innerHTML).toBe(
      "re<strong>act</strong>",
    );
  });

  it("matches case insensitively and emphasises every occurrence", () => {
    const { text, match } = highlightSubString("Banana", "AN");
    expect(match).toBe(true);
    expect(render(<>{text}</>).container.innerHTML).toBe(
      "B<strong>an</strong><strong>an</strong>a",
    );
  });

  it("does not parse the string as HTML", () => {
    const { text, match } = highlightSubString("<b>bold</b>", "bold");
    expect(match).toBe(true);
    expect(render(<>{text}</>).container.innerHTML).toBe(
      "&lt;b&gt;<strong>bold</strong>&lt;/b&gt;",
    );
  });

  it("returns the string unchanged when there is no match", () => {
    expect(highlightSubString("react", "xyz")).toEqual({
      text: "react",
      match: false,
    });
  });

  it("gracefully fails when invalid string is provided", () => {
    expect(highlightSubString(undefined, "somesub")).toEqual({
      text: "",
      match: false,
    });
  });

  it("gracefully fails when invalid substring is provided", () => {
    expect(highlightSubString("somestring", undefined)).toEqual({
      text: "somestring",
      match: false,
    });
  });

  it("does not match an empty substring", () => {
    expect(highlightSubString("somestring", "")).toEqual({
      text: "somestring",
      match: false,
    });
  });

  it("handles special substrings for regex matching", () => {
    const { text, match } = highlightSubString("somestring\\", "\\");
    expect(match).toBe(true);
    expect(render(<>{text}</>).container.innerHTML).toBe(
      "somestring<strong>\\</strong>",
    );
  });
});
