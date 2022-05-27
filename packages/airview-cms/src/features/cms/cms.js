import React, { Suspense } from "react";
import { CmsLoadingIndicator } from "./cms-loading-indicator";

const ToolBar = React.lazy(() => import("./toolbar"));
const BranchCreator = React.lazy(() => import("./branch-creator"));
const MetaEditor = React.lazy(() => import("./meta-editor"));
const CreatePullRequest = React.lazy(() => import("./create-pull-request/"));
const ContentCreator = React.lazy(() => import("./content-creator/"));

export function CMS() {
  return (
    <React.Fragment>
      <Suspense fallback={<CmsLoadingIndicator />}>
        <ToolBar />
        <ContentCreator />
        <BranchCreator />
        <CreatePullRequest />
        <MetaEditor />
      </Suspense>
    </React.Fragment>
  );
}
