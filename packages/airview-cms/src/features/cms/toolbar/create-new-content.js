import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { selectDoesMetaEditorHaveEdits } from "../meta-editor";
import { selectCmsBusyStatus } from "../cms.slice";

export function CreateNewContent() {
  const metaEditorEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const cmsBusy = useSelector(selectCmsBusyStatus);

  return (
    <Button
      variant="contained"
      disableElevation
      size="small"
      disabled={metaEditorEdits || cmsBusy}
    >
      Create New
    </Button>
  );
}
