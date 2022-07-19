import React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

/**
 *
 * The TopBar component is used to display a persistent area to display content and actions related to the current view. The color can be customised, by passing a valid Material UI theme palette or customising the primary theme color via the `airviewUiThemeProvider` config.
 *
 * ## TopBar States
 *
 * The TopBar can be rendered in two states, namely:
 *
 * **NavClosed - ** The toggle navigation button is rendered in a closed state
 *
 * **NavOpen - ** The toggle navigation button is rendered in an open state
 *
 * ## Importing the component
 *
 * You can import the Menu component as a named import from the airview-ui library
 *
 * ```javascript
 * import { TopBar } from "airview-ui"
 * ```
 */
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
