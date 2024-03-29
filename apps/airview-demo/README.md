# Airview Demo

Airview Demo provides an integration demo of the following packages:

- `airview-cms`
- `airview-cms-api`
- `airview-compliance-ui`
- `airview-mock-server`
- `airview-ui`

The package is intended to facilitate local development on the above packages and in a future date provide an environment for end-to-end testing.

## Installation

The package is not deployed to npm, it can be added by cloning the root `airview` repo - as per the instructions [here](#239-airview-documentation#cloning-the-monorepo-for-local-development)

**Note:** A requirement for the project is node.js LTS, currently greater that version 16.15.1 but less than version 17.0.0

## Setup and Configuration

Once cloned, cd into the root directory of the `airview-demo` package. You should start by creating a `.env` file with the following contents:

```
REACT_APP_USE_MOCK=true
```

This instructs the demo to use seed data and mock API endpoints from `airview-mock-server` or hit a real GitHub API.

Once the `.env` file has been added, you can start the application in dev mode by running:

```bash
npm run start
```

The package is built on-top of [Create React App](https://create-react-app.dev/) - please refer to their documentation for guidance on tooling and build scripts.

## Using with the airview-api-demo app

Removing the `REACT_APP_USE_MOCK=true` variable from .env will disable calls to the mock server. For develoment, React will need to be configured to point to an endpoint where the api is running. To avoid CORS issues, a proxy will need configuring in package.json as described in [](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

e.g. if you were to run the airview-api-demo locally on port 3001, you would set the proxy like:

```json
  "proxy": "http://localhost:3001"
```

## Contributing to the package

Please see our documentation [here](https://github.com/AirWalk-Digital/airview#contributing) for guidance

## Issues, bugs and feature requests

Please see our documentation [here](https://github.com/AirWalk-Digital/airview#issues-bugs-and-feature-requests) for guidance
