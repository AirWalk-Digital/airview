import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { lighten } from "@mui/material/styles";

export function ProgressBar({
  value,
  showLabel = true,
  color = "#000",
  variant = "determinate",
  ariaLabel,
  classNames,
}) {
  const classes = useProgressBarStyles(color);

  return (
    <Box
      display="flex"
      alignItems="center"
      aria-label={ariaLabel}
      className={classNames}
    >
      <Box width="100%">
        <LinearProgress
          sx={{
            "&.MuiLinearProgress-root": classes.lpRoot,
            "& .MuiLinearProgress-bar": classes.lpBar,
          }}
          value={value}
          variant={variant}
        />
      </Box>

      {showLabel && (
        <Box minWidth={35} ml={1}>
          <Typography
            sx={{ "&..MuiTypography-body2": classes.label }}
            variant="body2"
            color="textPrimary"
          >{`${Math.round(value)}%`}</Typography>
        </Box>
      )}
    </Box>
  );
}

ProgressBar.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants. Value between 0 and 100.
   */
  value: PropTypes.number,
  /**
   * The color for the progress bar, should be a valid [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  color: PropTypes.string,
  /**
   * The variant to use. Use "indeterminate" when there is no progress value.
   */
  variant: PropTypes.oneOf(["determinate", "indeterminate"]),
  /**
   * Displays or hides the progress percentile value label, set to false when using variant "indeterminate"
   */
  showLabel: PropTypes.bool,
  /**
   * An accesible label for the progress bar
   */
  ariaLabel: PropTypes.string,
  /**
   * Allows the passing of additional style classes to the component root node
   */
  classNames: PropTypes.string,
};

function useProgressBarStyles(color) {
  return {
    lpRoot: {
      borderRadius: 1,
      height: 12,
      backgroundColor: lighten(color, 0.5),
    },
    lpBar: {
      backgroundColor: color,
    },
    label: {
      lineHeight: 0,
    },
  };
}

/*
ApplicationTile
  Children: node

ApplicationTile.Header
  Children: node
  Size: enum ["regular, small"]

ApplicationTile.Content
  Children: node
  Collapsible: bool
  InitialCollapsed: bool

ApplicationTile.ContentRow
  children: node

ApplicationTile.Title
  children: node
*/
