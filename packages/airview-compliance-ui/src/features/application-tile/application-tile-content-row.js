import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

export function ApplicationTileContentRow({
  children,
  inlineContent = false,
  classNames,
}) {
  const classes = useApplicationTileContentRowStyles({ inlineContent });

  return (
    <div
      className={clsx(
        classNames,
        classes.root,
        inlineContent ? classes.inlineContent : null
      )}
    >
      {children}
    </div>
  );
}

ApplicationTileContentRow.propTypes = {
  /**
   * Supported sub-components to create the ApplicationTile composition
   */
  children: PropTypes.node,
  /**
   * Modifies the layout properties of child nodes when using inline content, for example `IconChip` components
   */
  inlineContent: PropTypes.bool,
  /**
   * Allows the passing of additional style classes to the component root node
   */
  classNames: PropTypes.string,
};

const useApplicationTileContentRowStyles = makeStyles((theme) => {
  return {
    inlineContent: {
      "&:last-of-type": {
        marginBottom: -12,
      },

      "& > *": {
        marginBottom: theme.spacing(1.5),
      },

      "& > *:not(:last-child)": {
        marginRight: theme.spacing(1.5),
      },
    },

    root: {
      "& > *:not(:last-child, $inlineContent)": {
        marginBottom: theme.spacing(1.5),
      },
    },
  };
});
