import React from "react";
import PropTypes from "prop-types";
import { Box, Slide } from "@mui/material";

export function NavigationDrawer({ open, top = 0, children }) {
  return (
    <Slide in={open} direction="right" timeout={350}>
      <Box
        component="aside"
        sx={{
          position: "fixed",
          top,
          bottom: 0,
          left: 0,
          width: 350,
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
    </Slide>
  );
}

NavigationDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  top: PropTypes.number,
  children: PropTypes.node,
};
