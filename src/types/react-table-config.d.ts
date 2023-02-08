// check @types/react-table README for details on this config file:
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-table/Readme.md

import { UseSortByColumnProps } from "react-table";

declare module "react-table" {
  export interface UseTableColumnOptions<D extends Record<string, unknown>>
    extends UseTableColumnOptions<D> {
    className?: string;
    getCellIcon?: (cell: Cell<D>) => string | false;
  }

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnProps<D>,
      UseSortByColumnProps<D> {}
}
