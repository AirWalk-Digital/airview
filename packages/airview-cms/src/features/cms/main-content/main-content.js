import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { TOOL_BAR_HEIGHT } from "../toolbar";
import {
  META_EDITOR_WIDTH,
  selectMetaEditorEnabledStatus,
} from "../meta-editor/";

export function MainContent({ children }) {
  const metaEditorEnabled = useSelector(selectMetaEditorEnabledStatus);

  return (
    <Box
      component="main"
      sx={{
        marginTop: `${TOOL_BAR_HEIGHT}px`,
        width: metaEditorEnabled
          ? `calc(100% - ${META_EDITOR_WIDTH}px)`
          : "initial",
      }}
    >
      {children}
    </Box>
  );
}

MainContent.propTypes = {
  children: PropTypes.node,
};
