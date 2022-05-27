import React, { useMemo, useId } from "react";
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
  selectCmsContext,
  selectCmsBusyStatus,
  selectIsWorkingBranchProtected,
} from "../../cms.slice";
import { useGetAllEntriesMeta } from "../../../use-get-all-entries-meta";

export function EntrySelectWidget({
  label,
  value,
  onChange,
  excludeSelf = false,
  collection,
  required,
}) {
  const id = useId();
  const cmsContext = useSelector(selectCmsContext);
  const cmsBusy = useSelector(selectCmsBusyStatus);
  const protectedBranch = useSelector(selectIsWorkingBranchProtected);

  const { data: entries } = useGetAllEntriesMeta(({ data }) => {
    const filteredData = data?.map((dataItem) => ({
      id: dataItem.id,
      title: dataItem.meta.title,
      collection: dataItem.collection,
    }));

    return { data: filteredData };
  });

  // Remove current context entry to prevent self as parent selection
  const filteredEntries = useMemo(() => {
    if (!excludeSelf && !collection) return [...entries];

    let processedEntries;

    if (excludeSelf) {
      processedEntries = entries.filter((entry) => entry.id !== cmsContext);
    }

    if (collection) {
      return processedEntries.filter(
        (entry) => entry.collection === collection
      );
    }

    return processedEntries;
  }, [entries, cmsContext, excludeSelf, collection]);

  // Derrive if working branch no longer has selected parent
  const isInvalidSelection = useMemo(() => {
    if (!value) return false;

    return filteredEntries.find((entry) => entry.id === value) ? false : true;
  }, [value, filteredEntries]);

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
        {filteredEntries.map((entry) => {
          return (
            <MenuItem key={entry.id} value={entry.id}>
              {entry.title}
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
  excludeSelf: PropTypes.bool,
  collection: PropTypes.string,
  required: PropTypes.bool,
};
