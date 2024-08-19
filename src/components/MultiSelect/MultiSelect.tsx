import type { ReactNode } from "react";
import React, { useEffect, useId, useMemo, useState } from "react";

import "./MultiSelect.scss";
import {
  Button,
  CheckboxInput,
  SearchBox,
  useClickOutside,
  useOnEscapePressed,
} from "../../index";

import { FadeInDown } from "./FadeInDown";

export type MultiSelectItem = {
  label: string;
  value: string | number;
  group?: string;
};

export type MultiSelectProps = {
  disabled?: boolean;
  error?: string;
  selectedItems?: MultiSelectItem[];
  help?: string;
  label?: string | null;
  listSelected?: boolean;
  onDeselectItem?: (item: MultiSelectItem) => void;
  onItemsUpdate?: (items: MultiSelectItem[]) => void;
  onSelectItem?: (item: MultiSelectItem) => void;
  placeholder?: string;
  required?: boolean;
  items: MultiSelectItem[];
  disabledItems?: MultiSelectItem[];
  renderItem?: (item: MultiSelectItem) => ReactNode;
  dropdownHeader?: ReactNode;
  dropdownFooter?: ReactNode;
  showDropdownFooter?: boolean;
  variant?: "condensed" | "search";
};

type ValueSet = Set<MultiSelectItem["value"]>;
type GroupFn = (
  items: Parameters<typeof getGroupedItems>[0]
) => ReturnType<typeof getGroupedItems>;
type SortFn = typeof sortAlphabetically;
type MultiSelectDropdownProps = {
  isOpen: boolean;
  items: MultiSelectItem[];
  selectedItems: MultiSelectItem[];
  disabledItems: MultiSelectItem[];
  header?: ReactNode;
  updateItems: (newItems: MultiSelectItem[]) => void;
  onDeselectItem?: (item: MultiSelectItem) => void;
  onSelectItem?: (item: MultiSelectItem) => void;
  footer?: ReactNode;
  groupFn?: GroupFn;
  sortFn?: SortFn;
  shouldPinSelectedItems?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const sortAlphabetically = (a: MultiSelectItem, b: MultiSelectItem) => {
  return a.label.localeCompare(b.label, "en", { numeric: true });
};

const createSortSelectedItems =
  (previouslySelectedItemValues: ValueSet) =>
  (a: MultiSelectItem, b: MultiSelectItem) => {
    if (previouslySelectedItemValues) {
      const aIsPreviouslySelected = previouslySelectedItemValues.has(a.value);
      const bIsPreviouslySelected = previouslySelectedItemValues.has(b.value);
      if (aIsPreviouslySelected && !bIsPreviouslySelected) return -1;
      if (!aIsPreviouslySelected && bIsPreviouslySelected) return 1;
    }
    return 0;
  };

const getGroupedItems = (items: MultiSelectItem[]) => {
  const groups = new Map<string, MultiSelectItem[]>();

  items.forEach((item) => {
    const group = item.group || "Ungrouped";
    const groupItems = groups.get(group) || [];
    groupItems.push(item);
    groups.set(group, groupItems);
  });

  return Array.from(groups, ([group, items]) => ({ group, items }));
};

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  items,
  selectedItems,
  disabledItems,
  header,
  updateItems,
  onSelectItem,
  onDeselectItem,
  isOpen,
  footer,
  sortFn = sortAlphabetically,
  groupFn = getGroupedItems,
  ...props
}: MultiSelectDropdownProps) => {
  const selectedItemValues = useMemo(
    () => new Set(selectedItems.map((item) => item.value)),
    [selectedItems]
  );
  const disabledItemValues = useMemo(
    () => new Set(disabledItems.map((item) => item.value)),
    [disabledItems]
  );
  const [previouslySelectedItemValues, setPreviouslySelectedItemValues] =
    useState<ValueSet>(new Set(selectedItemValues));

  useEffect(() => {
    if (isOpen) {
      setPreviouslySelectedItemValues(new Set(selectedItemValues));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const hasGroup = useMemo(() => items.some((item) => item.group), [items]);
  const groupedItems = useMemo(
    () => (hasGroup ? groupFn(items) : [{ group: "Ungrouped", items }]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, groupFn]
  );
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const foundItem = items.find((item) => `${item.value}` === value);
    if (foundItem) {
      const newSelectedItems = checked
        ? [...selectedItems, foundItem]
        : selectedItems.filter((item) => `${item.value}` !== value) ?? [];
      updateItems(newSelectedItems);
      if (checked) {
        onSelectItem?.(foundItem);
      } else {
        onDeselectItem?.(foundItem);
      }
    }
  };

  return (
    <FadeInDown isVisible={isOpen}>
      <div className="multi-select__dropdown" role="listbox" {...props}>
        {header ? header : null}
        {groupedItems.map(({ group, items }) => (
          <div className="multi-select__group" key={group}>
            {hasGroup ? (
              <h5 className="multi-select__dropdown-header">{group}</h5>
            ) : null}
            <ul className="multi-select__dropdown-list" aria-label={group}>
              {items
                .sort(sortFn)
                .sort(createSortSelectedItems(previouslySelectedItemValues))
                .map((item) => (
                  <li key={item.value} className="multi-select__dropdown-item">
                    <CheckboxInput
                      disabled={disabledItemValues.has(item.value)}
                      label={item.label}
                      checked={selectedItemValues.has(item.value)}
                      value={item.value}
                      onChange={handleOnChange}
                      key={item.value}
                    />
                  </li>
                ))}
            </ul>
          </div>
        ))}
        {footer ? <div className="multi-select__footer">{footer}</div> : null}
      </div>
    </FadeInDown>
  );
};

/**
 * Component allowing to select multiple items from a list of options.
 *
 * `MultiSelectDropdown` displays the dropdown with options which are grouped and sorted alphabetically.
 * `SearchBox` or `Button` is used to trigger the dropdown depending on the variant.
 */
export const MultiSelect: React.FC<MultiSelectProps> = ({
  disabled,
  selectedItems: externalSelectedItems = [],
  label,
  listSelected = true,
  onItemsUpdate,
  onSelectItem,
  onDeselectItem,
  placeholder,
  required = false,
  items = [],
  disabledItems = [],
  dropdownHeader,
  dropdownFooter,
  showDropdownFooter = true,
  variant = "search",
}: MultiSelectProps) => {
  const wrapperRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
    setFilter("");
  });
  useOnEscapePressed(() => {
    setIsDropdownOpen(false);
    setFilter("");
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!isDropdownOpen) {
      setFilter("");
    }
  }, [isDropdownOpen]);

  const [internalSelectedItems, setInternalSelectedItems] = useState<
    MultiSelectItem[]
  >([]);
  const selectedItems = externalSelectedItems || internalSelectedItems;

  const updateItems = (newItems: MultiSelectItem[]) => {
    const uniqueItems = Array.from(new Set(newItems));
    setInternalSelectedItems(uniqueItems);
    onItemsUpdate && onItemsUpdate(uniqueItems);
  };

  const dropdownId = useId();
  const inputId = useId();
  const selectedItemsLabel = selectedItems
    .filter((selectedItem) =>
      items.some((item) => item.value === selectedItem.value)
    )
    .map((el) => el.label)
    .join(", ");
  let footer: ReactNode = null;
  if (showDropdownFooter) {
    footer = dropdownFooter ? (
      dropdownFooter
    ) : (
      <>
        <Button
          appearance="link"
          onClick={() => {
            const enabledItems = items.filter(
              (item) =>
                !disabledItems.some(
                  (disabledItem) => disabledItem.value === item.value
                )
            );
            updateItems([...selectedItems, ...enabledItems]);
          }}
          type="button"
        >
          Select all
        </Button>
        <Button
          appearance="link"
          onClick={() => {
            const disabledSelectedItems = selectedItems.filter((item) =>
              disabledItems.some(
                (disabledItem) => disabledItem.value === item.value
              )
            );
            updateItems(disabledSelectedItems);
          }}
          type="button"
        >
          Clear
        </Button>
      </>
    );
  }
  return (
    <div ref={wrapperRef}>
      <div className="multi-select">
        {variant === "search" ? (
          <SearchBox
            externallyControlled
            aria-controls={dropdownId}
            aria-expanded={isDropdownOpen}
            id={inputId}
            role="combobox"
            aria-label={label || placeholder || "Search"}
            disabled={disabled}
            autoComplete="off"
            onChange={(value) => {
              setFilter(value);
              // reopen if dropdown has been closed via ESC
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder={placeholder ?? "Search"}
            required={required}
            type="text"
            value={filter}
            className="multi-select__input"
          />
        ) : (
          <button
            role="combobox"
            type="button"
            aria-label={label || placeholder || "Select items"}
            aria-controls={dropdownId}
            aria-expanded={isDropdownOpen}
            className="multi-select__select-button"
            onClick={() => {
              setIsDropdownOpen((isOpen) => !isOpen);
            }}
          >
            <span className="multi-select__condensed-text">
              {listSelected && selectedItems.length > 0
                ? selectedItemsLabel
                : placeholder ?? "Select items"}
            </span>
          </button>
        )}
        <MultiSelectDropdown
          id={dropdownId}
          isOpen={isDropdownOpen}
          items={
            filter.length > 0
              ? items.filter((item) =>
                  item.label.toLowerCase().includes(filter.toLowerCase())
                )
              : items
          }
          selectedItems={selectedItems}
          disabledItems={disabledItems}
          header={dropdownHeader}
          updateItems={updateItems}
          onSelectItem={onSelectItem}
          onDeselectItem={onDeselectItem}
          footer={footer}
        />
      </div>
    </div>
  );
};
