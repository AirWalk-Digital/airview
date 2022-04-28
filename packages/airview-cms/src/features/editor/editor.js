import React from "react";
import { TopBar } from "./top-bar";
import { SwitchBranch } from "./switch-branch";

export function Editor() {
  return (
    <React.Fragment>
      <TopBar />
      <SwitchBranch />
    </React.Fragment>
  );
}
