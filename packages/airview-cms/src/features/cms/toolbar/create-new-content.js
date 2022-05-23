import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { selectDoesMetaEditorHaveEdits } from "../meta-editor";
import { selectCmsBusyStatus } from "../cms.slice";
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
  const handleOnClick = () => dispatch(enableContentCreatorModal());

  return (
    <Button
      variant="contained"
      disableElevation
      size="small"
      disabled={metaEditorEdits || cmsBusy || contentCreatorModalEnabled}
      onClick={handleOnClick}
    >
      Create New
    </Button>
  );
}
