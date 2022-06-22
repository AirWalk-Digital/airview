import React from "react";
import ReactMarkdown from "react-markdown";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBodyEditorData,
  selectEditorKey,
  persitBodyEditorContent,
} from "./body-editor.slice";
import {
  selectCmsEnabledStatus,
  selectIsWorkingBranchProtected,
} from "../cms.slice";

export function MarkdownEditor() {
  const dispatch = useDispatch();
  const markdownContent = useSelector(selectBodyEditorData);
  const cmsEnabled = useSelector(selectCmsEnabledStatus);
  const editorKey = useSelector(selectEditorKey);
  const protectedBranch = useSelector(selectIsWorkingBranchProtected);

  const handleOnChange = (event) => {
    dispatch(persitBodyEditorContent(event.target.value));
  };

  if (cmsEnabled) {
    return (
      <TextField
        defaultValue={markdownContent}
        multiline
        fullWidth
        key={editorKey}
        onChange={handleOnChange}
        disabled={protectedBranch}
      />
    );
  }

  return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
}
