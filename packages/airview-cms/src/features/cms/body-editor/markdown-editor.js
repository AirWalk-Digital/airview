import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import MDEditor, { commands } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  TextField,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { FontAwesomeSvgIcon } from "@components";
import {
  selectBodyEditorData,
  persitBodyEditorContent,
} from "./body-editor.slice";
import {
  selectCmsEnabledStatus,
  selectIsWorkingBranchProtected,
} from "../cms.slice";

function MarkdownFilePicker({ onSubmit, onCancel }) {
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
    reset();
  };

  return (
    <Box sx={{ width: 350, py: 1, px: 2 }}>
      <TextField
        label="File Description"
        variant="outlined"
        fullWidth
        size="small"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        sx={{ my: 1 }}
      />
      <input
        type="file"
        name="file"
        hidden
        onChange={(event) => setFile(event.target.files[0])}
        ref={fileInputRef}
      />
      <FormControl
        vaiant="outlined"
        disabled
        sx={{ width: "100%", my: 1 }}
        required
      >
        <OutlinedInput
          type="text"
          value={file ? file.name : "No file selected!"}
          readOnly
          size="small"
          notched={false}
          fullWidth={true}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                size="small"
                color="primary"
                onClick={() => fileInputRef.current.click()}
              >
                <DriveFolderUploadIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Select File"
          sx={{ paddingLeft: 0.75 }}
        />
      </FormControl>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mb: 1 }}>
        <Button variant="outlined" size="small" onClick={handleOnCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          disableElevation
          sx={{ ml: 1.25 }}
          onClick={handleOnSubmit}
          disabled={!file}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

MarkdownFilePicker.propTypes = {
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

    return <MarkdownFilePicker onCancel={close} onSubmit={handleOnSubmit} />;
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
