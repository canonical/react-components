# Publish NPM package

To publish a new react-components release you will need to [update the version](#update-package-version) in package.json and [create a new
release](#publish-the-release). Once the release has been created in GitHub the
package will automatically get built and published to NPM and the docs will get
redeployed (see [publish-on-release.yml](./.github/workflows/publish-on-release.yml)).

If needed, you can also [manually trigger the action](#manually-update-docs) to build the docs if you need this to happen without doing a release.

### Update package version

_Note: If the version in package.json has already been updated you can skip this step._

To update the package version you can follow these steps:

1. Create a new branch.
2. Update the package.json version using `yarn version
--new-version ...`
3. Push your branch and create a PR.

Once the updated version has been merged then move on to [publishing the release](#publish-the-release).

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

### Manually update docs

To rebuild the docs you need to manually trigger the publish action. More
details in the [GitHub docs](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow).

1. Go to the [Publish to NPM and GitHub
   Pages](https://github.com/canonical/react-components/actions/workflows/publish-on-release.yml) action.
2. Click the 'Run workflow' button.
3. Select the `main`` branch.
4. Click 'Run workflow'.

The action should now run, and the docs should get rebuilt.
