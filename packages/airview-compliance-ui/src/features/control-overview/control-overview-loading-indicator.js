import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function ControlOverviewLoadingIndicator({ padding = false }) {
  return (
    <Box padding={padding ? 2 : 0} display="flex" justifyContent="center">
      <CircularProgress size={30} />
    </Box>
  );
}

ControlOverviewLoadingIndicator.propTypes = {
  padding: PropTypes.bool,
};
