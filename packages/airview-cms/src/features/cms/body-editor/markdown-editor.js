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
  setEditedImagesData,
} from "./body-editor.slice";
import {
  selectCmsEnabledStatus,
  selectWorkingBranchSha,
  selectIsWorkingBranchProtected,
} from "../cms.slice";

import { visit } from "unist-util-visit";

function imgLinks(options) {
  function visitor(node) {
    if (!options?.branchSha) return;
    if (node.url.startsWith("blob:")) return;

    // Sanitize URL by removing leading `/`
    const relativeUrl = node.url.replace(/^\//, "");

    const path = new URL(relativeUrl, document.baseURI).pathname.substring(1);
    node.url = `/api/media/${options.branchSha}?path=${path}`;
  }

  function transform(tree) {
    visit(tree, "image", visitor);
  }

  return transform;
}

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

        dispatch(setEditedImagesData(imageData));

        textApi.replaceSelection(`![${description}](${imageData[file.name]})`);
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

export function MarkdownEditor() {
  const dispatch = useDispatch();
  const markdownContent = useSelector(selectBodyEditorData);
  const cmsEnabled = useSelector(selectCmsEnabledStatus);
  const protectedBranch = useSelector(selectIsWorkingBranchProtected);
  const branchSha = useSelector(selectWorkingBranchSha);

  const handleOnChange = (value) => {
    dispatch(persitBodyEditorContent(value));
  };

  const markdownImagePicker = useMemo(() => imagePicker(dispatch), [dispatch]);

  if (cmsEnabled && !protectedBranch) {
    return (
      <div data-color-mode="light">
        <MDEditor
          value={markdownContent}
          onChange={handleOnChange}
          autoFocus={false}
          preview="edit"
          previewOptions={{
            rehypePlugins: [],
            remarkPlugins: [
              [
                imgLinks,
                {
                  branchSha,
                },
              ],
            ],
          }}
          commands={[
            commands.group(
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
            ),
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
      </div>
    );
  }

  return (
    <div data-color-mode="light">
      <MDEditor.Markdown
        source={markdownContent}
        remarkPlugins={[
          [
            imgLinks,
            {
              branchSha,
            },
          ],
        ]}
        rehypePlugins={[[rehypeSanitize]]}
      />
    </div>
  );
}
