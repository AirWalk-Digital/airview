import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  toggleMetaEditor,
  selectMetaEditorEnabledStatus,
} from "../meta-editor";

export function ToggleMetaEditor() {
  const dispatch = useDispatch();
  const metaEditorEnabled = useSelector(selectMetaEditorEnabledStatus);
  return (
    <Button
      variant="text"
      size="small"
      onClick={() => dispatch(toggleMetaEditor())}
      sx={{
        minWidth: "140px",
      }}
    >
      {metaEditorEnabled ? "Hide Meta Editor" : "Show Meta Editor"}
    </Button>
  );
}
