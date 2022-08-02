import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

export function ApplicationTileCallToActionButton({ href, label, classNames }) {
  const styles = useStyles();

  return (
    <Button
      className={clsx(styles.button, classNames)}
      // component={Link}
      href={href}
      variant="contained"
      size="small"
      noLinkStyle
    >
      {label}
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: "#fff",
    minWidth: 50,
    padding: "2px 9px",
  },
}));

ApplicationTileCallToActionButton.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classNames: PropTypes.string,
};
