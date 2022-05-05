import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { airviewStore } from "../airview-store";
import { CMS } from "../cms";

export function AirviewProvider({ children }) {
  return (
    <Provider store={airviewStore}>
      <CMS>{children}</CMS>
    </Provider>
  );
}

AirviewProvider.propTypes = {
  children: PropTypes.node,
};
