# Publish NPM package

### Prepare for release

Check out a new release branch from master

```shell
git checkout -b prepare-0.1.1-release master
```

#### Update the changelog

Update CHANGELOG.md, changing the `[Unreleased]` section to the version number from above e.g. `[0.1.1] - 2019-11-06`. Consider looking at `git log` and adding any missed changes.

```shell
git commit -m "Update changelog for 0.1.1."
```

#### Build the docs

Build and Commit the docs for this version.

```shell
yarn build-docs
git commit -m "Build docs for 0.1.1."
```

#### Update the version

- Update the version using the next [sensible version](https://semver.org/spec/v2.0.0.html).

```shell
yarn version --new-version [0.1.1]
```

#### Push

Push your branch to GitHub, create a PR and land it (this might require approval).

### Publish to NPM

Get a fresh copy of master

```shell
git clone git@github.com:canonical-web-and-design/react-components.git react-components-release
```

Build and publish the package.

```shell
cd react-components-release
npm publish --access public
```

You should now see the new version on [NPM](https://www.npmjs.com/package/@canonical/react-components)

### Tag the release

- Get the released package link.

```shell
npm view @canonical/react-components dist.tarball
```

Download the package from the link.

Create a [new release](https://github.com/canonical-web-and-design/react-components/releases/new) on GitHub, remembering to:

- Add the tag against against the correct commit using the new version number.
- Copy the [changelog](https://raw.githubusercontent.com/canonical-web-and-design/react-components/master/CHANGELOG.md) section for this release into the description.
- Upload the package (downloaded above).
