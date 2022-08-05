import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

export function ApplicationTileHeader({
  leftContent,
  rightContent,
  dense = false,
  classNames,
}) {
  const classes = useApplicationTileHeaderStyles(dense);
  return (
    <Box component="header" sx={classes.root} className={classNames}>
      {leftContent && (
        <Box
          sx={{ ...classes.subHeaderContainers, ...classes.leftHeaderContent }}
        >
          {leftContent}
        </Box>
      )}

      {rightContent && (
        <Box
          sx={{ ...classes.subHeaderContainers, ...classes.rightHeaderContent }}
        >
          {rightContent}
        </Box>
      )}
    </Box>
  );
}

ApplicationTileHeader.propTypes = {
  /**
   * Left aligned child content
   */
  leftContent: PropTypes.node,
  /**
   * Right aligned child content
   */
  rightContent: PropTypes.node,
  /**
   * Reduces the padding of the header container
   */
  dense: PropTypes.bool,
  /**
   * Allows the passing of additional style classes to the component root node
   */
  classNames: PropTypes.string,
};

function useApplicationTileHeaderStyles(dense) {
  return {
    root: {
      backgroundColor: "primary.main",
      color: "common.white",
      paddingTop: dense ? 0.5 : 1,
      paddingBottom: dense ? 0.5 : 1,
      paddingRight: 1,
      paddingLeft: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    subHeaderContainers: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 1,
      paddingLeft: 1,
    },
    leftHeaderContent: {
      marginRight: "auto",
    },
    rightHeaderContent: {
      marginLeft: "auto",
    },
  };
}
