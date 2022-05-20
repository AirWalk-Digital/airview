import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

export function MetaEditorFeedbackContainer({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flex: "1 1 auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

MetaEditorFeedbackContainer.propTypes = {
  children: PropTypes.node,
};
