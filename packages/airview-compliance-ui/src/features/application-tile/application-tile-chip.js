import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";
import { IconChip } from "../icon-chip/icon-chip";

export function ApplicationTileChip({
  tooltipLabel,
  icon,
  label,
  color,
  ...rest
}) {
  return (
    <Tooltip title={tooltipLabel} arrow>
      <IconChip
        {...{ icon, label, color }}
        dense
        // className={classes.root}
        {...rest}
      />
    </Tooltip>
  );
}

// function useStyles() {
// return{
// root: {
//   "&:hover": {
//     cursor: "default",
//   },
// },
//   }
// };

ApplicationTileChip.propTypes = {
  tooltipLabel: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
