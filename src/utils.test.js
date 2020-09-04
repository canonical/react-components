import { highlightSubString } from "./utils";

describe("highlightSubString function ", () => {
  it("returns a substring match", () => {
    const string = "react";
    const subString = "act";
    const testString = highlightSubString(string, subString);
    expect(testString).toEqual({ match: true, text: "re<strong>act</strong>" });
  });
});
