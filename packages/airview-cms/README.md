# Airview CMS ReadMe

Airview CMS is a React based client side content management system framework to allow CRU~~D~~ workflow for GitHub persisted Markdown documentation.

## The concept

**For the end user, Airview CMS is:**

1. A WYSIWYG editing experience, which allows the creation and editing of Markdown documentation (body and frontmatter)
2. A simplified interface to allow the persistence of markdown content using a gitflow workflow (commit, branch and checkout)

**For the engineer, Airview CMS is:**

1. A flexible React CMS, it can suit the needs of any project via a provided configuration
2. A set of React hooks, these simplify the request of CMS data from the remote repository
3. A React components for inline, real-time WYSIWYG markdown editing

### Collections

Airview CMS groups markdown content into collections; a collection defines the shape of the data for a specific markdown file (its frontmatter).

### Entries

Entries are markdown files, the AirviewCMS API will break an entry into two parts: the meta, which is the markdown frontmatter and the body, which is the main body of the markdown file.

## Installation

The package can be installed via npm, within your working directory run:

```bash
npm i airview-cms
```

**Note:** A requirement for the project is node.js LTS, currently greater that version 16.15.1 but less than version 17.0.0

## Setup and Configuration

To begin using Airview CMS, you must wrap you application with the `AirviewCMS` component and pass a config file as a prop.

### Mounting the AirviewCMS component

The `AirviewCMS` component should remain mounted for the entire lifecyle of you app, it is therefore recommended you place this component at the root of your application tree.

Airview CMS provides the context for the various utility hooks, which can be called from any component that is a direct child of the `AirviewCMS` component.

**Example:**

```jsx
import React from "react";
import { AirviewCMS } from "airview-cms";

function App() {
  return <AirviewCMS config={config}>{/* children */}</AirviewCMS>;
}
```

### The AirviewCMS component config

The `AirviewCMS` component requires a configuration object, this is used to personalise the gitflow workflow and define your collections frontmatter. You may find it helpful to refer to the [airview-demo config](https://github.com/AirWalk-Digital/airview/blob/main/apps/airview-demo/src/config.js) for an example of how this works.

### Base Branch

_This setting is required_

The `baseBranch` allows the CMS to correctly read data from your GitHub repo when in non-edit mode.

The key should be a string value, set to the working branch of your GitHub repo.

**Example:**

```javascript
const config = {
  baseBranch: "main",
};
```

### Collections

_This setting is required_

The `collections` object allows the CMS to present the correct UI fields to a user for creation and editing of markdown frontmatter.

The key should be an object of keyed collections, set to the desired collection name. Each collection should contain two values:

- `label`: A human readable string representation of the collection name, used within the CMS UI
- `fields`: An array of available CMS fields, used to dynamically generate a UI to capture data for markdown frontmatter using widgets. See below for a detailed descrption

**Example:**

```javascript
const config = {
  collections: {
    coffee: {
      label: "Coffee",
      fields: [
        {
          label: "Price",
          name: "price",
          widget: "string",
        },
        {
          label: "In Stock",
          name: "in_stock",
          defaultValue: false,
          widget: "boolean",
        },
      ],
    },
  },
};
```

#### Collection Fields

_This setting is required_

The collection `fields` key is used to define the frontmatter you want to capture from a user, if no frontmatter is required for the collection, pass an empty array.

The key should be an object containing the following values:

- `label`: A human readable label for the frontmatter field
- `name`: A unique value, used to set the YAML frontmatter key
- `widget`: A string value equal to the required airview-cms widget for the field. See below for detailed information on available widgets.

**Note:** Additional key values for the field will be required based on the chosen widget, for example `defaultValue` when using the `boolean` widget

#### Collection Field Widgets

A number of widgets are availble for specific data capture requirements:

##### String Widget

The string widget is used to capture a string input from a user (not multiline input). You can include the string widget within your collection field by passing `string` as the value to the `widget` key.

- **Name:** `string`
- **UI:** Text input
- **Data type:** string
- **Options:**
- - `label`: string - A human readable label for the UI - _required_
- - `placeholder`: string - An optional placeholder value for when the text area has no input value from a user

**Example:**

```javascript
{
  label: "Price",
  name: "price",
  widget: "string",
  placeholder: "Enter a price for this product"
}
```

### Hooks

### Components

## Contributing to the package
