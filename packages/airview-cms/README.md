# Airview CMS

Airview CMS is a React based client side content management system framework to allow CRU~~D~~ workflow for GitHub persisted Markdown documentation.

## The concept

**For the end user, Airview CMS is:**

1. A WYSIWYG editing experience, which allows the creation and editing of Markdown documentation (body and frontmatter)
2. A simplified interface to allow the persistence of markdown content using a gitflow workflow (commit, branch and checkout)

**For the engineer, Airview CMS is:**

1. A flexible React CMS, it can suit the needs of any project via a provided configuration
2. A set of React hooks, these simplify the request of CMS data from the remote repository
3. React components for inline, real-time WYSIWYG markdown editing

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

The `AirviewCMS` component should remain mounted for the entire lifecyle of your app; it is recommended you place this component at the root of your application tree.

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

#### Base Branch

_This setting is required_

The `baseBranch` allows the CMS to correctly read data from your GitHub repo when in non-edit mode.

The key should be a string value, set to the working branch of your GitHub repo.

**Example:**

```javascript
const config = {
  baseBranch: "main",
};
```

#### Collections

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

##### Collection Fields

_This setting is required_

The collection `fields` key is used to define the frontmatter you want to capture from a user, if no frontmatter is required for the collection, pass an empty array.

The key should be an object containing the following values:

- `label`: A human readable label for the frontmatter field
- `name`: A unique value, used to set the YAML frontmatter key
- `widget`: A string value equal to the required airview-cms widget for the field. See below for detailed information on available widgets.

**Note:** Additional key values for the field will be required based on the chosen widget, for example `defaultValue` when using the `boolean` widget

## Field Widgets

A number of widgets are availble for specific data capture requirements:

### String Widget

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

### Boolean Widget

The boolean widget is used to capture a boolean value from a user. You can include the boolean widget within your collection field by passing `boolean` as the value to the `widget` key.

- **Name:** `boolean`
- **UI:** Checkbox input
- **Data type:** boolean
- **Options:**
- - `label`: string - A human readable label for the UI - _required_
- - `defaultValue`: boolean - Sets the default value for the UI - _required_

**Example:**

```javascript
{
  label: "In Stock",
  name: "in_stock",
  defaultValue: false,
  widget: "boolean",
}
```

### Date Widget

The date widget is used to capture a date from a user. You can include the date widget within your collection field by passing `date` as the value to the `widget` key.

- **Name:** `date`
- **UI:** Date select input
- **Data type:** ISO date string
- **Options:**
- - `label`: string - A human readable label for the UI - _required_
- - `defaultValue`: ISO date string - Sets the default value for the UI - _required_
- - `format`: string - Formats the display of the date to the user, pass a valid [Day.js format string](https://day.js.org/docs/en/display/format). Defaults to `DD/MM/YYYY`
- - `minDate`: ISO date string - Sets an optional minimum selectable date.
- - `maxDate`: ISO date string - Sets an optional maximum selectable date.

**Example:**

```javascript
{
  label: "Available From",
  name: "available_from",
  widget: "date",
  minDate: "2022-05-01T00:00:00Z",
  maxDate: "2022-05-31T00:00:00Z",
  defaultValue: "2022-05-01T00:00:00Z",
  format: "DD/MM/YY"
}
```

### Entry Select Widget

The entry select widget is used to select an entry from a specific collection. You can include the entry select widget within your collection field by passing `entrySelect` as the value to the `widget` key.

- **Name:** `entrySelect`
- **UI:** Select Picker UI
- **Data type:** string (entryID)
- **Options:**
- - `label`: string - A human readable label for the UI - _required_
- - `collection`: string - The specific collection key, ued to populate the select picker with the relevant entries for the passed collection - _required_

**Example:**

```javascript
{
  label: "Related Coffee",
  name: "related_coffee",
  widget: "entrySelect",
  collection: "coffee"
}
```

## CMS Context

The core functionality of the CMS is to provide data for a specific markdown document (body and frontmatter). You can choose to get a static representation of this data, or a contextual version. Static data is read only, contextual data allows both read and write.

The recommended approach to writing your app is to identify the current page your user is requesting and set the cms context equal to the entry ID for that page. Once set, the CMS will fetch the data for the given entry ID and setup the CMS to allow editing of the frontmatter and markdown body.

Airview CMS exports a utility hook to allow you to set the CMS context, `useSetCmsContext`. The hook accepts an entryId, which is [collection name]/[entry name]. The hook will return frontmatter for the markdown file, a set of booleans relating to the fetch state of the data and an error object (if applicable).

**Signature:**

- **Hook Name:** `useSetCmsContext`
- **Arguments:** `entryId` - string
- **Returns:** `object`
- - `data` - the frontmatter for the markdown file - object
- - `isUninitialized` - Request to fetch data has not started yet - boolean
- - `isLoading` - Request to fetch data is in flight for the first time - boolean
- - `isFetching` - Request to fetch data is in flight, but might have data from a previous request - boolean
- - `isSuccess` - Request to fetch data is complete and was a success - boolean
- - `isError` - Request to fetch data is complete and was unsuccessful - boolean
- - `error` - Error result, if applicable - unknown

## Routing

AirviewCMS uses [React Router v6](https://reactrouter.com/), it is recommended you use this package for your apps routing too.

## Additional hooks

### useGetAllEntriesMeta

To request frontmatter for all markdown entries call `useGetAllEntriesMeta`. The hook will return an array of entries frontmatter and various status booleans.

**Signature:**

- **Hook Name:** `useGetAllEntriesMeta`
- **Arguments:** none
- **Returns:** `object`
- - `data` - the frontmatter for all markdown entries - array of objects
- - `isUninitialized` - Request to fetch data has not started yet - boolean
- - `isLoading` - Request to fetch data is in flight for the first time - boolean
- - `isFetching` - Request to fetch data is in flight, but might have data from a previous request - boolean
- - `isSuccess` - Request to fetch data is complete and was a success - boolean
- - `isError` - Request to fetch data is complete and was unsuccessful - boolean
- - `error` - Error result, if applicable - unknown

### useGetCollectionEntries

To request frontmatter for all markdown entries of a specific collection call `useGetCollectionEntries`, passing the collection name (key in config) as the argument. The hook will return an array of entries frontmatter and various booleans relating the the status of the data fetching process.

**Signature:**

- **Hook Name:** `useGetCollectionEntries`
- **Arguments:** `collectionName` - string
- **Returns:** `object`
- - `data` - the frontmatter for all markdown entries of the passed collection - array of objects
- - `isUninitialized` - Request to fetch data has not started yet - boolean
- - `isLoading` - Request to fetch data is in flight for the first time - boolean
- - `isFetching` - Request to fetch data is in flight, but might have data from a previous request - boolean
- - `isSuccess` - Request to fetch data is complete and was a success - boolean
- - `isError` - Request to fetch data is complete and was unsuccessful - boolean
- - `error` - Error result, if applicable - unknown

### useGetChildEntriesMeta

To request frontmatter for all markdown entry children of a specific entry call `useGetChildEntriesMeta`, passing the entry ID as the argument (which is [collection name]/[entry name]). The hook will return an array of entries frontmatter and various booleans relating the the status of the data fetching process.

**Signature:**

- **Hook Name:** `useGetChildEntriesMeta`
- **Arguments:** `entryId` - string
- **Returns:** `object`
- - `data` - the frontmatter for all markdown entry children of the passed entryID - array of objects
- - `isUninitialized` - Request to fetch data has not started yet - boolean
- - `isLoading` - Request to fetch data is in flight for the first time - boolean
- - `isFetching` - Request to fetch data is in flight, but might have data from a previous request - boolean
- - `isSuccess` - Request to fetch data is complete and was a success - boolean
- - `isError` - Request to fetch data is complete and was unsuccessful - boolean
- - `error` - Error result, if applicable - unknown

### useGetSiblingEntriesMeta

To request frontmatter for all markdown entry siblings of a specific entry call `useGetSiblingEntriesMeta`, passing the entry ID as the argument (which is [collection name]/[entry name]). The hook will return an array of entries frontmatter and various booleans relating the the status of the data fetching process.

**Signature:**

- **Hook Name:** `useGetSiblingEntriesMeta`
- **Arguments:** `entryId` - string
- **Returns:** `object`
- - `data` - the frontmatter for all markdown entry siblings of the passed entryID - array of objects
- - `isUninitialized` - Request to fetch data has not started yet - boolean
- - `isLoading` - Request to fetch data is in flight for the first time - boolean
- - `isFetching` - Request to fetch data is in flight, but might have data from a previous request - boolean
- - `isSuccess` - Request to fetch data is complete and was a success - boolean
- - `isError` - Request to fetch data is complete and was unsuccessful - boolean
- - `error` - Error result, if applicable - unknown

### useGetEntryMeta

To request frontmatter for a single entry, call `useGetEntryMeta`, passing the entry ID as the argument (which is [collection name]/[entry name]). The hook will return an object of frontmatter and various booleans relating the the status of the data fetching process.

**Signature:**

- **Hook Name:** `useGetEntryMeta`
- **Arguments:** `entryId` - string
- **Returns:** `object`
- - `data` - the frontmatter for all markdown entry siblings of the passed entryID - object
- - `isUninitialized` - Request to fetch data has not started yet - boolean
- - `isLoading` - Request to fetch data is in flight for the first time - boolean
- - `isFetching` - Request to fetch data is in flight, but might have data from a previous request - boolean
- - `isSuccess` - Request to fetch data is complete and was a success - boolean
- - `isError` - Request to fetch data is complete and was unsuccessful - boolean
- - `error` - Error result, if applicable - unknown

### useGetEntry

To request frontmatter and body content for a single entry, call `useGetEntry`, passing the entry ID as the argument (which is [collection name]/[entry name]). The hook will return an array of objects, containing markdown content and various booleans relating the the status of the data fetching process.

**Note:** This is a static representation of this data, it will not reflect CMS edits made in real time, use `useSetCmsContext` and the `MarkdownEditor` if you need this functionality.

**Signature:**

- **Hook Name:** `useGetEntry`
- **Arguments:** `entryId` - string
- **Returns:** `object`
- - `data` - the frontmatter any body content for the passed entryID - array of objects
- - `isUninitialized` - Request to fetch data has not started yet - boolean
- - `isLoading` - Request to fetch data is in flight for the first time - boolean
- - `isFetching` - Request to fetch data is in flight, but might have data from a previous request - boolean
- - `isSuccess` - Request to fetch data is complete and was a success - boolean
- - `isError` - Request to fetch data is complete and was unsuccessful - boolean
- - `error` - Error result, if applicable - unknown

### useCMSViewportOffset

Airview CMS presents a persistant toolbar as part of the UI; this topbar is positioned outside of the document flow and will require an offset in your UI to prevent content being obscured from view.

A hook is available that will return an integer value with the required toolbar offset.

**Signature:**

- **Hook Name:** `useCMSViewportOffset`
- **Arguments:** none
- **Returns:** `integer` - The pixel value of the CMS topbar offset

## Components

### MarkdownEditor

AirviewCMS exports a `MarkdownEditor` component, this provides realtime editing of markdown content for the current CMS Context.

**Example:**

```jsx
import React from "react";
import { useSetCmsContext, MarkdownEditor } from "airview-cms";

function EditableMarkdown() {
  // Set our CMS context, we don't require the return values in this example
  useSetCmsContext("coffee/house-blend");

  // MarkdownEditor component will parse the markdown file within the set context and present a WYSIWYG editing interface. Note: This will be read only for protected branches and when not in edit mode.
  return <MarkdownEditor />;
}
```

## Contributing to the package

Please see our documentation [here](https://github.com/AirWalk-Digital/airview#contributing) for guidance

## Issues, bugs and feature requests

Please see our documentation [here](https://github.com/AirWalk-Digital/airview#issues-bugs-and-feature-requests) for guidance
