import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";

export function ApplicationTileContent({
  children,
  collapsible = false,
  initialCollapsed = false,
  classNames,
}) {
  const classes = useApplicationTileContentStyles({ collapsible });

  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const handleOnToggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <div className={clsx(classNames, classes.root)}>
      {collapsible && (
        <IconButton
          aria-label={collapsed ? "Expand content" : "Collapse content"}
          color="primary"
          size="small"
          classes={{ root: classes.collapseToggleBtn }}
          onClick={handleOnToggleCollapsed}
        >
          {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      )}
      <Collapse
        in={!collapsed}
        classes={{ wrapperInner: classes.collapseWrapperInner }}
        aria-hidden={collapsed}
      >
        {children}
      </Collapse>
    </div>
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

const useApplicationTileContentStyles = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(2),
    },
    collapseToggleBtn: {
      display: "block",
      margin: "0 auto",
      padding: 0,
    },
    collapseWrapperInner: (props) => ({
      paddingTop: props.collapsible ? theme.spacing(2) : 0,
    }),
  };
});
