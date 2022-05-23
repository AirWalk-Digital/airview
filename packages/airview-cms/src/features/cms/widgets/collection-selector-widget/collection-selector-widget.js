import React, { useId } from "react";
//import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { selectAllCollectionsLabelsAndIds } from "../../config-slice";

export function CollectionSelectorWidget() {
  const id = useId();
  const collectionLabelsAndIds = useSelector(selectAllCollectionsLabelsAndIds);

  const handleOnChange = () => {};

  return (
    <FormControl
      fullWidth
      size="small"
      margin="normal"
      //disabled={cmsBusy}
    >
      <InputLabel id={`collection-select-label-${id}`} shrink>
        Collection
      </InputLabel>

      <Select
        notched
        labelId={`collection-select-label-${id}`}
        id={`collection-select-${id}`}
        value="application"
        label="Collection"
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
