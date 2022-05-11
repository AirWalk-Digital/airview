import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { TextFieldWidget } from "@components";
import { selectMetaEditorData, persistMetaDataEdit } from "./meta-editor.slice";

export function MetaForm() {
  const dispatch = useDispatch();
  const metaEditorData = useSelector(selectMetaEditorData);

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ padding: 2 }}>
      {metaEditorData.map(([key, value]) => (
        <TextFieldWidget
          key={key}
          label="Title"
          required
          placeholder="My document title"
          value={value}
          onChange={(event) =>
            dispatch(persistMetaDataEdit({ key, data: event.target.value }))
          }
        />
      ))}
    </Box>
  );
}
