import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { selectMetaEditorData, persistMetaDataEdit } from "./meta-editor.slice";
import { selectAllCollections } from "../config-slice";
import { useGetEntryMeta } from "../../use-get-all-entries-meta";
import { selectCmsContext } from "../cms.slice";
import { DynamicField } from "./dynamic-field";

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
          <DynamicField
            key={collectionFieldData.name}
            fieldData={collectionFieldData}
            value={metaEditorData[collectionFieldData.name]}
            onChange={(event) =>
              dispatch(
                persistMetaDataEdit({
                  key: collectionFieldData.name,
                  data: event.target.value,
                })
              )
            }
          />
        );
      })}
    </Box>
  );
}
