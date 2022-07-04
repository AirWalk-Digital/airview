import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
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

export function FilePicker({ onSubmit, onCancel }) {
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
        label="File description"
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

FilePicker.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
