# Contributing

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

And remember to `yarn test` and `yarn lint`.

## Using with another project

Both projects will need to be running on the same machine/container.

In react-components run:

```shell
yarn install
yarn build
yarn link
```

To prevent [multiple copies of React being loaded](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react) you'll also need to link React:

```shell
cd node_modules/react
yarn link
```

In the project you're working on:

```shell
yarn link "@canonical/react-components"
yarn link "react"
yarn install
```

If using a monorepo you'll need to run those commands at the top level (not inside a workspace).

You'll then need to start you project with yarn, not `./run`.

Then when you're finished run:

```shell
yarn unlink react
yarn unlink "@canonical/react-components"
```

More details on yarn link in the [docs](https://yarnpkg.com/lang/en/docs/cli/link/).

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

