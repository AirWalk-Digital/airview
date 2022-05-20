import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  enableCreatePullRequestModal,
  selectCanCreatePullRequest,
} from "../create-pull-request";
import { selectDoesMetaEditorHaveEdits } from "../meta-editor";
import { selectCmsBusyStatus } from "../cms.slice";

export function CreatePullRequest() {
  const dispatch = useDispatch();
  const canCreatePullRequest = useSelector(selectCanCreatePullRequest);
  const metaEditorEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const cmsBusy = useSelector(selectCmsBusyStatus);

  return (
    <Button
      variant="text"
      size="small"
      onClick={() => dispatch(enableCreatePullRequestModal())}
      disabled={!canCreatePullRequest || metaEditorEdits || cmsBusy}
    >
      Create Pull Request
    </Button>
  );
}
