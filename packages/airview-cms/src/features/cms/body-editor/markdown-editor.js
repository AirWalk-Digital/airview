import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import {
  selectBodyEditorData,
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
  const protectedBranch = useSelector(selectIsWorkingBranchProtected);

  const handleOnChange = (value) => {
    dispatch(persitBodyEditorContent(value));
  };

  if (cmsEnabled && !protectedBranch) {
    return (
      <MDEditor
        value={markdownContent}
        onChange={handleOnChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        autoFocus={false}
        preview="edit"
      />
    );
  }

  return (
    <MDEditor.Markdown
      source={markdownContent}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
    />
  );
}
