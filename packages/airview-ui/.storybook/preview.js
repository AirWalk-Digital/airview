import React from "react";
import { AirviewUiThemeProvider } from "../src/features";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <AirviewUiThemeProvider>
      <Story />
    </AirviewUiThemeProvider>
  ),
];
