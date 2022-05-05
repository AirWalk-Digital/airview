import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { store } from "./store";
import { CMS } from "../cms";

export function AirviewProvider({ children }) {
  return (
    <Provider store={store}>
      <CMS>{children}</CMS>
    </Provider>
  );
}

AirviewProvider.propTypes = {
  children: PropTypes.node,
};
