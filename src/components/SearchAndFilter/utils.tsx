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

/**
 * Check if supplied chip object already exists in searchData prop
 * @param {Object} chip - A chip object {lead: 'foo', value: 'bar'}
 * @param {Array} existingArr - An array of chip objects
 */
export const isChipInArray = (chip, existingArr) =>
  existingArr?.some(
    (searchDataItem) =>
      searchDataItem.lead === chip.lead && searchDataItem.value === chip.value,
  );
