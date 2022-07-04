import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MDEditor, { commands } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeSvgIcon } from "@components";
import { FilePicker } from "./file-picker";
import {
  selectBodyEditorData,
  persitBodyEditorContent,
} from "./body-editor.slice";
import {
  selectCmsEnabledStatus,
  selectIsWorkingBranchProtected,
} from "../cms.slice";

const imagePicker = {
  name: "image_picker",
  groupName: "image_picker",
  buttonProps: {
    "aria-label": "Insert Image",
  },
  icon: (
    <FontAwesomeSvgIcon
      icon={faImage}
      width={12}
      height={12}
      sx={{ width: 12, height: 12 }}
    />
  ),
  children: ({ close, textApi }) => {
    const handleOnSubmit = (url, description) => {
      textApi.replaceSelection(
        `![${description}](${URL.createObjectURL(url)})`
      );
      close();
    };

    return <FilePicker onCancel={close} onSubmit={handleOnSubmit} />;
  },
};

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
        autoFocus={false}
        preview="edit"
        commands={[commands.group([], imagePicker)]}
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