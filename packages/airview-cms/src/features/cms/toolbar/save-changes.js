import React from "react";
import { useSelector } from "react-redux";
import matter from "gray-matter";
import { Button } from "@mui/material";
import {
  selectDoesMetaEditorHaveEdits,
  selectMetaEditorData,
} from "../meta-editor";
import {
  selectDoesBodyEditorHaveEdits,
  selectBodyEditorData,
  MarkdownResolverUtils,
  selectInitialImagesData,
  selectEditedImagesData,
} from "../body-editor";
import { usePutEntryMutation, useGetBranchesQuery } from "../../store";
import { selectCmsContext, selectWorkingBranch } from "../cms.slice";

export function SaveChanges() {
  const metaEditorHasEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const bodyEditorHasEdits = useSelector(selectDoesBodyEditorHaveEdits);
  const metaEdits = useSelector(selectMetaEditorData);
  const bodyEdits = useSelector(selectBodyEditorData);
  const initialImagesData = useSelector(selectInitialImagesData);
  const editedImagesData = useSelector(selectEditedImagesData);
  const [putEntry, { isLoading }] = usePutEntryMutation();
  const id = useSelector(selectCmsContext);
  const branch = useSelector(selectWorkingBranch);
  const { data: branches } = useGetBranchesQuery();

  const handleOnClick = async () => {
    const resolveMarkdown = new MarkdownResolverUtils();

    const { resolvedMarkdown, resolvedImages } =
      await resolveMarkdown.resolveOutbound(bodyEdits, {
        ...initialImagesData,
        ...editedImagesData,
      });

    const data = {
      "_index.md": btoa(matter.stringify(resolvedMarkdown, metaEdits)),
      ...resolvedImages,
    };

    const baseSha = branches.find((f) => f.name === branch).sha;

    putEntry({ id, branch, data, baseSha });
  };

  return (
    <Button
      variant="text"
      size="small"
      disabled={!(metaEditorHasEdits || bodyEditorHasEdits) || isLoading}
      onClick={handleOnClick}
    >
      Save Changes
    </Button>
  );
}
