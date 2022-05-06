import React from "react";
import { Box } from "@mui/material";
import { META_EDITOR_WIDTH } from "./constants";
import { TOOL_BAR_HEIGHT } from "../toolbar";

export function MetaEditor() {
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
}
