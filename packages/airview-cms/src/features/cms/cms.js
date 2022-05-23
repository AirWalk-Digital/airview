import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { CmsLoadingIndicator } from "./cms-loading-indicator";

const ToolBar = React.lazy(() => import("./toolbar"));
const BranchCreator = React.lazy(() => import("./branch-creator"));
const MetaEditor = React.lazy(() => import("./meta-editor"));
const MainContent = React.lazy(() => import("./main-content/"));
const CreatePullRequest = React.lazy(() => import("./create-pull-request/"));
const ContentCreator = React.lazy(() => import("./content-creator/"));

export function CMS({ children }) {
  return (
    <React.Fragment>
      <Suspense fallback={<CmsLoadingIndicator />}>
        <ToolBar />
        <ContentCreator />
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
