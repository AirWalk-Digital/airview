import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { selectMetaEditorData, persistMetaDataEdit } from "./meta-editor.slice";
import { selectAllCollections } from "../config-slice";
import { useGetEntryMeta } from "../../use-get-all-entries-meta";
import { selectCmsContext } from "../cms.slice";
import { DynamicWidget } from "../widgets";

export function MetaForm() {
  const dispatch = useDispatch();
  const metaEditorData = useSelector(selectMetaEditorData);
  const collectionsData = useSelector(selectAllCollections);
  const cmsContext = useSelector(selectCmsContext);
  const { data: entryMetaData } = useGetEntryMeta(cmsContext);
  const collectionsFields = collectionsData[entryMetaData.collection].fields;

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ padding: 2 }}>
      {collectionsFields.map((collectionFieldData) => {
        return (
          <DynamicWidget
            key={collectionFieldData.name}
            fieldData={collectionFieldData}
            value={metaEditorData[collectionFieldData.name]}
            onChange={(value) =>
              dispatch(
                persistMetaDataEdit({
                  key: collectionFieldData.name,
                  data: value,
                })
              )
            }
          />
        );
      })}
    </Box>
  );
}
