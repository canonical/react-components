import { shallow } from "enzyme";
import type { ShallowWrapper } from "enzyme";
import React from "react";

/**
 * Assert that some markup from Enzyme is equal to some provided JSX.
 * @param {ShallowWrapper} actual - ShallowWrapper output from Enzyme.
 * @param {JSX.Element} expected - Some JSX provided in the test.
 */
export const compareJSX = (
  actual: ShallowWrapper,
  expected: JSX.Element
): void => {
  const actualOutput = actual.debug();
  // If the very first child of a component is another component then this
  // will render that components markup, but we want to shallow render it.
  // By wrapping the expected JSX in a div we stop enzyme from rendering the
  // supplied component and then we compare against the actual output.
  const expectedOutput = shallow(<div>{expected}</div>)
    .children()
    .debug();
  expect(actualOutput).toBe(expectedOutput);
};
