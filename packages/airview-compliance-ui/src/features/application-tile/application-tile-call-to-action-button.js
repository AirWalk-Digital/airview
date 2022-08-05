import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

export function ApplicationTileCallToActionButton({ href, label, classNames }) {
  const styles = useStyles();

  return (
    <Button
      sx={styles.button}
      className={classNames}
      // component={Link}
      href={href}
      variant="contained"
      size="small"
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
};
