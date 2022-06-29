import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
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

function FileInput({ onChange }) {
  let fileInputRef = useRef(null);

  useEffect(() => {
    console.log("mounting file input");

    return () => console.log("unmounting file input");
  });

  useEffect(() => {
    fileInputRef.current.click();
  }, []);

  return <input type="file" ref={fileInputRef} onChange={onChange} />;
}

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

const image = {
  name: "image",
  keyCommand: "image",
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
  execute: (state, api) => {
    console.log(state);
    console.log(api);

    const onChange = (event) => {
      console.log("doing on change");
      root.unmount();
      console.log(event.target.files);
    };

    const root = ReactDOM.createRoot(document.createElement("div"));

    root.render(<FileInput onChange={onChange} />);
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
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        autoFocus={false}
        preview="edit"
        commands={[image]}
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
