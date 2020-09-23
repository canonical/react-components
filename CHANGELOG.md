# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# [Unreleased]

### Added

### Changed

### Removed

# 0.11.0 - 2020-09-23

### Changed

- BUGFIX: The SearchBox styling has been fixed and the component no longer shows up as ForwardRef.
- Vanilla has been updated to 2.19.0.
- ModularTable has updated the `columns.accessor` prop to be either a string or component.
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
