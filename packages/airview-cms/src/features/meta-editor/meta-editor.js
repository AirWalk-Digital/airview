import React from "react";
import { Box } from "@mui/material";

export function MetaEditor() {
  return (
    <Box
      component="aside"
      sx={{
        position: "absolute",
        top: "114px",
        bottom: 0,
        right: 0,
        width: "450px",
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
