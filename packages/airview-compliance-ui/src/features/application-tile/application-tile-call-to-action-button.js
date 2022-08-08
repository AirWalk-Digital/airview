import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

export function ApplicationTileCallToActionButton({
  label,
  classNames,
  component,
  linkProps,
}) {
  const styles = useStyles();

  return (
    <Button
      sx={styles.button}
      className={classNames}
      component={component}
      variant="contained"
      size="small"
      {...linkProps}
    >
      {label}
    </Button>
  );
}

function useStyles() {
  return {
    button: {
      fontSize: "12px",
      fontWeight: "bold",
      backgroundColor: "#fff",
      color: "#000",
      "&:hover": {
        backgroundColor: "#fff",
      },
      minWidth: 50,
      paddingTop: "2px",
      paddingBottom: "2px",
      paddingRight: "9px",
      paddingLeft: "9px",
    },
  };
}

ApplicationTileCallToActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  component: PropTypes.node,
  linkProps: PropTypes.object,
};
