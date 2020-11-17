# React components for Vanilla Framework.

This is a collection of components designed to be the way to consume [Vanilla Framework](http://vanillaframework.io) when using React.

## How to use the components

See the [component docs](https://canonical-web-and-design.github.io/react-components/) for usage instructions.

![CI](https://github.com/canonical-web-and-design/react-components/workflows/CI/badge.svg?branch=master)
![Cypress chrome headless](https://github.com/canonical-web-and-design/react-components/workflows/Cypress%20chrome%20headless/badge.svg)

## Requirements

Canonical react components currently require that your build is configured with [sass-loader](https://github.com/webpack-contrib/sass-loader) (or equivalent), to compile sass.

## Install

To use the [NPM package](https://www.npmjs.com/package/@canonical/react-components) do:

```shell
yarn add @canonical/react-components
```

Or if you use NPM:

```shell
npm install @canonical/react-components
```

## Issues

Please file any issues at [GitHub](https://github.com/canonical-web-and-design/react-components/issues).

## Contributing

You might want to:

- [View the source](https://github.com/canonical-web-and-design/react-components) on GitHub.
- Read abut [developing components](https://github.com/canonical-web-and-design/react-components/blob/master/HACKING.md).
- Find out how to [publish to NPM](https://github.com/canonical-web-and-design/react-components/blob/master/PUBLISH-NPM-PACKAGE.md).
- Know how to [publish the docs](https://github.com/canonical-web-and-design/react-components/blob/master/PUBLISHING-DOCS.md) to GitHub Pages.

## Developing locally using this repository

You may wish to link this library directly to your projects while developing locally.

You can do this by cloning this repo to your local workspace;

```shell
git clone https://github.com/canonical-web-and-design/react-components
```

If you then drop into that folder and run;

```shell
yarn run link-packages
```

...this will add this project, `react` and `react-dom` to a local yarn registry.

Switching back to the project you are developing, run;

```shell
yarn install
yarn link @canonical/react
yarn link @canonical/react-dom
yarn link @canonical/react-components
```

...to pull the linked deps from the local registry. If you now run `yarn build-watch` in your `react-components` folder, your project should pick up any changes on refresh or hot module reload.

**Note:** When you're finished working locally - don't forget to go back and unlink;

```
cd react-components
yarn run unlink-packages
```
