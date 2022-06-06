import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DynamicWidget, StringWidget } from "../widgets";
import {
  selectContentCreatorSelectedCollection,
  selectContentCreatorData,
  persitData,
} from "./content-creator.slice";
import { selectAllCollections } from "../config-slice";

export function FormFields() {
  const dispatch = useDispatch();
  const selectedCollection = useSelector(
    selectContentCreatorSelectedCollection
  );
  const collectionsData = useSelector(selectAllCollections);
  const collectionsFields = collectionsData[selectedCollection]?.fields;
  const formFieldsData = useSelector(selectContentCreatorData);

  const handleOnChange = (key, data) => {
    dispatch(
      persitData({
        key,
        data,
      })
    );
  };

  if (!collectionsFields || !formFieldsData) return null;

  return (
    <React.Fragment>
      <StringWidget
        label="Title"
        required={true}
        placeholder="Enter a title for the document"
        value={formFieldsData?.title}
        onChange={(value) => handleOnChange("title", value)}
      />
      {collectionsFields.map((collectionFieldData) => {
        return (
          <DynamicWidget
            key={collectionFieldData.name}
            fieldData={collectionFieldData}
            value={formFieldsData[collectionFieldData.name]}
            onChange={(value) =>
              handleOnChange(collectionFieldData.name, value)
            }
          />
        );
      })}
    </React.Fragment>
  );
}
