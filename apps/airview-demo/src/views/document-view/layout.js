import React from "react";
import PropTypes from "prop-types";
import { Container as MuiContainer, Box } from "@mui/material";

export function LayoutContainer({ children }) {
  return (
    <MuiContainer maxWidth={false} sx={{ paddingTop: 3, paddingBottom: 3 }}>
      <Box sx={{ display: "flex" }}>{children}</Box>
    </MuiContainer>
  );
}

LayoutContainer.propTypes = {
  children: PropTypes.node,
};

export function LayoutMain({ children }) {
  return (
    <Box component="main" sx={{ flex: "1 1 auto", paddingRight: 2 }}>
      {children}
    </Box>
  );
}

LayoutMain.propTypes = {
  children: PropTypes.node,
};

export function LayoutAside({ children }) {
  return (
    <Box
      component="aside"
      sx={{ flex: "0 0 auto", width: 300, paddingLeft: 2 }}
    >
      {children}
    </Box>
  );
}

LayoutAside.propTypes = {
  children: PropTypes.node,
};
