export type ClassName = string | null;
export type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type SortDirection = "none" | "ascending" | "descending";
export type ValueOf<T> = T[keyof T];

/**
 * This type can be used when passing props to a sub component. It makes all
 * component props optional.
 */
export type SubComponentProps<P> = Partial<P> & {
  // There is currently an issue when spreading additional unknown props e.g.
  // `data-test` which is the reason for this wildcard object. This extra type
  // can be removed when the following issue is resolved:
  // https://github.com/microsoft/TypeScript/issues/28960
  [prop: string]: unknown;
};
