import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

/**
 *
 * The NavigationDrawer component is used to display a list of navigation options to a user, within a dismisable aside drawer UI.
 *
 * The component accepts children, which will be rendered within the drawer. The visibility of the component is controlled via the `open` prop, the width and top offset can also be customised via the compoent props.
 *
 * ## NavigationDrawer States
 *
 * The NavigationDrawer can be rendered in two states, namely:
 *
 * **Closed - ** The NavigationDrawer is hidden from the user
 *
 * **Open - ** The NavigationDrawer is visible to the user
 *
 * ## Importing the component
 *
 * You can import the NavigationDrawer component as a named import from the airview-ui library
 *
 * ```javascript
 * import { NavigationDrawer } from "airview-ui"
 * ```
 */
export function NavigationDrawer({
  open,
  top = 0,
  children,
  drawerWidth = 300,
}) {
  return (
    <Box
      component="aside"
      sx={{
        display: open ? "block" : "none",
        position: "fixed",
        top,
        bottom: 0,
        left: 0,
        width: drawerWidth,
        borderRight: 1,
        borderColor: "grey.300",
        paddingY: 6,
        paddingX: 3,
        boxSizing: "border-box",
        backgroundColor: "common.white",
        zIndex: 1200,
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  );
}

NavigationDrawer.propTypes = {
  /**
   * Sets the component visibility to the user
   */
  open: PropTypes.bool.isRequired,
  /**
   * Determine the top offset from the viewport
   */
  top: PropTypes.number,
  /**
   * Allows the passing of child nodes, that will will be rendered within the drawer
   */
  children: PropTypes.node,
  /**
   * Sets the width of the drawer UI
   */
  drawerWidth: PropTypes.number,
};
