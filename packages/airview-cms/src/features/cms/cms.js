import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { CmsLoadingIndicator } from "./cms-loading-indicator";

const ToolBar = React.lazy(() => import("./toolbar"));
const BranchCreator = React.lazy(() => import("./branch-creator"));
const MetaEditor = React.lazy(() => import("./meta-editor"));
const MainContent = React.lazy(() => import("./main-content/"));
const CreatePullRequest = React.lazy(() => import("./create-pull-request/"));

export function CMS({ children }) {
  return (
    <React.Fragment>
      <Suspense fallback={<CmsLoadingIndicator />}>
        <ToolBar />
        <BranchCreator />
        <CreatePullRequest />
        <MetaEditor />
        <MainContent>{children}</MainContent>
      </Suspense>
    </React.Fragment>
  );
}

CMS.propTypes = {
  children: PropTypes.node,
};
