export type SearchAndFilterChip = {
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
