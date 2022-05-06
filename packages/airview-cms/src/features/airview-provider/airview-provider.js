import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { airviewStore } from "../airview-store";

export function AirviewProvider({ children }) {
  return <Provider store={airviewStore}>{children}</Provider>;
}

AirviewProvider.propTypes = {
  children: PropTypes.node,
};
