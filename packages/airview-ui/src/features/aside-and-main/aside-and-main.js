import React from "react";
import PropTypes from "prop-types";
import { Container as MuiContainer, Box } from "@mui/material";

export function AsideAndMainContainer({ children }) {
  return (
    <MuiContainer maxWidth={false} sx={{ paddingTop: 6, paddingBottom: 6 }}>
      <Box sx={{ display: "flex" }}>{children}</Box>
    </MuiContainer>
  );
}

AsideAndMainContainer.propTypes = {
  children: PropTypes.node,
};

export function Main({ children }) {
  return (
    <Box component="main" sx={{ flex: "1 1 auto" }}>
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
};

export function Aside({ children }) {
  return (
    <Box
      component="aside"
      sx={{ flex: "0 0 auto", width: 300, paddingLeft: 4 }}
    >
      {children}
    </Box>
  );
}

Aside.propTypes = {
  children: PropTypes.node,
};
