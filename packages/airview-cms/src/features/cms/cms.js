import React from "react";
import PropTypes from "prop-types";
import { ToolBar } from "../toolbar";
import { BranchCreator } from "../branch-creator";
import { MetaEditor } from "../meta-editor";
import { MainContent } from "./main-content";

export function CMS({ children }) {
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
