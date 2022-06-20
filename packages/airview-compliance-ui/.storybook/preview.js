import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import compose from "jss-plugin-compose";
import { BrowserRouter as Router } from "react-router-dom";
//import { initMswWorker } from "./initMswWorker";

//initMswWorker();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
};

export const decorators = [
  (Story) => {
    const jss = create({
      plugins: [...jssPreset().plugins, compose()],
    });

    return (
      <Router>
        <StylesProvider jss={jss}>
          <CssBaseline />
          <Story />
        </StylesProvider>
      </Router>
    );
  },
];
