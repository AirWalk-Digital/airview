import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ThemeProvider, createTheme, ScopedCssBaseline } from "@mui/material";

export function AirviewUiThemeProvider({ children, themeConfig }) {
  const theme = useMemo(() => {
    return makeMuiTheme(themeConfig);
  }, [themeConfig]);

  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>{children}</ScopedCssBaseline>
    </ThemeProvider>
  );
}

function makeMuiTheme(themeConfig) {
  return createTheme({
    typography: {
      h1: {
        fontSize: 36,
        fontWeight: "500",
      },
    },
    ...themeConfig,
  });
}

AirviewUiThemeProvider.propTypes = {
  children: PropTypes.node,
  themeConfig: PropTypes.object,
};
