import React from "react";
import { ToolBar } from "../toolbar";
import { BranchCreator } from "../branch-creator";

export function CMS() {
  return (
    <React.Fragment>
      <ToolBar />
      <BranchCreator />
    </React.Fragment>
  );
}
