import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";

export function WorkingOverlay({ open, color, ...rest }) {
  const styles = useWorkingOverlayStyles({ color });

  const { className, ...otherProps } = rest;

  if (!open) return null;

  return (
    <div className={clsx(styles.root, className)} {...otherProps}>
      <CircularProgress classes={{ circle: styles.circle }} />
    </div>
  );
}

const useWorkingOverlayStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.1)",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: ({ color }) => ({
    color: color ?? theme.palette.primary.main,
  }),
}));

WorkingOverlay.propTypes = {
  /**
   * Toggles the visibility of the component
   */
  open: PropTypes.bool.isRequired,
  /**
   * Sets the color of the progress circle, defaults to theme.primary.main if not set. Accepts a valid [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  color: PropTypes.string,
};
