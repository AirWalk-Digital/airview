import React, { useId } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { selectAllCollectionsLabelsAndIds } from "../config-slice";
import { selectCmsBusyStatus } from "../cms.slice";

export function CollectionSelector({ value, onChange }) {
  const id = useId();
  const collectionLabelsAndIds = useSelector(selectAllCollectionsLabelsAndIds);
  const cmsBusy = useSelector(selectCmsBusyStatus);
  const label = "Collection";
  const handleOnChange = (event) => onChange(event.target.value);

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
        value={value}
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

CollectionSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
