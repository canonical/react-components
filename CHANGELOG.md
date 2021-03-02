# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# [Unreleased]

### Added

### Changed

- Added support for `aria-pressed` in the ContextualMenu button

### Removed

# 0.16.0 - 2021-02-17

### Added

- Added new `CodeSnippet` component, the `Code` component is considered deprecated.

### Changed

- Updated `ActionButton` to use `is-processing` classname instead of deprecated `is-active`.
- Updated Vanilla to 2.24.0

### Deprecated

- `Code` component is deprecated. Use `CodeSnippet` component or inline `<code>` instead.

### Removed

- Removed `p-action-button` class from `ActionButton`, as this is not a separate pattern in Vanilla. If any additional classname needs to be provided for custom styling it can be added via `className` prop.

# 0.15.0 - 2021-02-02

### Added

- Added `classNames` prop to Icon component

### Changed

- Removed custom styling from Spinner component
- Migrated Modal to TypeScript. The `close` and `title` props are now optional, and the title and close button are not shown if the props aren't provided. Added a `buttonRow` prop to display the modal buttons if provided.
- Migrated Tabs to TypeScript. Added `component` prop to allow for setting the element or component to use for the tab.

### Removed

- Removed `inline` prop from Spinner component. Any additional spacing for Spinner should be provided by parent wrapper.

# 0.14.3 - 2021-01-20

### Added

### Changed

- Removed custom styling from SummaryButton component
- Removed custom styling from ActionButton component
- Improved docs for SearchAndFilter
- Run Percy on CircleCI
- Updated Vanilla to 2.22.0
- Update React (and related dependencies) to v17
- Update dependency node-sass to v5

### Removed

# 0.14.2 - 2020-11-18

### Changed

- Bug fixes for Search and Filter
- Added instructions for developing using this lib as a local dependency

# 0.14.1 - 2020-11-04

### Changed

- Replaced uuid with nanoid.
- Decouple ContextualMenu from SearchAndFilter
- Remove CSSTransition component/dep
- Make Vanilla Framework a peer dependency

# 0.14.0 - 2020-10-27

### Added

### Changed

- Updated expanding MainTable to use aria-hidden instead of .u-hide utility class
- Updated Vanilla framework to version 2.19.2
- Added `positionElementClassName` prop to allow class names to be passed to the position element for the Tooltip component.
- Bug fixes to Search and Filter component

### Removed

- Removed custom styling for u-hide utility in ModularTable (as this is currently fixed upstream in Vanilla)

# 0.13.0 - 2020-10-08

### Added

- Added new SummaryButton component

### Changed

- Only pass Slider id prop to range input, not to number input

### Removed

# 0.12.0 - 2020-09-28

### Added

- Icon component

### Changed

- Updated ModularTable component to support showing icons in cells
- Updated ModularTable component to support empty state message
- The toggle button for ContextualMenu now has `type="button"` to prevent it from submitting forms.

### Removed

# 0.11.1 - 2020-09-25

### Changed

- Update Button and ContextualMenu types to allow for passing a custom component.

# 0.11.0 - 2020-09-23

### Changed

- BUGFIX: The SearchBox styling has been fixed and the component no longer shows up as ForwardRef.
- Vanilla has been updated to 2.19.0.
- ModularTable has updated the `columns.accessor` prop to be either a string or getter function.
- ContextualMenu has been rebuilt with many new features (ported from maas-ui).

# 0.10.0 - 2020-09-18

### Added

- Added ModularTable component.
- Added a11y StoryBook plugin.

### Changed

- Added search with pattern matching functionality to the SearchAndFilter component.
- Updated Tooltip component to automatically adjust tooltip position to keep it on screen.
- Migrated table components to TypeScript.
- Updated to Vanilla 2.18.0.

### Removed

# [0.9.0] - 2020-08-25

### Added

- Added Slider component.
- Added a takeFocus prop to Input, Select and Textarea which sets the focus to the input on first render.

### Changed

- Updated the caution, error, success and help props for Input, Select and Textarea to be of type `node`.
- Update Chip to be dismissible inside a text input and make them truncatable.
- Updated to Vanilla 2.16.0.
- Storybook stories updated to use Controls.
- Storybook theme updated with Vanilla colours.
- CRA replaced with manual setup.

### Removed

## [0.8.1] - 2020-07-16

### Changed

Transpile both js and ts with @babel/plugin-typescript, but use tsc for generating declarations.

## [0.8.0] - 2020-07-16

### Added

- Added `titleElement` prop to Accordion component to allow rendering title headings for accordion tabs.

### Changed

- Migrated project to TypeScript.

### Removed

## [0.7.0] - 2020-04-24

### Added

### Changed

- Renamed the Loader component to Spinner. https://github.com/canonical-web-and-design/react-components/issues/36
- Update the wrapping element of Spinner to allow it to be used in paragraphs. https://github.com/canonical-web-and-design/react-components/issues/111

### Removed

## [0.6.0] - 2020-04-02

### Added

- Accordion now supports handling expanded sections using external state.
- Added `yarn build-watch` to watch and build files when developing locally.
- Added `yarn link-package` and `yarn unlink-package` to improve developing against another project.

## [0.5.0] - 2020-04-01

### Changed

- Upgrade Vanilla Framework to 2.9.0.
- Added click event props to Accordion.

## [0.4.0] - 2020-03-11

### Added

- Added docs for developing and publishing the project.
- Added percy snapshotting.

### Changed

- Corrected the aria-multiselectable prop on the accordion.
- Updated SearchBox to be a controlled input when needed.

### Removed

## [0.3.1] - 2020-01-20

### Added

- Added empty state to MainTable component.

## [0.3.0] - 2019-12-09

### Added

- The Button component now supports is-dense.
- User supplied Button classes are now inserted after those added by the component.

## [0.2.2] - 2019-12-05

### Changed

- Fix issue where notification timeout handler was not called.
- Ensure only required files are included in npm package.
- Remove non-functional `yarn start` script.

## [0.2.1] - 2019-11-07

### Changed

- Correctly pass click events to buttons.

## [0.2.0] - 2019-11-06

### Added

- Built docs for GitHub pages.
- ./run script.
- Renovate config.

### Changed

- Fixed peer dependencies key.
- Update Button to correctly disable the component when the element is an anchor.

## [0.1.0] - 2019-11-03

### Added

- A large number of Vanilla React components.
- Storybook docs.
