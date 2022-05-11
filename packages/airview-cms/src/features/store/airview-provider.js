import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { initStore } from "./store";

export function AirviewProvider({ config, children }) {
  return <Provider store={initStore(config)}>{children}</Provider>;
}

AirviewProvider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object.isRequired,
};
