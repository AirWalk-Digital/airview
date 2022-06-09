import React from "react";
import PropTypes from "prop-types";
import { Box, Slide } from "@mui/material";

export function NavigationDrawer({ open, top = 0 }) {
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
          padding: 1,
          boxSizing: "border-box",
          backgroundColor: "common.white",
          zIndex: 1200,
        }}
      >
        <span>Nav</span>
      </Box>
    </Slide>
  );
}

NavigationDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  top: PropTypes.number,
};
