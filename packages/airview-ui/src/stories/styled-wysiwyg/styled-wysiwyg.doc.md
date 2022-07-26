The StyledWysiwyg component is used to display vanilla HTML DOM nodes for a specific article of text. The styling can be customised via the `airviewUiThemeProvider` config or directly using the Material UI SX prop.

## StyledWysiwyg States

The StyledWysiwyg can be rendered in three states, namely:

- **Loading ** The data to render the StyledWysiwyg is not yet ready, a loading UI will present to the user to indicate the state
- **Fetching ** The data has been loaded previously and is now updating, the opacity of the UI will change to indicate a disabled state. All user interaction with the StyledWysiwyg will be disabled.
- **Loaded ** The data is in a ready state, the user can freely interact with the StyledWysiwyg component

## Importing the component

You can import the StyledWysiwyg component as a named import from the airview-ui library

```javascript
import { StyledWysiwyg } from "airview-ui";
```
