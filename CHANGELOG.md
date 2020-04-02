# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Accordion now supports handling expanded sections using external state.
- Added `yarn build-watch` to watch and build files when developing locally.
- Added `yarn link-package` and `yarn unlink-package` to improve developing against another project.

### Changed

### Removed

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
