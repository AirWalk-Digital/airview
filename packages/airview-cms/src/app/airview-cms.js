import React from "react";
import PropTypes from "prop-types";
import { AirviewProvider } from "@features";
import { MainView } from "@views";

export function AirviewCMS({ children }) {
  return (
    <AirviewProvider>
      <MainView>{children}</MainView>
    </AirviewProvider>
  );
}

AirviewCMS.propTypes = {
  children: PropTypes.node,
};
