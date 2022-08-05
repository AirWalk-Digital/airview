import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

export function ApplicationTileCallToActionButton({
  href,
  label,
  classNames,
  component = "button",
  linkProps,
}) {
  const styles = useStyles();

  return (
    <Button
      sx={styles.button}
      className={classNames}
      component={component}
      href={href}
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
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  component: PropTypes.string,
  linkProps: PropTypes.node,
};
