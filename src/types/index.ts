/**
 * This type should be used for all className props in order to ensure
 * consistency across components.
 */
export type ClassName = string | null;
/**
 * The allowable heading levels.
 */
export type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
/**
 * This type can be used when defining props that also spread the props of
 * something else. It ensures that the defined component props are never
 * overwritten by the spread props.
 */
export type PropsWithSpread<P, H> = P & Omit<H, keyof P>;
/**
 * The allowable sort directions e.g. for a sortable table.
 */
export type SortDirection = "none" | "ascending" | "descending";
/**
 * This type can be used when passing props to a sub component. It makes all
 * component props optional.
 */
export type SubComponentProps<P> = Partial<P> & {
  // There is currently an issue when spreading additional unknown props e.g.
  // `data-testid` which is the reason for this wildcard object. This extra type
  // can be removed when the following issue is resolved:
  // https://github.com/microsoft/TypeScript/issues/28960
  [prop: string]: unknown;
};
/**
 * This type is simply an alias for the 'any' type and should be used sparingly,
 * if at all.
 */
export type TSFixMe = any; // eslint-disable-line @typescript-eslint/no-explicit-any
/**
 * This type allows for converting an object const into an enum-like construct,
 * e.g. value: ValueOf<typeof EnumLike> will only allow value to be a value
 * defined in EnumLike.
 */
export type ValueOf<T> = T[keyof T];

/**
 * The Vanilla theme types.
 */
export enum Theme {
  /**
   * The dark Vanilla theme.
   */
  DARK = "dark",
  /**
   * The light Vanilla theme.
   */
  LIGHT = "light",
}
