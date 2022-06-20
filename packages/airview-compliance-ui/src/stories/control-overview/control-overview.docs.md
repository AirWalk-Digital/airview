The `ControlOverview` is a presentational component, that is complimented with an optional controller `useControlOverviewController`, which can be used for state management of group, control and resources data.

## Importing the component and controller

```javascript
import {
  ControlOverview,
  useControlOverviewController,
} from "@/components/control-overview";
```

## Providing data to the component

The data object used to populate the component is intented to work as a relational table of sub-data, with no data set, the component defaults to a loading state.

The top level data keys are:

- `groups` : Used to populate control groupings within the UI; the data should be an array of groups or a string, to indicate either an error or loading status. Setting the data to an empty array indicates there are no issues for the component to display.
- `controls` : Used to store data for controls; the data should be an object of arrays or a string, to indicate either an error or loading status. The object key should be equal to the group id the data relates to; setting the data to an empty array indicates there are no issues for the specific control.
- `resources` Used to store resource data for a specific control; the data should be an object of arrays or a string, to indicate either an error or loading status. The object key should be equal to the control id the data relates to; setting the data to an empty array indicates there are no resources for the specific control.

## Using the optional controller

The component comes with an optional controller as a custom React hook, that can be used to manage component state and the asynchronous retrival of the required data.

### Initialising

The controller hook accepts one parameter (`function`), to act as an mechanism fetch the initial group data. The function should return data equal to the `groups` key within the `data` prop:

```javascript
[
  {
    id: number,
    title: string
  }
] | 'error',
```

### Return values

The controller hook will return an array containing:

#### State

An object of the current state, used to feed the `data` prop of the `ControlOverview` component.

#### Controls data setter

A function to set the contol data that accepts two parameters, group id (`int`) and an asynchronous function used to fetch control data specific to the requested group.

This callback to fetch the control data will not be fired if control data already exists for a given group id.

The function should return data equal to the `controls` key within the `data` prop:

```javascript
[
  {
    id: number,
    name: string,
    severity: "Low" | "Medium" | "High",
    applied: number,
    exempt: number,
    control: {
      name: string,
      url: string,
    },
    frameworks: [
      {
        name: string,
        url: string,
      },
    ],
    qualityModel: string,
    lifecycle: string,
  },
] | "error";
```

#### Resources data setter

A function to set the resources data that accepts two parameters, control id (`int`) and an asynchronous function used to fetch resources data specific to the requested control id.

This callback to fetch the resources data will not be fired if resources data already exists for a given control id.

The function should return data equal to the `resources` key within the `data` prop:

```javascript
[
  {
    id: number,
    type: string,
    reference: string,
    environment: string,
    lastSeen: string,
    status: "Monitoring" | "Non-Compliant" | "Exempt",
    pending: bool,
    exemptionData: {
      ticket: string,
      expires: string // ISO Date String
      resources: [string]
    },
    evidence: string // Markdown
  },
] | "error";
```

#### Initialiser

A function to reset the component data back to it's intial state and re-fetch the data. Internally this calls the same function passed when invoking the hook.
