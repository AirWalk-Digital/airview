import React from "react";
import PropTypes from "prop-types";
import {
  AirviewProvider,
  AirviewRouter,
  airviewRouterHistory,
} from "@features";
import { MainView } from "@views";

export function AirviewCMS({ config, children }) {
  return (
    <AirviewProvider config={config}>
      <AirviewRouter history={airviewRouterHistory}>
        <MainView>{children}</MainView>
      </AirviewRouter>
    </AirviewProvider>
  );
}

AirviewCMS.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object.isRequired,
};
