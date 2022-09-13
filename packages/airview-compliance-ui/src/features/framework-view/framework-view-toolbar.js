import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Typography } from "@mui/material";

export function FrameworkViewToolbar({ title, testid }) {
  const classes = frameworkViewToolbarStyles();

  if (!title) return null;

  return (
    <Toolbar
      sx={{ "&.MuiToolbar-gutters": classes.toolbar }}
      data-testid={testid}
    >
      {title && (
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      )}
    </Toolbar>
  );
}

FrameworkViewToolbar.propTypes = {
  title: PropTypes.string,
  testid: PropTypes.string,
};

function frameworkViewToolbarStyles() {
  return {
    toolbar: {
      paddingLeft: 2,
      paddingRight: 1,
    },
  };
}
