import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { META_EDITOR_WIDTH } from "./constants";
import { TOOL_BAR_HEIGHT } from "../toolbar";
import { selectMetaEditorEnabledStatus } from "./meta-editor.slice";

export function MetaEditor() {
  const metaEditorEnabled = useSelector(selectMetaEditorEnabledStatus);

  if (metaEditorEnabled)
    return (
      <Box
        component="aside"
        sx={{
          position: "absolute",
          top: `${TOOL_BAR_HEIGHT}px`,
          bottom: 0,
          right: 0,
          width: `${META_EDITOR_WIDTH}px`,
          borderLeft: 1,
          borderColor: "grey.300",
          padding: 1,
          boxSizing: "border-box",
        }}
      >
        <span>Meta editor content</span>
      </Box>
    );

  return null;
}
