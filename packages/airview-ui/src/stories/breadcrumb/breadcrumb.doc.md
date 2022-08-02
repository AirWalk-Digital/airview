The Breadcrumb component is used to help a user visualize a page's location within the hierarchical structure of a website, and allow navigation up to any of its "ancestors".

## Breadcrumb States

The Breadcrumb can be rendered in three states, namely:

- **Loading:** The data to render the Breadcrumb is not yet ready, a loading UI will present to the user to indicate the state
- **Fetching:** The data has been loaded previously and is now updating, the opacity of the UI will change to indicate a disabled state. All user interaction with the Breadcrumb will be disabled.
- **Loaded:** The data is in a ready state, the user can freely interact with the Breadcrumb component

## Importing the component

You can import the Breadcrumb component as a named import from the airview-ui library

```javascript
import { Breadcrumb } from "airview-ui";
```
