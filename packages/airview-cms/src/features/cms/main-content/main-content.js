import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { TOOL_BAR_HEIGHT } from "../toolbar";

export function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={{
        marginTop: `${TOOL_BAR_HEIGHT}px`,
      }}
    >
      {children}
    </Box>
  );
}

MainContent.propTypes = {
  children: PropTypes.node,
};
