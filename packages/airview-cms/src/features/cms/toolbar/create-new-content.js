import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { selectDoesMetaEditorHaveEdits } from "../meta-editor";
import {
  selectCmsBusyStatus,
  selectIsWorkingBranchProtected,
} from "../cms.slice";
import {
  enableContentCreatorModal,
  selectContentCreatorModalEnabledStatus,
} from "../content-creator";

export function CreateNewContent() {
  const dispatch = useDispatch();
  const metaEditorEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const cmsBusy = useSelector(selectCmsBusyStatus);
  const contentCreatorModalEnabled = useSelector(
    selectContentCreatorModalEnabledStatus
  );
  const protectedBranch = useSelector(selectIsWorkingBranchProtected);

  const handleOnClick = () => dispatch(enableContentCreatorModal());

  return (
    <Button
      variant="contained"
      disableElevation
      size="small"
      disabled={
        metaEditorEdits ||
        cmsBusy ||
        contentCreatorModalEnabled ||
        protectedBranch
      }
      onClick={handleOnClick}
    >
      Create New
    </Button>
  );
}
