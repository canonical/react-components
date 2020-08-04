export const IS_DEV = process.env.NODE_ENV === "development";

/**
 * Find substring and wrap in <strong /> tag
 * @param {string} str - The string to search
 * @param {string} subString - The substring to find
 * @param {Obj} newStr - HTML fragment containing match wrapped in strong tag
 */
export const hightlightSubString = (str, subString) => {
  if (subString === "") return str;
  const caseInsensitiveRegex = new RegExp(subString, "gi");
  const newStr = str.replace(
    caseInsensitiveRegex,
    (match) => `<strong>${match}</strong>`
  );
  return newStr;
};
