import { highlightSubString } from "./utils";

describe("highlightSubString function ", () => {
  it("returns a substring match", () => {
    const string = "react";
    const subString = "act";
    const testString = highlightSubString(string, subString);
    expect(testString).toEqual({ match: true, text: "re<strong>act</strong>" });
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

  it("handles special substrings for regex matching", () => {
    expect(highlightSubString("somestring\\", "\\")).toEqual({
      text: "somestring<strong>\\</strong>",
      match: true,
    });
  });
});
