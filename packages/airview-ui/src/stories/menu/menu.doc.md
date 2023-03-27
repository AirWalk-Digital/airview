The Menu component is used to display a list of navigation options to a user, for example in an aside list or main site navigation.

## Menu States

The Menu can be rendered in three states, namely:

- **Loading ** The data to render the menu is not yet ready, a loading UI will present to the user to indicate the state
- **Fetching ** The data has been loaded previously and is now updating, the opacity of the UI will change to indicate a disabled state. All user interaction with the Menu will be disabled.
- **Loaded ** The data is in a ready state, the user can freely interact with the Menu component

## Importing the component

You can import the Menu component as a named import from the airview-ui library

```javascript
import { Menu } from "airview-ui";
```
