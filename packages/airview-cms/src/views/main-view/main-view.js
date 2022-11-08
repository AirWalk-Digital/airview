import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  CMS,
  EnableCmsButton,
  selectCmsEnabledStatus,
  MainContent,
  useInvalidateBranches,
  useUnsavedEditsNavPrompt,
  useEnableBranchViaSearchParam,
} from "@features";

export function MainView({ children }) {
  const cmsEnabled = useSelector(selectCmsEnabledStatus);
  useUnsavedEditsNavPrompt();
  useInvalidateBranches();
  useEnableBranchViaSearchParam();

  return (
    <React.Fragment>
      {cmsEnabled && <CMS />}
      {!cmsEnabled && <EnableCmsButton />}
      <MainContent>{children}</MainContent>
    </React.Fragment>
  );
}

MainView.propTypes = {
  children: PropTypes.node,
};
