import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { CMS, EnableCmsButton, selectCmsEnabledStatus } from "@features";

export function MainView({ children }) {
  const cmsEnabled = useSelector(selectCmsEnabledStatus);

  if (!cmsEnabled) {
    return (
      <React.Fragment>
        {children}
        <EnableCmsButton />
      </React.Fragment>
    );
  }

  return <CMS>{children}</CMS>;
}

MainView.propTypes = {
  children: PropTypes.node,
};
