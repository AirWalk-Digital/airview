import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
};

export const decorators = [
  (Story) => {
    return (
      <React.Fragment>
        <CssBaseline />
        <Story />
      </React.Fragment>
    );
  },
];
