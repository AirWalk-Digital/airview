import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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
    const classes = useIconChipStyles({ color, labelColor, dense });

    const { className, ...otherProps } = rest;

    return (
      <div className={clsx(classes.root, className)} {...otherProps} ref={ref}>
        <div className={classes.iconContainer}>{icon}</div>
        <div className={classes.labelContainer}>
          <span>{label}</span>
        </div>
      </div>
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

const useIconChipStyles = makeStyles((theme) => {
  return {
    root: (props) => ({
      display: "inline-flex",
      justifyContent: "space-between",
      border: `1px solid ${props.color}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#fff",
    }),

    iconContainer: (props) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: props.dense
        ? theme.spacing(0.25, 0.5)
        : theme.spacing(0.5, 0.75),
      color: props.color,

      "& > .MuiSvgIcon-root": {
        fontSize: theme.typography.pxToRem(16),
      },
    }),

    labelContainer: (props) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: props.dense
        ? theme.spacing(0.25, 0.5)
        : theme.spacing(0.5, 0.75),
      backgroundColor: props.color,
      color: props.labelColor,
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightBold,
      textAlign: "left",
      minWidth: props.dense ? 24 : 30,
      minHeight: 24,
    }),
  };
});

export { IconChip };
