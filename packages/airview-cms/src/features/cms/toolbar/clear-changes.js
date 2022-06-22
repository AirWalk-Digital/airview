import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  selectDoesMetaEditorHaveEdits,
  clearMetaDataEdits,
} from "../meta-editor";
import {
  selectDoesBodyEditorHaveEdits,
  clearBodyEditorEdits,
} from "../body-editor";
import { selectCmsBusyStatus } from "../cms.slice";

export function ClearChanges() {
  const dispatch = useDispatch();
  const metaEditorEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const bodyEditorEdits = useSelector(selectDoesBodyEditorHaveEdits);
  const cmsBusy = useSelector(selectCmsBusyStatus);

  const handleOnClick = () => {
    dispatch(clearMetaDataEdits());
    dispatch(clearBodyEditorEdits());
  };

  return (
    <Button
      variant="text"
      size="small"
      color="error"
      disabled={!(metaEditorEdits || bodyEditorEdits) || cmsBusy}
      onClick={handleOnClick}
    >
      Clear Changes
    </Button>
  );
}
