import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Typography } from "@mui/material";

export function ControlOverviewHeader({ title }) {
  const classes = controlOverviewHeaderStyles();

  return (
    <Toolbar sx={classes.header} disableGutters>
      <Typography
        sx={{ fontWeight: 600, fontSize: "18px" }}
        variant="h6"
        component="p"
      >
        {title}
      </Typography>
    </Toolbar>
  );
}

ControlOverviewHeader.propTypes = {
  title: PropTypes.string,
};

function controlOverviewHeaderStyles() {
  return {
    header: {
      paddingTop: 1,
      paddingBottom: 1,
      paddingRight: 2,
      paddingLeft: 2,
    },
  };
}
