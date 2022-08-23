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
import {
  selectCmsContext,
  selectWorkingBranch,
  selectCmsBusyStatus,
} from "../cms.slice";

export function SaveChanges() {
  const metaEditorHasEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const bodyEditorHasEdits = useSelector(selectDoesBodyEditorHaveEdits);
  const metaEdits = useSelector(selectMetaEditorData);
  const bodyEdits = useSelector(selectBodyEditorData);
  const initialImagesData = useSelector(selectInitialImagesData);
  const editedImagesData = useSelector(selectEditedImagesData);
  const [putEntry, { isLoading }] = usePutEntryMutation();
  const cmsBusy = useSelector(selectCmsBusyStatus);
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
      // "_index.md": btoa(matter.stringify(resolvedMarkdown, metaEdits)),
      "_index.md": Buffer.from(
        matter.stringify(resolvedMarkdown, metaEdits),
        "utf8"
      ).toString("base64"),

      ...resolvedImages,
    };

    const baseSha = branches.find((f) => f.name === branch).sha;

    putEntry({ id, branch, data, baseSha });
  };

  return (
    <Button
      variant="text"
      size="small"
      disabled={
        !(metaEditorHasEdits || bodyEditorHasEdits) || isLoading || cmsBusy
      }
      onClick={handleOnClick}
    >
      Save Changes
    </Button>
  );
}
