import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import MDEditor, { commands } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeSvgIcon } from "@components";
import { FilePicker } from "./file-picker";
import {
  selectBodyEditorData,
  persitBodyEditorContent,
  createObjectURLfromFileData,
  setImageData,
} from "./body-editor.slice";
import {
  selectCmsEnabledStatus,
  selectIsWorkingBranchProtected,
} from "../cms.slice";

function imagePicker(dispatch) {
  return {
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
      const handleOnSubmit = (file, description) => {
        const imageData = createObjectURLfromFileData(file);

        dispatch(setImageData(imageData));

        textApi.replaceSelection(
          `![${description}](${URL.createObjectURL(file)})`
        );
        close();
      };

      return (
        <FilePicker
          onCancel={close}
          onSubmit={handleOnSubmit}
          accept=".jpeg,.jpg,.gif,.png"
        />
      );
    },
  };
}

const titleSelector = commands.group(
  [
    commands.title1,
    commands.title2,
    commands.title3,
    commands.title4,
    commands.title5,
    commands.title6,
  ],
  {
    name: "title",
    groupName: "title",
    buttonProps: { "aria-label": "Insert title" },
  }
);

export function MarkdownEditor() {
  const dispatch = useDispatch();
  const markdownContent = useSelector(selectBodyEditorData);
  const cmsEnabled = useSelector(selectCmsEnabledStatus);
  const protectedBranch = useSelector(selectIsWorkingBranchProtected);

  const handleOnChange = (value) => {
    dispatch(persitBodyEditorContent(value));
  };

  const markdownImagePicker = useMemo(() => imagePicker(dispatch), [dispatch]);

  if (cmsEnabled && !protectedBranch) {
    return (
      <MDEditor
        value={markdownContent}
        onChange={handleOnChange}
        autoFocus={false}
        preview="edit"
        commands={[
          titleSelector,
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.hr,
          commands.quote,
          commands.code,
          commands.codeBlock,
          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.checkedListCommand,
          commands.link,
          commands.group([], markdownImagePicker),
        ]}
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
