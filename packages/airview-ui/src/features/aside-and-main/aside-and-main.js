import React from "react";
import PropTypes from "prop-types";
import { Container as MuiContainer, Box } from "@mui/material";

export function AsideAndMainContainer({ children, sx, ...rest }) {
  return (
    <MuiContainer
      maxWidth={false}
      sx={{
        paddingTop: 6,
        paddingBottom: 6,
        "@media print": {
          margin: 0,
          padding: 0,
        },
        ...sx,
      }}
      {...rest}
    >
      <Box sx={{ display: "flex" }}>{children}</Box>
    </MuiContainer>
  );
}

AsideAndMainContainer.propTypes = {
  /**
   * One of `Main` (required) and one of `Aside` (optional)
   */
  children: PropTypes.node,
  sx: PropTypes.object,
};

export function Main({ children, sx }) {
  return (
    <Box component="main" sx={{ flex: "1 1 auto", width: "100%", ...sx }}>
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

export function Aside({ children, sx }) {
  return (
    <Box
      component="aside"
      sx={{
        flex: "0 0 auto",
        width: 300,
        paddingLeft: 4,
        "@media print": {
          display: "none",
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

Aside.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
