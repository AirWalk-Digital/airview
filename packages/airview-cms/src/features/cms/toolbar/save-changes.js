import React from "react";
import { useSelector } from "react-redux";
//import matter from "gray-matter";
import { Button } from "@mui/material";
import {
  selectDoesMetaEditorHaveEdits,
  //selectMetaEditorData,
} from "../meta-editor";
import {
  selectDoesBodyEditorHaveEdits,
  selectBodyEditorData,
  MarkdownResolverUtils,
  selectInitialImagesData,
  selectEditedImagesData,
} from "../body-editor";
import {
  usePutEntryMutation,
  //useGetBranchesQuery
} from "../../store";
//import { selectCmsContext, selectWorkingBranch } from "../cms.slice";

export function SaveChanges() {
  const metaEditorHasEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const bodyEditorHasEdits = useSelector(selectDoesBodyEditorHaveEdits);
  //const metaEdits = useSelector(selectMetaEditorData);
  const bodyEdits = useSelector(selectBodyEditorData);
  const initialImagesData = useSelector(selectInitialImagesData);
  const editedImagesData = useSelector(selectEditedImagesData);
  //const [putEntry, { isLoading }] = usePutEntryMutation();
  const [{ isLoading }] = usePutEntryMutation();
  //const id = useSelector(selectCmsContext);
  //const branch = useSelector(selectWorkingBranch);
  //const { data: branches } = useGetBranchesQuery();

  const handleOnClick = () => {
    const resolveMarkdown = new MarkdownResolverUtils();

    resolveMarkdown.resolveOutbound(bodyEdits, {
      ...initialImagesData,
      ...editedImagesData,
    });

    return;
    /*
      1: Get edited markdown
      2: search for images
      3: replace markdown image tags with originals
      4: spread images into payload
    */

    /*
    should have two images objects:
    - original, pulled from remote
    - added by user

    The added by user should be purged if a user clears changes
    The added by user will only be sent in the payload, as in theory other images should already be on the remote
    */
    // const data = {
    //   "_index.md": btoa(matter.stringify(bodyEdits, metaEdits)),
    // };

    // const baseSha = branches.find((f) => f.name === branch).sha;

    // putEntry({ id, branch, data, baseSha });
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
