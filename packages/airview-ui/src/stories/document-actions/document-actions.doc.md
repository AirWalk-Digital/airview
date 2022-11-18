The DocumentActions component provides contextual actions for the current document in view.

## Component states

The component can be rendered in three states, namely:

- **Loading:** The data to render the component is not yet ready, a loading UI will present to the user to indicate the state
- **Fetching:** The component's data has been loaded previously and is now updating. The opacity of the UI will change to indicate a disabled state and all user interaction for the component will be disabled
- **Loaded:** : The data is in a ready state, the user can freely interact with the component
- **PDF download loading**: A user has requested to downlod a PDF of the document. The download button will render in a disabled state with all user interaction disabled until the loading state is changed
- **PDF download error**: A user has requested to downlod a PDF of the document, which has failed. The download button will render in an error state, the user can re-request a download and the error state will persist until the status value is changed

## Importing the component

You can import the DocumentActions component as a named import from the airview-ui library

```javascript
import { DocumentActions } from "airview-ui";
```
