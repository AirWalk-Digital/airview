import React from "react";
import { useSelector } from "react-redux";
import matter from "gray-matter";
import { Button } from "@mui/material";
import {
  selectDoesMetaEditorHaveEdits,
  selectMetaEditorData,
} from "../meta-editor";
import { usePutEntryMutation } from "../../store";
import { selectCmsContext } from "../cms.slice";
import { selectWorkingBranch } from "./working-branch.slice";

export function SaveChanges() {
  const hasEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const edits = useSelector(selectMetaEditorData);
  const [putEntry, { isLoading }] = usePutEntryMutation();
  const id = useSelector(selectCmsContext);
  const branch = useSelector(selectWorkingBranch);

  const handleOnClick = () => {
    const data = {
      _index: btoa(matter.stringify("", edits)),
    };

    putEntry({ id, branch, data });
  };

  return (
    <Button
      variant="text"
      size="small"
      disabled={!hasEdits || isLoading}
      onClick={handleOnClick}
    >
      Save Changes
    </Button>
  );
}
