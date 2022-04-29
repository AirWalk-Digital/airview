import React from "react";
import { TopBar } from "./top-bar";
import { BranchCreatorModal } from "../create-branch/branch-creator";

export function Editor() {
  return (
    <React.Fragment>
      <TopBar />
      <BranchCreatorModal />
    </React.Fragment>
  );
}
