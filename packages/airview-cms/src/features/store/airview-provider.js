import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { store } from "./store";

export function AirviewProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

AirviewProvider.propTypes = {
  children: PropTypes.node,
};
