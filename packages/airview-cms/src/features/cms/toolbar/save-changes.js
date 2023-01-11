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
  const entry = useSelector(selectCmsContext);
  const branch = useSelector(selectWorkingBranch);
  const { data: branches } = useGetBranchesQuery();

  const handleOnClick = async () => {
    const resolveMarkdown = new MarkdownResolverUtils();

    const { resolvedMarkdown, resolvedImages: data } =
      await resolveMarkdown.resolveOutbound(bodyEdits, {
        ...initialImagesData,
        ...editedImagesData,
      });

    const [collection, entity, path] = entry.replace(/^\//, "").split("/", 3);
    data[`${path}`] = Buffer.from(
      matter.stringify(resolvedMarkdown, metaEdits),
      "utf8"
    ).toString("base64");

    const baseSha = branches.find((f) => f.name === branch).sha;

    putEntry({ id: `${collection}/${entity}`, branch, data, baseSha });
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
