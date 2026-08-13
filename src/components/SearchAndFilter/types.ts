import type { ValueOf } from "index";
import type { ChipType } from "../Chip/Chip";

export type SearchAndFilterChip = {
  appearance?: ValueOf<typeof ChipType>;
  id?: number;
  lead?: string;
  quoteValue?: boolean;
  value: string;
};

export type SearchAndFilterData = {
  id: number;
  chips?: SearchAndFilterChip[];
  heading?: string;
};
