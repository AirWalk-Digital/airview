import React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export function TopBar({ onMenuButtonClick, title, color }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" {...{ color }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuButtonClick}
          >
            <MenuIcon />
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
  onMenuButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};
