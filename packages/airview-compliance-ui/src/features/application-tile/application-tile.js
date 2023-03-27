import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

export function ApplicationTile({ children, gutter = false, classNames }) {
  const classes = useApplicationTileStyles(gutter);
  return (
    <Box sx={classes.root} className={classNames}>
      {children}
    </Box>
  );
}

ApplicationTile.propTypes = {
  /**
   * Supported sub-components to create the ApplicationTile composition
   */
  children: PropTypes.node,
  /**
   * Adds bottom margin to the root node
   */
  gutter: PropTypes.bool,
  /**
   * Allows the passing of additional style classes to the component root node
   */
  classNames: PropTypes.string,
};

function useApplicationTileStyles(gutter) {
  return {
    root: {
      backgroundColor: "common.white",
      border: 1,
      borderColoe: "primary.main",
      borderRadius: 1,
      marginBottom: gutter ? 2 : 0,
    },
  };
}
