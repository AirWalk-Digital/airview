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
        padding: 3,
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
  open: PropTypes.bool.isRequired,
  top: PropTypes.number,
  children: PropTypes.node,
  drawerWidth: PropTypes.number,
};
