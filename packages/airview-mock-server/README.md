# Airview Mock Server

Airview Mock Server provides seed data and mock API endpoints for use with `airview-cms` package. Its intent is to allow:

1. local development, without hitting the real GitHub API
2. A reliable service to facilitate testing

## Installation

The package can be installed via npm, within your working directory run:

```bash
npm i airview-mock-server
```

**Note:** A requirement for the project is node.js LTS, currently greater that version 16.15.1 but less than version 17.0.0

## Setup and Configuration

The package has a dependency of [Mock Service Worker](https://mswjs.io/); documenting MSW package is outside the scope of this README, therefore an understanding of this library is a prerequisite.

### AirviewMockServer

Airview Mock Server exports a function `AirviewMockServer`; this accepts arguments to configue the service and will return the nessesary Mock Service Worker handlers and helper methods

**Signature:**

- **Name:** `airviewMockServer`
- **Arguments:**
- - `delay`: string - delay in milliseconds, defaults to 500 - optional
- - `domain`: string - domain prefix for MSW calls, defaults to null - optional
- **Returns:** `object`
- - `handlers`: array - an array of Mock Service Worker [handlers](https://mswjs.io/docs/basics/request-handler)
- - `resetStore`: function () => void - resets the seed data

**Example:**

```javascript
import { setupWorker } from "msw";
import { AirviewMockServer } from "airview-mock-server";

function initAirviewMockServer() {
  const { handlers } = new AirviewMockServer(500);
  const worker = setupWorker(...handlers);
  worker.start();
}

initAirviewMockServer();
```

## Contributing to the package

Please see our documentation [here](https://github.com/AirWalk-Digital/airview#contributing) for guidance

## Issues, bugs and feature requests

Please see our documentation [here](https://github.com/AirWalk-Digital/airview#issues-bugs-and-feature-requests) for guidance
