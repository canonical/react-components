# Publish NPM package

### Prepare for release

Check out a new release branch from main branch

```shell
git checkout -b prepare-0.1.1-release main
```

#### Build the docs

Build and Commit the docs for this version.

```shell
yarn build-docs
git add .
git commit -m "Build docs for 0.1.1."
```

#### Update the version

- Update the version using the next [sensible version](https://semver.org/spec/v2.0.0.html).

```shell
yarn version --new-version 0.1.1
```

#### Push

Push your branch to GitHub, create a PR and land it (this might require approval).

### Publish the release

#### Review release notes

Make sure that the [release notes draft](https://github.com/canonical/react-components/releases) created automatically by release-drafter is up to date.

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
