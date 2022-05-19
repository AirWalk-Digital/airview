import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { selectCmsBusyStatus } from "../cms.slice";
import { selectDoesMetaEditorHaveEdits } from "../meta-editor";
import { enableBranchCreatorModal } from "../branch-creator";

export function CreateBranch() {
  const dispatch = useDispatch();
  const metaEditorEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const cmsBusy = useSelector(selectCmsBusyStatus);

  return (
    <Button
      variant="text"
      size="small"
      onClick={() => dispatch(enableBranchCreatorModal())}
      disabled={metaEditorEdits || cmsBusy}
    >
      Create Branch
    </Button>
  );
}
