import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton, Collapse, Box } from "@mui/material";

export function ApplicationTileContent({
  children,
  collapsible = false,
  initialCollapsed = false,
  classNames,
}) {
  const classes = useApplicationTileContentStyles(collapsible);

  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const handleOnToggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <Box sx={classes.root} className={classNames}>
      {collapsible && (
        <IconButton
          aria-label={collapsed ? "Expand content" : "Collapse content"}
          color="primary"
          size="small"
          sx={{ "&.MuiIconButton-root": classes.collapseToggleBtn }}
          onClick={handleOnToggleCollapsed}
        >
          {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      )}
      <Collapse
        in={!collapsed}
        sx={classes.collapseWrapperInner}
        aria-hidden={collapsed}
      >
        {children}
      </Collapse>
    </Box>
  );
}

ApplicationTileContent.propTypes = {
  /**
   * Supported sub-components to create the ApplicationTile composition
   */
  children: PropTypes.node,
  /**
   * Sets the content to enable collapsible content toggling
   */
  collapsible: PropTypes.bool,
  /**
   * Sets the initial collapsible state (if collapsible prop is true)
   */
  initialCollapsed: PropTypes.bool,
  /**
   * Allows the passing of additional style classes to the component root node
   */
  classNames: PropTypes.string,
};

function useApplicationTileContentStyles(collapsible) {
  return {
    root: {
      padding: 2,
    },
    collapseToggleBtn: {
      display: "block",
      margin: "0 auto",
      padding: 0,
    },
    collapseWrapperInner: {
      paddingTop: collapsible ? 2 : 0,
    },
  };
}
