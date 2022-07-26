import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

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
