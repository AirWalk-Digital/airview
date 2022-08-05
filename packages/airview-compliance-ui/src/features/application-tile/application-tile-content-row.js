import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

export function ApplicationTileContentRow({
  children,
  inlineContent = false,
  classNames,
}) {
  const classes = useApplicationTileContentRowStyles();

  return (
    <Box
      sx={[classes.root, inlineContent === true && classes.inlineContent]}
      className={classNames}
    >
      {children}
    </Box>
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

function useApplicationTileContentRowStyles() {
  return {
    inlineContent: {
      "&:last-of-type": {
        marginBottom: "-12px",
      },

      "& > *": {
        marginBottom: 1.5,
      },

      "& > *:not(:last-child)": {
        marginRight: 1.5,
      },
    },

    root: {
      "& > *:not(:last-child)": {
        marginBottom: 1.5,
      },
    },
  };
}
