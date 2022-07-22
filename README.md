# Airview

Airview is a client side CMS framework and UI library, its main purpose is to allow an engineer to build a client side React application that will allow a user to Read, Create Edit ~~and Delete~~ Markdown documentation in real-time from a GitHub repository.

## Package overview

This monorepo contains the following packages, more information on each package can be found by following the relevant link to the package README.

### Airview CMS

A client side content management system framework to allow CRU~~D~~ workflow for GitHub persisted Markdown documentation. [Learn more](https://github.com/AirWalk-Digital/airview/tree/main/packages/airview-cms).

### Airview UI

A collection of React UI components; these can be composed to build an interface to render an application, which allows a user to navigate between and view specific Markdown documents. [Learn more](https://github.com/AirWalk-Digital/airview/tree/main/packages/airview-ui)

### Airview Mock Server

A simplified mock instance of `Airview CMS API`, with seed data; this is intended for local development and testing of the `airview-cms` package. [Learn more](https://github.com/AirWalk-Digital/airview/tree/main/packages/airview-mock-server)

### Airview CMS API

[INSERT DESCRIPTION HERE]

### Airview Compliance UI

[INSERT DESCRIPTION HERE]

In addition to the above packages, two demo apps exist, these showcase the composition of the above packages within a working application. As before, more information on each demo can be found by following the relevant link to the demo README.

### Airview Demo

A demonstration of the integration of `airview-ui`, `airview-cms`, `airview-mock-server` and `airview-cms-api` packages. The demo acts as a development environment and an ideal canvas to talk through features or issues, without having to hit a real GitHub repo or GitHub API. [Learn more](https://github.com/AirWalk-Digital/airview/tree/main/apps/airview-demo)

### Airview API Demo

[INSERT DESCRIPTION HERE]

## Cloning the monorepo for local development

The monorepo uses [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces). A requirement for the project is node.js LTS, currently greater that **version 16.15.1** but less than **version 17.0.0**.

1. Start by checking out main at [https://github.com/AirWalk-Digital/airview](https://github.com/AirWalk-Digital/airview)
2. Once cloned, `cd` into the root of the `airview` project directory and run `npm install` to install all package dependencies

## Tooling

As part of the installation process, [husky](https://typicode.github.io/husky/#/) will be installed, this runs pre-commit hooks to:

- Lint staged JavaScript using [eslint](https://eslint.org/). **Note:** this will alert for errors, but not auto fix - you are expected to resolve any flagged errors
- Lint all staged files using [Prettier](https://prettier.io/), to format code to a consistent style, code will be automatically re-written with formatting rules

## Contributing

Currently requirements around contributing are fairly loose; we do aim to ensure all pull requests are of a satisfactory quality, meet the requirements of a given task and don't introduce errors into the production codebase. We've yet to have any automated tasks run for a PR into main, nor do we have any tests; we are solely reliant on the dudiligence of the contributor at this point in time.

### Branching

Branch names should include the GitHub issue ticket number, as should all commits. When a pull request is merged into main, please ensure you delete the branch from remote.

### Pull requests

Our `main` branch is protected; any pull request to `main` will require the review and approval from an authorised reviewer, before a merge can be made.

There is no specific format for pull request information, we would ask that you provide a brief description of the work and use [closing keywords](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) to automate the closure of the related ticket in GitHub issues.

### Versioning releases

Although not yet published to npm, we are attempting to align the project and the packages within using [semvar](https://semver.org/). Ideally this task should be automated, for now we ask that you manually bump the package versions on each pull request to main.

## Issues, bugs and feature requests

We currently track all issues using GitHub issues, you can view these issues at [https://github.com/AirWalk-Digital/airview-issues](https://github.com/AirWalk-Digital/airview-issues). We currently have no specific format on how to write your issue, but ask that you try to be as descriptive as possible.

We use a Kanban board to track the progress of our issues, you can view the board at [https://github.com/orgs/AirWalk-Digital/projects/1](https://github.com/orgs/AirWalk-Digital/projects/1)
