import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { ToolBar } from "../toolbar";
import { BranchCreator } from "../branch-creator";
import { MetaEditor } from "../meta-editor";
import { MainContent } from "./main-content";
import { EnableCms } from "./enable-cms";
import { selectCmsEnabledStatus } from "./cms.slice";

export function CMS({ children }) {
  const cmsEnabled = useSelector(selectCmsEnabledStatus);

  if (!cmsEnabled) {
    return (
      <React.Fragment>
        {children}
        <EnableCms />
      </React.Fragment>
    );
  }

  // Add dynamic import

  return (
    <React.Fragment>
      <ToolBar />
      <BranchCreator />
      <MetaEditor />
      <MainContent>{children}</MainContent>
    </React.Fragment>
  );
}

CMS.propTypes = {
  children: PropTypes.node,
};
