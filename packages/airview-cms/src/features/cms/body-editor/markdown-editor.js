import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import MDEditor, { commands } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeSvgIcon } from "@components";
import {
  selectBodyEditorData,
  persitBodyEditorContent,
} from "./body-editor.slice";
import {
  selectCmsEnabledStatus,
  selectIsWorkingBranchProtected,
} from "../cms.slice";

function FileInputUi({ onSubmit, onCancel }) {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const fileInputRef = useRef();

  const reset = () => {
    setFile(null);
    setDescription("");
    fileInputRef.current.value = null;
  };

  const handleOnCancel = () => {
    reset();
    onCancel();
  };

  const handleOnSubmit = () => {
    onSubmit(file, description);
  };

  return (
    <div style={{ width: 120, padding: 10 }}>
      <input
        type="text"
        name="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        type="file"
        name="file"
        onChange={(event) => setFile(event.target.files[0])}
        ref={fileInputRef}
      />
      <button onClick={handleOnCancel}>Cancel</button>
      <button onClick={handleOnSubmit}>Add</button>
    </div>
  );
}

FileInputUi.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

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

    return <FileInputUi onCancel={close} onSubmit={handleOnSubmit} />;
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
        // previewOptions={{
        //   rehypePlugins: [[rehypeSanitize]],
        // }} // disabled, prevents the use of images using URL.createObjectURL
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
