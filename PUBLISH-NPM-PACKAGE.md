# Publish NPM package

### Automatically prepare for release

For most cases, run:

```shell
yarn prepare-release
```

create a PR and land it (this might require approval).

That's it!

By default, the script will assume that the next version is a minor release. If you want to release a patch or major version, you can use the following commands:

```shell
yarn prepare-release:patch
```

```shell
yarn prepare-release:major
```

### Publish the release

#### Review release notes

![publish](https://user-images.githubusercontent.com/11927929/221628635-aba4ac9d-a417-47c4-a9f3-256ecac2bd8b.png)

#### Publish

Publish the [latest release on Github](https://github.com/canonical/react-components/releases) with the new version number and add the release notes you created earlier.

#### Publish to NPM

This should happen automatically after publishing the release on GH (thanks to [GH actions workflow](https://github.com/canonical/react-components/blob/main/.github/workflows/publish-on-release.yml)).

In case it fails and you need to publish manually, here are manual steps:

Get a fresh copy of the main branch

```shell
git clone git@github.com:canonical/react-components.git react-components-release
```

Build and publish the package.

```shell
cd react-components-release
npm publish --access public
```

You should now see the new version on [NPM](https://www.npmjs.com/package/@canonical/react-components)
