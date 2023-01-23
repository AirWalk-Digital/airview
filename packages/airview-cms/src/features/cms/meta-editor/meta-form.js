import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { selectMetaEditorData, persistMetaDataEdit } from "./meta-editor.slice";
import { selectAllCollections } from "../config-slice";
import { useGetEntryMeta } from "../../use-get-all-entries-meta";
import { selectCmsContext } from "../cms.slice";
import { DynamicWidget, StringWidget } from "../widgets";

export function MetaForm() {
  const dispatch = useDispatch();
  const metaEditorData = useSelector(selectMetaEditorData);
  const collectionsData = useSelector(selectAllCollections);
  const cmsContext = useSelector(selectCmsContext);
  const { data: entryMetaData } = useGetEntryMeta(cmsContext);

  if (!entryMetaData) return null;

  const collectionsFields = collectionsData["application"].fields;

  const handleOnChange = (key, data) => {
    dispatch(
      persistMetaDataEdit({
        key,
        data,
      })
    );
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ padding: 2 }}>
      <StringWidget
        label="Title"
        required={true}
        placeholder="Enter a title for the document"
        value={metaEditorData?.title}
        onChange={(value) => handleOnChange("title", value)}
      />
      {cmsContext.path === "_index.md" &&
        collectionsFields.map((collectionFieldData) => {
          return (
            <DynamicWidget
              key={collectionFieldData.name}
              fieldData={collectionFieldData}
              value={metaEditorData[collectionFieldData.name]}
              onChange={(value) =>
                handleOnChange(collectionFieldData.name, value)
              }
            />
          );
        })}
    </Box>
  );
}
