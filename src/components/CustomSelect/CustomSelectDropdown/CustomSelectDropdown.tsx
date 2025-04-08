import React, {
  FC,
  KeyboardEvent,
  LiHTMLAttributes,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { useListener } from "hooks";
import SearchBox from "components/SearchBox";

export type CustomSelectOption = LiHTMLAttributes<HTMLLIElement> & {
  value: string;
  label: ReactNode;
  // text used for search, sort and display in toggle button
  // text must be provided if label is not a string
  text?: string;
  disabled?: boolean;
};

export type Props = {
  searchable?: "auto" | "always" | "never";
  name: string;
  options: CustomSelectOption[];
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  onClose: () => void;
  header?: ReactNode;
  toggleId: string;
};

const DROPDOWN_MAX_HEIGHT = 16 * 30; // 30rem with base 16px
const DROPDOWN_MARGIN = 20;

export const adjustDropdownHeightBelow = (dropdown: HTMLUListElement) => {
  const dropdownRect = dropdown.getBoundingClientRect();
  const dropdownHeight = dropdown.offsetHeight;
  const viewportHeight = window.visualViewport?.height || window.innerHeight;

  // If the dropdown is cut off at the bottom of the viewport
  // adjust the height to fit within the viewport minus fixed margin.
  // This usually becomes an issue when the dropdown is at the bottom of the viewport or screen getting smaller.
  if (dropdownRect.bottom >= viewportHeight) {
    const adjustedHeight =
      dropdownHeight - dropdownRect.bottom + viewportHeight - DROPDOWN_MARGIN;
    dropdown.style.height = `${adjustedHeight}px`;
    dropdown.style.maxHeight = `${adjustedHeight}px`;
    return;
  }

  // If the dropdown does not have overflow, the dropdown should fit its content.
  const hasOverflow = dropdown.scrollHeight > dropdown.clientHeight;
  if (!hasOverflow) {
    dropdown.style.height = "auto";
    dropdown.style.maxHeight = "";
    return;
  }

  // If the dropdown is not cut off at the bottom of the viewport
  // adjust the height of the dropdown so that its bottom edge is 20px from the bottom of the viewport
  // until the dropdown max height is reached.
  const adjustedHeight = Math.min(
    viewportHeight - dropdownRect.top - DROPDOWN_MARGIN,
    DROPDOWN_MAX_HEIGHT,
  );
  dropdown.style.height = `${adjustedHeight}px`;
  dropdown.style.maxHeight = `${adjustedHeight}px`;
};

export const adjustDropdownHeightAbove = (
  dropdown: HTMLUListElement,
  search: HTMLInputElement | null,
) => {
  // The search height is subtracted (if necessary) so that no options will be hidden behind the search input.
  const searchRect = search?.getBoundingClientRect();
  const searchHeight = searchRect?.height || 0;
  const dropdownRect = dropdown.getBoundingClientRect();

  // If the dropdown does not have overflow, do not adjust.
  const hasOverflow = dropdown.scrollHeight > dropdown.clientHeight;
  if (!hasOverflow) {
    dropdown.style.height = "auto";
    dropdown.style.maxHeight = "";
    return;
  }

  // adjust the height of the dropdown so that its top edge is 20px from the top of the viewport.
  // until the dropdown max height is reached.
  // unlike the case where the dropdown is bellow the toggle, dropdown.bottom represents the available space above the toggle always.
  // this makes the calculation simpler since we only need to work with dropdown.bottom regardless if the element is cut off or not.
  const adjustedHeight = Math.min(
    dropdownRect.bottom - searchHeight - DROPDOWN_MARGIN,
    DROPDOWN_MAX_HEIGHT,
  );
  dropdown.style.height = `${adjustedHeight}px`;
  dropdown.style.maxHeight = `${adjustedHeight}px`;
};

export const dropdownIsAbove = (dropdown: HTMLUListElement) => {
  const toggle = document.querySelector(
    ".p-custom-select__toggle",
  ) as HTMLElement;
  const dropdownRect = dropdown.getBoundingClientRect();
  const toggleRect = toggle.getBoundingClientRect();
  return toggleRect.top >= dropdownRect.bottom;
};

export const adjustDropdownHeight = (
  dropdown: HTMLUListElement | null,
  search: HTMLInputElement | null,
) => {
  if (!dropdown) {
    return;
  }

  if (dropdownIsAbove(dropdown)) {
    adjustDropdownHeightAbove(dropdown, search);
    return;
  }

  adjustDropdownHeightBelow(dropdown);
};

export const getOptionText = (option: CustomSelectOption): string => {
  if (option.text) {
    return option.text;
  }

  if (typeof option.label === "string") {
    return option.label;
  }

  throw new Error(
    "CustomSelect: options must have a string label or a text property",
  );
};

const CustomSelectDropdown: FC<Props> = ({
  searchable,
  name,
  options,
  onSelect,
  onSearch,
  onClose,
  header,
  toggleId,
}) => {
  const [search, setSearch] = useState("");
  // track highlighted option index for keyboard actions
  const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(0);
  // use ref to keep a reference to all option HTML elements so we do not need to make DOM calls later for scrolling
  const optionsRef = useRef<HTMLLIElement[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownListRef = useRef<HTMLUListElement>(null);
  const isSearchable =
    searchable !== "never" &&
    options.length > 1 &&
    (searchable === "always" || (searchable === "auto" && options.length >= 5));

  useEffect(() => {
    if (dropdownRef.current) {
      const toggle = document.getElementById(toggleId);

      // align width with wrapper toggle width
      const toggleWidth = toggle?.getBoundingClientRect()?.width ?? 0;
      dropdownRef.current.style.setProperty("min-width", `${toggleWidth}px`);
    }

    setTimeout(() => {
      if (isSearchable) {
        searchRef.current?.focus();
        return;
      }

      dropdownRef.current?.focus();
    }, 100);
  }, [isSearchable, toggleId]);

  const handleResize = () => {
    adjustDropdownHeight(dropdownListRef.current, searchRef.current);
  };

  useLayoutEffect(handleResize, []);
  useListener(window, handleResize, "resize");

  // track selected index from key board action and scroll into view if needed
  useEffect(() => {
    optionsRef.current[highlightedOptionIndex]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  }, [highlightedOptionIndex]);

  const filteredOptions = onSearch
    ? options
    : options?.filter((option) => {
        if (!search || option.disabled) return true;
        const searchText = getOptionText(option) || option.value;
        return searchText.toLowerCase().includes(search);
      });

  const getNextOptionIndex = (goingUp: boolean, prevIndex: number) => {
    const increment = goingUp ? -1 : 1;
    let currIndex = prevIndex + increment;
    // skip disabled options for key board action
    while (filteredOptions[currIndex] && filteredOptions[currIndex]?.disabled) {
      currIndex += increment;
    }

    // consider upper bound for navigating down the list
    if (increment > 0) {
      return currIndex < filteredOptions.length ? currIndex : prevIndex;
    }

    // consider lower bound for navigating up the list
    return currIndex >= 0 ? currIndex : prevIndex;
  };

  // handle keyboard actions for navigating the select dropdown
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const upDownKeys = ["ArrowUp", "ArrowDown"];

    // prevent default browser actions for up, down, enter and escape keys
    // also prevent any other event listeners from being called up the DOM tree
    if ([...upDownKeys, "Enter", "Escape", "Tab"].includes(event.key)) {
      event.preventDefault();
      event.nativeEvent.stopImmediatePropagation();
    }

    if (upDownKeys.includes(event.key)) {
      setHighlightedOptionIndex((prevIndex) => {
        const goingUp = event.key === "ArrowUp";
        return getNextOptionIndex(goingUp, prevIndex);
      });
    }

    if (event.key === "Enter" && filteredOptions[highlightedOptionIndex]) {
      onSelect(filteredOptions[highlightedOptionIndex].value);
    }

    if (event.key === "Escape" || event.key === "Tab") {
      onClose();
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value.toLowerCase());
    // reset selected index when search text changes
    setHighlightedOptionIndex(0);
    optionsRef.current = [];

    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSelect = (option: CustomSelectOption) => {
    if (option.disabled) {
      return;
    }

    onSelect(option.value);
  };

  const optionItems = filteredOptions.map((option, idx) => {
    return (
      <li
        key={`${option.value}-${idx}`}
        onClick={() => handleSelect(option)}
        className={classnames(
          "p-list__item",
          "p-custom-select__option",
          "u-truncate",
          {
            disabled: option.disabled,
            highlight: idx === highlightedOptionIndex && !option.disabled,
          },
        )}
        // adding option elements to a ref array makes it easier to scroll the element later
        // else we'd have to make a DOM call to find the element based on some identifier
        ref={(el) => {
          if (!el) return;
          optionsRef.current[idx] = el;
        }}
        role="option"
        onMouseMove={() => setHighlightedOptionIndex(idx)}
      >
        <span
          className={classnames({
            "u-text--muted": option.disabled,
          })}
        >
          {option.label}
        </span>
      </li>
    );
  });

  return (
    <div
      className="p-custom-select__dropdown u-no-padding"
      role="combobox"
      onKeyDownCapture={handleKeyDown}
      // allow focus on the dropdown so that keyboard actions can be captured
      tabIndex={-1}
      ref={dropdownRef}
      onMouseDown={(e) => {
        // when custom select is used in a modal, which is a portal, a dropdown click
        // should not close the modal itself, so we stop the event right here.
        e.stopPropagation();
      }}
    >
      {isSearchable && (
        <div className="p-custom-select__search u-no-padding--bottom">
          <SearchBox
            ref={searchRef}
            id={`select-search-${name}`}
            name={`select-search-${name}`}
            type="text"
            aria-label={`Search for ${name}`}
            className="u-no-margin--bottom"
            onChange={handleSearch}
            value={search}
            autocomplete="off"
          />
        </div>
      )}
      {header}
      <ul
        className="p-list u-no-margin--bottom"
        role="listbox"
        ref={dropdownListRef}
      >
        {optionItems}
      </ul>
    </div>
  );
};

export default CustomSelectDropdown;
