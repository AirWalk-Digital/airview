The aside and Main Container provides a layout for main content and optional aside content.

## Component composition

The component is composed of three core components:

- The main `AsideAndMainContainer`
- The required `Main` subcomponent
- The optional `Aside` subcomponent

If used without the optional `Aside` subcomponent, the `Main` container will stretch to fill the full width of the `AsideAndMainContainer` parent.

## Importing the component

You can import the AsideAndMainContainer componentand subcomponents as a named imports from the airview-ui library

```javascript
import { AsideAndMainContainer, Main, Aside } from "airview-ui";
```
