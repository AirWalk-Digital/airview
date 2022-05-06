import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

export function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={{
        marginTop: "114px",
        width: "calc(100% - 450px)",
      }}
    >
      {children}
    </Box>
  );
}

MainContent.propTypes = {
  children: PropTypes.node,
};
