import React from "react";
import PropTypes from "prop-types";
import { Container as MuiContainer, Box } from "@mui/material";

/**
 * The aside and Main Container provides a layout for main content and optional aside content. It is composed of three core components:
 *
 * - The main `AsideAndMainContainer`
 * - The required `Main` subcomponent
 * - The optional `Aside` subcomponent
 *
 * If used without the optional `Aside` subcomponent, the `Main` container will stretch to fill the full width of the `AsideAndMainContainer` parent.
 *
 * **To import:**
 *
 * ```javascript
 * import { AsideAndMainContainer, Main, Aside } from "airview-ui"
 * ```
 */

export function AsideAndMainContainer({ children }) {
  return (
    <MuiContainer maxWidth={false} sx={{ paddingTop: 6, paddingBottom: 6 }}>
      <Box sx={{ display: "flex" }}>{children}</Box>
    </MuiContainer>
  );
}

AsideAndMainContainer.propTypes = {
  /**
   * One of `Main` (required) and one of `Aside` (optional)
   */
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
