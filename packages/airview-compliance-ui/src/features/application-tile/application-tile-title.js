import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

export function ApplicationTileTitle({
  children,
  level = "h2",
  color = "inherit",
  classNames,
}) {
  const classes = useApplicationTileStyles(color);

  return (
    <Typography
      color="inherit"
      align="left"
      variant="h6"
      component={level}
      className={classNames}
      sx={{ "&.MuiTypography-root": classes.root }}
    >
      {children}
    </Typography>
  );
}

ApplicationTileTitle.propTypes = {
  /**
   * The content of the component (the title string)
   */
  children: PropTypes.string,
  /**
   * Sets the semantic HTML level of the title [heading element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)
   */
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  /**
   * The color for the progress bar, should be a valid [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  color: PropTypes.string,
  /**
   * Allows the passing of additional style classes to the component root node
   */
  classNames: PropTypes.string,
};

function useApplicationTileStyles(color) {
  return {
    root: {
      fontSize: "14px",
      lineHeight: 1.3,
      color: color,
    },
  };
}
