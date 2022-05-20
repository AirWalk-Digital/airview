import React from "react";
import PropTypes from "prop-types";
import { AirviewProvider } from "@features";
import { MainView } from "@views";

export function AirviewCMS({ config, children }) {
  return (
    <AirviewProvider config={config}>
      <MainView>{children}</MainView>
    </AirviewProvider>
  );
}

AirviewCMS.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object.isRequired,
};
