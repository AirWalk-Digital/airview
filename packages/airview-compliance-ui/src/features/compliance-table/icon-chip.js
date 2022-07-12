import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const IconChip = React.forwardRef(
  (
    {
      icon,
      label,
      color = "#000",
      labelColor = "#fff",
      dense = false,
      ...rest
    },
    ref
  ) => {
    const classes = useIconChipStyles(color, labelColor, dense);

    const { ...otherProps } = rest;

    return (
      <Box component="div" sx={classes.root} {...otherProps} ref={ref}>
        <Box component="div" sx={classes.iconContainer}>
          {icon}
        </Box>
        <Box component="div" sx={classes.labelContainer}>
          <span>{label}</span>
        </Box>
      </Box>
    );
  }
);

IconChip.displayName = "IconChip";

IconChip.propTypes = {
  /**
   * The icon to display in the chip, accepts one [Material-UI SVG Icon](https://material-ui.com/components/material-icons/)
   */
  icon: PropTypes.node.isRequired,
  /**
   * The content of the chip label text
   */
  label: PropTypes.string.isRequired,
  /**
   * The color of the chip, should be a valid [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  color: PropTypes.string,
  /**
   * The color of the chip label, should be a valid [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  labelColor: PropTypes.string,
  /**
   * Reduces the padding of around the chip icon and label for a smaller appearance
   */
  dense: PropTypes.bool,
};

function useIconChipStyles(color, labelColor, dense) {
  return {
    root: {
      display: "inline-flex",
      justifyContent: "space-between",
      border: `1px solid ${color}`,
      borderRadius: 1,
      backgroundColor: "#fff",
    },

    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      py: dense ? 0.25 : 0.5,
      px: dense ? 0.5 : 0.75,
      color: color,
      "& > .MuiSvgIcon-root": {
        fontSize: 16,
      },
    },

    labelContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      py: dense ? 0.25 : 0.5,
      px: dense ? 0.5 : 0.75,
      backgroundColor: color,
      color: labelColor,
      typography: "body1",
      fontWeight: "bold",
      textAlign: "left",
      minWidth: dense ? 24 : 30,
      minHeight: 24,
      fontSize: 14,
      lineHeight: 1.43,
    },
  };
}

export { IconChip };
