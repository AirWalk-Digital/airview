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
  onNavButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  position: PropTypes.string,
  top: PropTypes.number,
  navOpen: PropTypes.bool.isRequired,
};
