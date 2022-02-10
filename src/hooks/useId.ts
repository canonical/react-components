import { useRef } from "react";
import { nanoid } from "nanoid";

/**
 * A hook that returns the same random ID string on every render.
 * Can be used as a value for HTML "id" attributes.
 * @returns random ID string
 */
export const useId = (): string => useRef(nanoid()).current;
