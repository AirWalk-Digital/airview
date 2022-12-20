import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeSvgIcon } from "@components";
import { FilePicker } from "./file-picker";
import { ErrorBoundary } from "react-error-boundary";
import Alert from "@mui/material/Alert";
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
  selectCmsContext,
} from "../cms.slice";
import { selectBaseUrl } from "../config-slice";
import { MDXContent } from "./mdx-content";
import PropTypes from "prop-types";

function isLinkExternal(url) {
  var r = new RegExp("^(?:[a-z+]+:)?//", "i");
  return r.test(url);
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

export function MarkdownEditor({ components: externalComponents }) {
  const dispatch = useDispatch();
  const markdownContent = useSelector(selectBodyEditorData);
  const cmsEnabled = useSelector(selectCmsEnabledStatus);
  const protectedBranch = useSelector(selectIsWorkingBranchProtected);
  const branchSha = useSelector(selectWorkingBranchSha);
  const baseUrl = useSelector(selectBaseUrl);
  const { path } = useSelector(selectCmsContext);

  const components = {
    img: ({ src, alt }) => {
      if (!branchSha) return;
      if (!src.startsWith("blob:")) {
        // Sanitize URL by removing leading `/`
        const relativeUrl = src.replace(/^\//, "");

        const path = new URL(relativeUrl, document.baseURI).pathname.substring(
          1
        );

        src = `${baseUrl}/media/${branchSha}?path=${path}`;
      }

      return <img src={src} alt={alt} />;
    },
    a: ({ children, href }) => {
      if (isLinkExternal(href)) {
        return <a href={href}>{children}</a>;
      }
      return <Link to={href}>{children}</Link>;
    },
  };

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
          previewOptions={{ components }}
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

  const RawMarkdownOutput = () => (
    <div data-color-mode="light">
      <MDEditor.Markdown source={markdownContent} components={components} />
    </div>
  );

  const Fallback = () => (
    <div>
      <Alert severity="error">
        {"MDX could not be parsed. The content below has reverted to Markdown."}
      </Alert>
      <RawMarkdownOutput />
    </div>
  );

  if (path.endsWith(".mdx")) {
    return (
      <ErrorBoundary FallbackComponent={Fallback}>
        <MDXContent
          components={components}
          externalComponents={externalComponents}
          markdownContent={markdownContent}
        />
      </ErrorBoundary>
    );
  }
  return <RawMarkdownOutput />;
}

MarkdownEditor.propTypes = {
  components: PropTypes.object,
};
