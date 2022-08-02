The `ApplicationTile` component uses a compositional pattern, allowing you to have control of the layout and content via the use of available sub-components. Namely:

- ApplicationTileHeader
- ApplicationTileTitle
- ApplicationTileContent
- ApplicationTileContentRow
- ApplicationTileDivider

A detailed API documentation for these sub-components can be viewed in the accompanying sibling stories.

The `ApplicationTile` component exposes an optional `gutter` prop, which can be used to apply bottom margin to the root node. This can be used when nesting `ApplicationTile` components.

**Importing the components**

```javascript
import { ApplicationTile } from "@/components/application-tile";
import { ApplicationTileHeader } from "@/components/application-tile";
import { ApplicationTileTitle } from "@/components/application-tile";
import { ApplicationTileContent } from "@/components/application-tile";
import { ApplicationTileContentRow } from "@/components/application-tile";
import { ApplicationTileDivider } from "@/components/application-tile";
```
