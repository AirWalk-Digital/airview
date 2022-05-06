import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { TOOL_BAR_HEIGHT } from "../toolbar";
import { META_EDITOR_WIDTH } from "../meta-editor/constants";

export function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={{
        marginTop: `${TOOL_BAR_HEIGHT}px`,
        width: `calc(100% - ${META_EDITOR_WIDTH}px)`,
      }}
    >
      {children}
    </Box>
  );
}

MainContent.propTypes = {
  children: PropTypes.node,
};
