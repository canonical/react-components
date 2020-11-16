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
yarn link
```

...this will add the project to a local yarn registry.

Switching back to the project you are developing, run;

```shell
yarn link @canonical/react-components
yarn install
```

...to pull the linked project from the local registry. If you now run `yarn build-watch` in your `react-components` folder, your project should pick up any changes on refresh or hot module reload.

### Known issue: Invalid hook call (Issue [#327](https://github.com/canonical-web-and-design/react-components/issues/327))

If you have followed the instructions above and see an "Invalid hooks call" in your local project, it's probably because your project is now trying to run two different versions of React.

To work around this, you'll also have to do the following to link `react` and `react-dom` in this project to the local registry;

```
cd react-components
yarn install
cd node_modules/react
yarn link
cd ../../node_modules/react-dom
yarn link
cd YOUR_PROJECT
yarn link react
yarn link react-dom
```

**Note:** When you're finished working locally - don't forget to go back and unlink;

```
cd react-components
yarn unlink
cd node_modules/react
yarn unlink
cd ../../node_modules/react-dom
yarn unlink
cd YOUR_PROJECT
yarn unlink @canonical/react-components
yarn link react
yarn link react-dom
```
