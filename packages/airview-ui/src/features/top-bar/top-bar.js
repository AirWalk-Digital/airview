import React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export function TopBar({
  onNavButtonClick,
  title,
  color,
  position,
  top = 0,
  navOpen,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        {...{ color, position }}
        sx={{ top: top, boxShadow: 0 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onNavButtonClick}
          >
            {navOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

TopBar.propTypes = {
  /**
   * Callback for when a user clicks the toggle nav button. **Signature:** `function() => void`
   */
  onNavButtonClick: PropTypes.func.isRequired,
  /**
   * Sets a title for the TopBar
   */
  title: PropTypes.string.isRequired,
  /**
   * Sets the color of the TopBar
   */
  color: PropTypes.string,
  /**
   * Sets the CSS positioning of the TopBar (defaults to "fixed")
   */
  position: PropTypes.oneOf([
    "absolute",
    "fixed",
    "relative",
    "static",
    "sticky",
  ]),
  /**
   * Offsets the topbar from the top of the viewport equal to the value passed
   */
  top: PropTypes.number,
  /**
   * Renders the toggle nav button in an open or closed state
   */
  navOpen: PropTypes.bool.isRequired,
};
