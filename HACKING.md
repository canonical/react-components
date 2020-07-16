# Contributing

## Project info

Canonical `react-components` is developed with [TypeScript](https://www.typescriptlang.org/), but built with `babel` and `@babel/preset-typescript`. Type declarations are generated post build with `tsc`.

## Developing components with Storybook

You can run [Storybook](https://storybook.js.org/) locally to develop new components. You may also need to validate that they work with other projects, in which case see the instructions below.

Run Storybook with [dotrun](https://github.com/canonical-web-and-design/dotrun):

```shell
dotrun
```

Or directly with Yarn:

```shell
yarn install
yarn docs
```

And remember to `dotrun test` and `dotrun lint`.

## Using with another project

Both projects will need to be running on the same machine/container.

In react-components run:

```shell
dotrun link-package
```

You may want to watch and build files as you change them.

```shell
dotrun build-watch
```

This command links React to prevent [multiple copies of React being loaded](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react).

In the project you're working on:

```shell
dotrun clean
dotrun exec yarn link "@canonical/react-components"
dotrun exec yarn link "react"
dotrun exec yarn install
dotrun
```

If using a monorepo you'll need to run those commands at the top level (not inside a workspace).

You'll then need to start you project with yarn, not `./run`.

Then when you're finished, in your project run:

```shell
dotrun exec yarn unlink react
dotrun exec yarn unlink "@canonical/react-components"
```

Then in react-components run:

```shell
dotrun unlink-package
```

If you do not wish do use dotrun then replace dotrun in the command above. Note that you must use dotrun or yarn on one project you must use the same command on the other project so that they both link the same node modules.

## Developing integration tests with cypress

### Running against a local storybook

Start storybook with:

```shell
PORT=<PORT> yarn docs
```

Start the interactive cypress environment with:

```
yarn cypress:open --env port=<PORT>
```

### Running cypress tests in CI

```shell
PORT=<PORT> yarn test-cypress
```
