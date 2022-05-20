import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  selectDoesMetaEditorHaveEdits,
  clearMetaDataEdits,
} from "../meta-editor";
import { selectCmsBusyStatus } from "../cms.slice";

export function ClearChanges() {
  const dispatch = useDispatch();
  const metaEditorEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const cmsBusy = useSelector(selectCmsBusyStatus);

  return (
    <Button
      variant="text"
      size="small"
      color="error"
      disabled={!metaEditorEdits || cmsBusy}
      onClick={() => dispatch(clearMetaDataEdits())}
    >
      Clear Changes
    </Button>
  );
}
