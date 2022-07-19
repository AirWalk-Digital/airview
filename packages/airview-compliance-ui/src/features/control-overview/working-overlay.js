import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function WorkingOverlay({ open, color, ...rest }) {
  const classes = workingOverlayStyles(color);

  const { ...otherProps } = rest;

  if (!open) return null;

  return (
    <Box component="div" sx={classes.root} {...otherProps}>
      <CircularProgress sx={classes.circle} />
    </Box>
  );
}

function workingOverlayStyles(color) {
  return {
    root: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0, 0.1)",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      color: color ?? "primary.main",
    },
  };
}

WorkingOverlay.propTypes = {
  /**
   * Toggles the visibility of the component
   */
  open: PropTypes.bool.isRequired,
  /**
   * Sets the color of the progress circle, defaults to theme.primary.main if not set. Accepts a valid [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  color: PropTypes.string,
};
