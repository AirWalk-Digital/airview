import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
import { IconChip } from "../icon-chip/icon-chip";

export function ApplicationTileChip({
  tooltipLabel,
  icon,
  label,
  color,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Tooltip title={tooltipLabel} arrow>
      <IconChip
        {...{ icon, label, color }}
        dense
        className={classes.root}
        {...rest}
      />
    </Tooltip>
  );
}

const useStyles = makeStyles({
  root: {
    "&:hover": {
      cursor: "default",
    },
  },
});

ApplicationTileChip.propTypes = {
  tooltipLabel: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
