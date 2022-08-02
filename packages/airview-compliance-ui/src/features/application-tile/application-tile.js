import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

export function ApplicationTile({ children, gutter = false, classNames }) {
  const classes = useApplicationTileStyles({ gutter });
  return <div className={clsx(classNames, classes.root)}>{children}</div>;
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

const useApplicationTileStyles = makeStyles((theme) => {
  return {
    root: (props) => ({
      backgroundColor: theme.palette.common.white,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      marginBottom: props.gutter ? theme.spacing(2) : 0,
    }),
  };
});
