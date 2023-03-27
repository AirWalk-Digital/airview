import React, { useId } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  selectCmsBusyStatus,
  selectIsWorkingBranchProtected,
} from "../../cms.slice";
import { useGetAllEntriesMeta } from "../../../use-get-all-entries-meta";

export function EntrySelectWidget({
  label,
  value,
  onChange,
  collection,
  required,
}) {
  const id = useId();
  const cmsBusy = useSelector(selectCmsBusyStatus);
  const protectedBranch = useSelector(selectIsWorkingBranchProtected);

  const { data: entries } = useGetAllEntriesMeta();
  const filteredEntries = entries[collection];

  const isInvalidSelection =
    value && filteredEntries[value.split("/").pop()] === undefined;

  const noSelection = (
    <Typography component="em" sx={{ color: "text.disabled" }}>
      None
    </Typography>
  );

  const handleOnChange = (event) => {
    onChange(event.target.value ? event.target.value : null);
  };

  return (
    <FormControl
      fullWidth
      size="small"
      margin="normal"
      error={isInvalidSelection}
      required={required}
      disabled={cmsBusy || protectedBranch}
    >
      <InputLabel id={`parent-select-label-${id}`} shrink>
        {label}
      </InputLabel>

      <Select
        notched
        displayEmpty
        labelId={`parent-select-label-${id}`}
        id={`parent-select-${id}`}
        value={value ?? ""}
        label={label}
        onChange={handleOnChange}
      >
        <MenuItem value="">{noSelection}</MenuItem>
        {Object.keys(filteredEntries).map((entry) => {
          return (
            <MenuItem
              key={`${collection}/${entry}`}
              value={`${collection}/${entry}`}
            >
              {filteredEntries[entry].meta.title}
            </MenuItem>
          );
        })}
      </Select>
      {isInvalidSelection && (
        <FormHelperText>
          Error: selected parent entry does not exist in this branch!
        </FormHelperText>
      )}
    </FormControl>
  );
}

EntrySelectWidget.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  collection: PropTypes.string,
  required: PropTypes.bool,
};
