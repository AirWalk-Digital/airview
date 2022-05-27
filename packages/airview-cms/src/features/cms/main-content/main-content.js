import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { TOOL_BAR_HEIGHT } from "../toolbar";
import { selectCmsEnabledStatus } from "../cms.slice";

export function MainContent({ children }) {
  const cmsEnabled = useSelector(selectCmsEnabledStatus);

  return (
    <Box
      component="main"
      sx={{
        marginTop: cmsEnabled ? `${TOOL_BAR_HEIGHT}px` : 0,
      }}
    >
      {children}
    </Box>
  );
}

MainContent.propTypes = {
  children: PropTypes.node,
};
