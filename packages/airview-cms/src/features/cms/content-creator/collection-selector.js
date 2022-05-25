import React, { useId, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { selectAllCollectionsLabelsAndIds } from "../config-slice";
import { selectCmsBusyStatus } from "../cms.slice";
import {
  selectContentCreatorSelectedCollection,
  setCollection,
  setInitialData,
} from "./content-creator.slice";

export function CollectionSelector() {
  const dispatch = useDispatch();
  const id = useId();
  const collectionLabelsAndIds = useSelector(selectAllCollectionsLabelsAndIds);
  const selectedCollection = useSelector(
    selectContentCreatorSelectedCollection
  );
  const cmsBusy = useSelector(selectCmsBusyStatus);
  const label = "Collection";

  const handleOnChange = (event) => {
    dispatch(setCollection(event.target.value));
  };

  useEffect(() => {
    dispatch(setInitialData());
  }, [selectedCollection, dispatch]);

  if (!selectedCollection) return null;

  return (
    <FormControl
      fullWidth
      size="small"
      margin="normal"
      disabled={cmsBusy}
      required={true}
    >
      <InputLabel id={`collection-select-label-${id}`} shrink>
        {label}
      </InputLabel>

      <Select
        notched
        labelId={`collection-select-label-${id}`}
        id={`collection-select-${id}`}
        value={selectedCollection}
        label={label}
        onChange={handleOnChange}
      >
        {collectionLabelsAndIds.map(({ id, label }) => {
          return (
            <MenuItem key={id} value={id}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
