# Airview UI

Airview UI is a collection of React UI components; these components can be composed to build an interface to render an application, which allows a user to navigate to specific Markdown documents.

## Consuming the package

Currently the package is not published to npm, you will therefore need to: [INSERT SOLUTION HERE]

### Peer dependencies

The package has a peer dependency of [Material UI](https://mui.com/), the components of this package are built on-top of this library.

### Airview UI Theme Provider

To start using the `airview-ui` components, you must first wrap your application in an instance of `<AirviewUiThemeProvider />` to provide required styling context.

The `<AirviewUiThemeProvider />` component is an extension of the native Material UI [theme provider](https://mui.com/material-ui/customization/theming/#theme-provider); it accepts an optional `themeConfig` prop, which is an object as per the agument of the native Material UI [createTheme() function](https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme).

**Usage:**

```jsx
import { AirviewUiThemeProvider } from "airview-ui";

const config = {
  // ... your optional MUI config options
};

function App() {
  return (
    <AirviewUiThemeProvider themeConfig={config}>
      {/*child components */}
    </AirviewUiThemeProvider>
  );
}
```

### Component API

Airview UI provides a base set of components that will allow you to compose an opinionated documentation viewer interface. An example of all components and the props API can be viewed via the StoryBook living documentation.

**To view the StoryBook:**

1. Start by checking out `main` branch at [https://github.com/AirWalk-Digital/airview](https://github.com/AirWalk-Digital/airview)
2. Once cloned, `cd` into the root of the `airview` project directory and run `npm install` to install all package dependencies
3. On successfull installation of project dependencies, `cd` into the `airview-ui` package and run `npm run storybook`. This will start Storybook and provide a local URL to access the StoryBook from within your chosen browser.

**Note:** A requirement for building StoryBook is node.js LTS, currently greater that version 16.15.1 but less than version 17.0.0.

## Contributing to the package

### Cloning the package for local development

Airview UI is part of a monorepo and therefore needs to be checked out from the root Airview repository. See the main README for instructions on how to do this [here](https://github.com/AirWalk-Digital/airview#cloning-the-monorepo-for-local-development)

### Tooling

Global development tooling is available for the package, you can learn more about this [here](https://github.com/AirWalk-Digital/airview#tooling)

### Build scripts

npm scripts are available for development and production builds, these call [Rollup](https://rollupjs.org/guide/en/) to bundle our source. **Note:** these scripts are local and should be run from a terminal mounted at the root of the `airview-ui` directory.

**Building for production:**

To build / package the source for production, run the npm script below. This will output a bundle `index.js` to a `dist` directory within the `airview-ui` package root.

```bash
npm run build
```

**Building for development:**

For development, a build script is available that will bundle the source in watch mode; you can continue to work on the package source and the bundle will be automatically rebuilt each time a file within the `dist` directory is modified.

**Note:** the bundle within the `dist` directory SHOULD NOT be deployed to production.

To build for development run

```bash
npm run dev
```

### Peer dependencies

All peer dependencies should be manually added to the `peerDependencies` key within the `package.json` file in the `airview-ui` root. Only dev dependencies should be added using the `npm install` command.

To optimise the bundle size, peer dependencies need to be flagged within `rollup.config.js` file, under the `external` array. This will prevent the peer dependency source from being bundled into the package source.

You can learn more about declaring external dependencies within a Rollup config [here](https://rollupjs.org/guide/en/#peer-dependencies)

### Additional requrements for contributing

The current requirements around contributing are fairly loose; however we do enforce a few requirements. You can learn more about these requirements [here](https://github.com/AirWalk-Digital/airview#contributing).

### Issues, bugs and feature requests

Information on issue tracking and feature requests can be found on the repo root README [here](https://github.com/AirWalk-Digital/airview#issues-bugs-and-feature-requests)
