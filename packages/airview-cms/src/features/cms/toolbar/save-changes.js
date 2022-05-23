import React from "react";
import { useSelector } from "react-redux";
import matter from "gray-matter";
import { Button } from "@mui/material";
import {
  selectDoesMetaEditorHaveEdits,
  selectMetaEditorData,
} from "../meta-editor";
import { usePutEntryMutation, useGetBranchesQuery } from "../../store";
import { selectCmsContext, selectWorkingBranch } from "../cms.slice";

export function SaveChanges() {
  const hasEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const edits = useSelector(selectMetaEditorData);
  const [putEntry, { isLoading }] = usePutEntryMutation();
  const id = useSelector(selectCmsContext);
  const branch = useSelector(selectWorkingBranch);
  const { data: branches } = useGetBranchesQuery();

  const handleOnClick = () => {
    const data = {
      _index: btoa(matter.stringify("", edits)),
    };
    const baseSha = branches.find((f) => f.name === branch).sha;

    putEntry({ id, branch, data, baseSha });
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
