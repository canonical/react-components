export const IS_DEV = process.env.NODE_ENV === "development";

/**
 * hightlightSearchTerm - find substring and wrap in <strong /> tag
 * @param {string} str - The string to search
 * @param {string} searchStr - The substring to find
 * @param {Obj} newStr - HTML fragment containing match wrapped in strong tag
 */
export const hightlightSearchTerm = (str, searchStr) => {
  if (searchStr === "") return str;
  const caseInsensitiveRegex = new RegExp(searchStr, "gi");
  const newStr = str.replace(
    caseInsensitiveRegex,
    (match) => `<strong>${match}</strong>`
  );
  return newStr;
};
