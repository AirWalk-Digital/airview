import React from "react";
import { Box, CircularProgress } from "@mui/material";

export function CmsLoadingIndicator() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "common.white",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
