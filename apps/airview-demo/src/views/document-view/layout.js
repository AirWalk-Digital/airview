import React from "react";
import PropTypes from "prop-types";
import { Container as MuiContainer, Box } from "@mui/material";

export function LayoutContainer({ children }) {
  return (
    <MuiContainer maxWidth={false} sx={{ paddingTop: 6, paddingBottom: 6 }}>
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
      sx={{ flex: "0 0 auto", width: 350, paddingLeft: 2 }}
    >
      {children}
    </Box>
  );
}

LayoutAside.propTypes = {
  children: PropTypes.node,
};
