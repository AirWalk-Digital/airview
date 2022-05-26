import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DynamicWidget } from "../widgets";
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

  if (!collectionsFields || !formFieldsData) return null;

  return collectionsFields.map((collectionFieldData) => {
    return (
      <DynamicWidget
        key={collectionFieldData.name}
        fieldData={collectionFieldData}
        value={formFieldsData[collectionFieldData.name]}
        onChange={(value) =>
          dispatch(
            persitData({
              key: collectionFieldData.name,
              data: value,
            })
          )
        }
      />
    );
  });
}
