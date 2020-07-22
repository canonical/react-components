/**
 * Return number of overflowing chips given a row threshold
 * @param {array} chips - An array of chips
 * @param {Integer} overflowRowLimit - Number of rows to show before counting
 * overflow
 */
export const overflowingChipsCount = (chips, overflowRowLimit) => {
  let overflowChips = 0;
  if (chips) {
    chips.forEach((chip) => {
      if (chip.offsetTop > chip.offsetHeight * overflowRowLimit)
        overflowChips++;
    });
  }
  return overflowChips;
};
