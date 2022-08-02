import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

export function ApplicationTileHeader({
  leftContent,
  rightContent,
  dense = false,
  classNames,
}) {
  const classes = useApplicationTileHeaderStyles({ dense });
  return (
    <header className={clsx(classNames, classes.root)}>
      {leftContent && (
        <div
          className={clsx(
            classes.subHeaderContainers,
            classes.leftHeaderContent
          )}
        >
          {leftContent}
        </div>
      )}

      {rightContent && (
        <div
          className={clsx(
            classes.subHeaderContainers,
            classes.rightHeaderContent
          )}
        >
          {rightContent}
        </div>
      )}
    </header>
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

const useApplicationTileHeaderStyles = makeStyles((theme) => {
  return {
    root: (props) => ({
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      padding: props.dense ? theme.spacing(0.5, 1) : theme.spacing(1, 1),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }),
    subHeaderContainers: {
      padding: theme.spacing(0, 1),
    },
    leftHeaderContent: {
      marginRight: "auto",
    },
    rightHeaderContent: {
      marginLeft: "auto",
    },
  };
});
